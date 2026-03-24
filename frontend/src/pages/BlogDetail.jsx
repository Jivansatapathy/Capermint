import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import '../styles/blogDetail.css';
import { API_URL } from '../api_config';



const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                const item = (res.data.briefings?.items || []).find(b => b.id === id);
                setBlog(item);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="blog-detail-page loading">Loading...</div>;
    if (!blog) return <div className="blog-detail-page no-data">Blog post not found. <Link to="/blog">Back to Blog</Link></div>;

    return (
        <main className="blog-detail-page">
            <section className="blog-detail-hero" style={{ backgroundImage: `linear-gradient(180deg, rgba(8, 13, 37, 0.6) 0%, #080D25 100%), url(${blog.image})` }}>
                <div className="blog-detail-hero-content">
                    <Link to="/blog" className="back-link">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        BACK TO BLOG
                    </Link>
                    <h1 className="blog-detail-title">{blog.title}</h1>
                    <div className="blog-detail-meta">
                        <span>LATEST BRIEFING</span>
                        <span className="separator">|</span>
                        <span>BY RUNNER RUNNER TEAM</span>
                    </div>
                </div>
            </section>

            <section className="blog-detail-content">
                <div className="content-container">
                    {/* Render Content Blocks */}
                    {blog.content && blog.content.map((block, index) => {
                        if (block.type === 'paragraph') {
                            return <p key={index} className="blog-p">{block.value}</p>;
                        }
                        if (block.type === 'image') {
                            return (
                                <div key={index} className="blog-content-image">
                                    <img src={block.value} alt="Blog Detail" />
                                </div>
                            );
                        }
                        if (block.type === 'link') {
                            return (
                                <div key={index} className="blog-content-link">
                                    <a href={block.url} target="_blank" rel="noopener noreferrer" className="blog-btn-link">
                                        {block.text}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="9 18 15 12 9 6" />
                                        </svg>
                                    </a>
                                </div>
                            );
                        }
                        return null;
                    })}

                    {(!blog.content || blog.content.length === 0) && (
                        <p className="blog-p">{blog.desc}</p>
                    )}
                </div>
            </section>

            <section className="more-briefings-cta">
                <div className="cta-box">
                    <h2>READY FOR MORE?</h2>
                    <p>JOIN THOUSANDS OF PLAYERS IN THE NEON STREETS.</p>
                    <div className="cta-actions">
                        <img src="/assets/Google Store download button.png" alt="Google Play" />
                        <img src="/assets/App Store download button.png" alt="App Store" />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default BlogDetail;
