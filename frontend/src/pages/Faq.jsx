import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/faq.css';

const FaqArrrow = ({ isOpen }) => (
    <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
    >
        <path d="M6 9L12 15L18 9" stroke="#4B55C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const StarIcon = ({ fill = 'none', className = '' }) => (
    <svg 
        width="24" height="24" viewBox="0 0 24 24" fill={fill} 
        className={className} xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            stroke={fill === '#F9F506' ? '#F9F506' : '#F9F506'} 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);

const RatingsSummary = ({ ratings }) => {
    if (!ratings) return null;
    
    return (
        <section className="ratings-section">
            <div className="ratings-card">
                <div className="ratings-main-col">
                    <div className="ratings-header">
                        <span className="rating-number">{ratings.score}</span>
                        <span className="rating-out-of">OUT OF 5</span>
                    </div>
                    <div className="rating-stars-row">
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <div className="half-star-container">
                             <StarIcon fill="none" className="star-outline" />
                             <div className="star-fill-mask" style={{ width: '80%' }}>
                                <StarIcon fill="#F9F506" className="star-filled" />
                             </div>
                        </div>
                    </div>
                    <p className="ratings-count">BASED ON {ratings.totalReviews} REVIEWS</p>
                </div>

                <div className="ratings-bars-col">
                    {ratings.breakdown?.map((r, i) => (
                        <div key={i} className="rating-bar-row">
                            <span className="star-label">{r.stars}</span>
                            <div className="bar-container">
                                <div className="bar-fill" style={{ width: `${r.percentage}%` }}></div>
                            </div>
                            <span className="percentage-label">{r.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [content, setContent] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchContent = async () => {
            try {
                const res = await axios.get('/api/content');
                setContent(res.data);
            } catch (err) {
                console.error("Error fetching FAQ content:", err);
            }
        };
        fetchContent();
    }, []);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    if (!content) return null;

    const data = content.faqPage || {};
    const hero = data.hero || {};
    const questions = data.questions || [];

    return (
        <div className="faq-page">
            <section className="faq-hero-section">
                <div className="faq-hero-bg-container">
                    <div className="faq-hero-pill"></div>
                </div>

                <img 
                    src="/assets/contactassets/questioniconleft.png" 
                    alt="Question" 
                    className="faq-hero-icon faq-icon-left" 
                />

                <div className="faq-hero-content">
                    <h1 className="faq-hero-title">{hero.title}</h1>
                    <h2 className="faq-hero-subtitle">{hero.subtitle}</h2>
                    <button className="faq-contact-btn">{hero.buttonText}</button>
                </div>

                <img 
                    src="/assets/contactassets/questioniconright.png" 
                    alt="Question" 
                    className="faq-hero-icon faq-icon-right" 
                />
            </section>

            <section className="faq-list-section">
                <div className="faq-container">
                    {questions.map((item, index) => (
                        <div 
                            key={index} 
                            className={`faq-card ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-card-header">
                                <h3 className="faq-question">{item.question}</h3>
                                <FaqArrrow isOpen={activeIndex === index} />
                            </div>
                            <div className="faq-card-content">
                                <p className="faq-answer">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <RatingsSummary ratings={data.ratings} />
            <Footer content={content} />
        </div>
    );
};

export default Faq;
