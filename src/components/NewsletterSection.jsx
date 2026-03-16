import React from 'react';
import '../styles/newsletterSection.css';

const NewsletterSection = ({ content }) => {
    const data = content?.newsletter || {
        title: "DAILY INTEL DROP",
        subtitle: "GET THE LATEST BLOG & NEWS DELIVERED STRAIGHT TO YOUR INBOX."
    };

    return (
        <section className="newsletter-container">
            <div className="newsletter-box">
                <h2 className="newsletter-title">{data.title}</h2>
                <p className="newsletter-subtitle">
                    {data.subtitle}
                </p>
                
                <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="newsletter-input-wrapper">
                        <input 
                            type="email" 
                            placeholder="ENTER EMAIL" 
                            className="newsletter-input"
                            required
                        />
                    </div>
                    <button type="submit" className="newsletter-submit-btn">
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
