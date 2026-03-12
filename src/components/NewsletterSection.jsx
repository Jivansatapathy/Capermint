import React from 'react';
import '../styles/newsletterSection.css';

const NewsletterSection = () => {
    return (
        <section className="newsletter-container">
            <div className="newsletter-box">
                <h2 className="newsletter-title">DAILY INTEL DROP</h2>
                <p className="newsletter-subtitle">
                    GET THE LATEST BLOG & NEWS DELIVERED STRAIGHT TO YOUR INBOX.
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
