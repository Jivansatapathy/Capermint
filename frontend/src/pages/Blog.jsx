import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NewsletterSection from '../components/NewsletterSection';
import '../styles/blog.css';
import axios from 'axios';


const Blog = () => {
    const [content, setContent] = useState({ blogSlides: [], briefings: { title: 'LATEST BRIEFINGS', items: [] } });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('/api/content')
            .then(res => {
                setContent({
                    blogSlides: res.data.blogSlides || [],
                    briefings: res.data.briefings || {}
                });
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const slides = content.blogSlides;
    const briefings = content.briefings;

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            handleNextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide, slides]);

    const handleNextSlide = () => {
        if (slides.length === 0) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setIsTransitioning(false);
        }, 500);
    };

    if (loading) return <div className="blog-page"><div className="loading">Loading...</div></div>;

    const activeSlide = slides[currentSlide] || {};

    return (
        <main className="blog-page">
            <section className="blog-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 13, 37, 0) 0%, #080D25 100%), url(${activeSlide.bg})` }}>
                <div className={`blog-hero-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                    <h1 className="blog-hero-title">
                        {activeSlide.title} <span>{activeSlide.highlight}</span>
                    </h1>
                    <p className="blog-hero-subtitle">
                        {activeSlide.subtitle}
                    </p>
                    
                    <div className="blog-hero-actions">
                        <button className="blog-explore-btn">EXPLORE IT</button>
                    </div>
                </div>

                <div className="blog-hero-pagination">
                    {slides.map((_, index) => (
                        <div 
                            key={index} 
                            className={`pagination-item ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => {
                                if (index !== currentSlide) {
                                    setIsTransitioning(true);
                                    setTimeout(() => {
                                        setCurrentSlide(index);
                                        setIsTransitioning(false);
                                    }, 500);
                                }
                            }}
                        />
                    ))}
                </div>
            </section>

            <section className="latest-briefings">
                <div className="briefings-container">
                    <h2 className="briefings-title">{briefings.title}</h2>
                    <div className="briefings-grid">
                        {briefings.items && briefings.items.map((item, index) => (
                            <div key={item.id || index} className="briefing-card">
                                <div className="briefing-image-wrapper">
                                    <img src={item.image} alt={item.title} className="briefing-image" />
                                    {item.videoLink && (
                                        <a href={item.videoLink} target="_blank" rel="noopener noreferrer" className="play-button">
                                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                <circle cx="30" cy="30" r="30" fill="white" fillOpacity="0.2"/>
                                                <path d="M40 30L25 38.6603L25 21.3397L40 30Z" fill="white"/>
                                            </svg>
                                        </a>
                                    )}
                                </div>
                                <div className="briefing-content">
                                    <h3 className="briefing-card-title">{item.title}</h3>
                                    <p className="briefing-card-desc">{item.desc}</p>
                                    <Link to={`/blog/${item.id}`} className="watch-more-link">
                                        <button className="watch-more-btn">WATCH MORE</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    {(!briefings.items || briefings.items.length === 0) && (
                        <div className="no-briefings">Stay tuned for more updates!</div>
                    )}
                </div>
            </section>
            
            <NewsletterSection content={content} />
            <Footer content={content} />
        </main>
    );
};

export default Blog;
