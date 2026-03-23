import React from 'react';
import '../styles/homeTestimonials.css';

const HomeTestimonials = ({ content }) => {
    const testimonials = content?.testimonials || [];

    return (
        <section className="home-testi-section">
            <div className="home-testi-header">
                <h2 className="home-testi-title">{content?.testimonialsTitle || ""}</h2>
                <p className="home-testi-subtitle">{content?.testimonialsSubtitle || ""}</p>
            </div>

            <div className="home-testi-grid">
                {testimonials.map((review, index) => (
                    <div key={index} className="home-testi-card">
                        <div className="home-testi-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`home-testi-star ${i < review.rating ? 'filled' : 'empty'}`}>★</span>
                            ))}
                        </div>
                        <p className="home-testi-text">{review.text}</p>

                        <div className="home-testi-author">
                            <div className="home-testi-icon">{review.icon}</div>
                            <div className="home-testi-author-info">
                                <h4 className="home-testi-name">{review.name}</h4>
                                <span className="home-testi-role">{review.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeTestimonials;
