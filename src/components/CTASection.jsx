import React from 'react';

const CTASection = () => {
    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-image-wrapper">
                    <img src="/assets/ctaimage.png" alt="Runner Runner Characters" className="cta-image" />
                </div>

                <div className="cta-content">
                    <p className="cta-subtitle">WANT TO STAY IN TOUCH?</p>
                    <h2 className="cta-title">FOLLOW US ON SOCIAL MEDIA</h2>
                    <p className="cta-desc">STAY UP-TO-DATE WITH THE LATEST IN RUNNER RUNNER.</p>

                    <div className="cta-social-links">
                        <a href="#" className="social-link" aria-label="Instagram">
                            <div className="social-icon">
                                <img src="/assets/socialiconsimg/Instagram.png" alt="Instagram" className="social-img" />
                            </div>
                            <span>INSTAGRAM</span>
                        </a>
                        <a href="#" className="social-link" aria-label="Facebook">
                            <div className="social-icon">
                                <img src="/assets/socialiconsimg/Faceebook.png" alt="Facebook" className="social-img" />
                            </div>
                            <span>FACEBOOK</span>
                        </a>
                        <a href="#" className="social-link" aria-label="YouTube">
                            <div className="social-icon">
                                <img src="/assets/socialiconsimg/Youtube.png" alt="YouTube" className="social-img" />
                            </div>
                            <span>YOUTUBE</span>
                        </a>
                        <a href="#" className="social-link" aria-label="X (Twitter)">
                            <div className="social-icon">
                                <img src="/assets/socialiconsimg/X.png" alt="X" className="social-img" />
                            </div>
                            <span>X</span>
                        </a>
                        <a href="#" className="social-link" aria-label="Threads">
                            <div className="social-icon">
                                <img src="/assets/socialiconsimg/Threads.png" alt="Threads" className="social-img" />
                            </div>
                            <span>THREAD</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
