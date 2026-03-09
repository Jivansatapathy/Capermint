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
                            <div className="social-icon instagram-bg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </div>
                            <span>INSTAGRAM</span>
                        </a>
                        <a href="#" className="social-link" aria-label="Facebook">
                            <div className="social-icon facebook-bg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                </svg>
                            </div>
                            <span>FACEBOOK</span>
                        </a>
                        <a href="#" className="social-link" aria-label="YouTube">
                            <div className="social-icon youtube-bg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                                </svg>
                            </div>
                            <span>YOUTUBE</span>
                        </a>
                        <a href="#" className="social-link" aria-label="X (Twitter)">
                            <div className="social-icon x-bg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </div>
                            <span>X</span>
                        </a>
                        <a href="#" className="social-link" aria-label="Threads">
                            <div className="social-icon threads-bg">
                                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="svg-icon">
                                    <path d="M14.5 9c-1.5 0-2.5 1-2.5 2.5 0 1.5 1.5 2.5 2.5 2.5s2.5-1 2.5-2.5C17 10 16 9 14.5 9z"></path>
                                    <path d="M12 19c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7c0 1.9-.8 3.6-2 4.9-1.2 1.2-2.8 1.9-4.5 1.9H12"></path>
                                    <path d="M12 2v2"></path>
                                </svg>
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
