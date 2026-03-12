import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-main">
                {/* Left: Logo + Tagline + Socials */}
                <div className="footer-brand">
                    <img src="/assets/Runnerlogo.png" alt="Runner Runner" className="footer-logo" />
                    <p className="footer-tagline">
                        FAST PACED ENDLESS RUNNING ACROSS EVER CHANGING WORLDS. RUN, DODGE, COMPETE AND PUSH YOUR LIMITS.
                    </p>
                    <div className="footer-socials">
                        <a href="#" className="footer-social-link" aria-label="Facebook">
                            {/* Facebook */}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="Twitter / X">
                            {/* X / Twitter */}
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="Instagram">
                            {/* Instagram */}
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#" className="footer-social-link" aria-label="YouTube">
                            {/* YouTube */}
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path 
                                    fillRule="evenodd" 
                                    clipRule="evenodd" 
                                    d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M9.75 15.02 L15.5 11.75 L9.75 8.48 Z" 
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Nav columns */}
                <div className="footer-nav">
                    <div className="footer-col">
                        <h4 className="footer-col-title">GAME</h4>
                        <ul>
                            <li><a href="#">DOWNLOAD</a></li>
                            <li><a href="#">FEATURES</a></li>
                            <li><a href="/maps">MAPS</a></li>
                            <li><a href="#">UPDATES</a></li>
                            <li><a href="#">LEADERBOARDS</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">COMPANY</h4>
                        <ul>
                            <li><a href="#">ABOUT US</a></li>
                            <li><a href="#">BLOG</a></li>
                            <li><a href="#">CAREERS</a></li>
                            <li><a href="#">PRESS</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">SUPPORT</h4>
                        <ul>
                            <li><a href="#">HELP CENTER</a></li>
                            <li><a href="#">CONTACT US</a></li>
                            <li><a href="#">REPORT BUG</a></li>
                            <li><a href="#">PRIVACY POLICY</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-col-title">CONTACT</h4>
                        <div className="footer-contact-email">
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <a href="mailto:support@playspherestudios.com">SUPPORT@PLAYSPHERESTUDIOS.COM</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="footer-copy">© 2026 RUNNER RUNNER. ALL RIGHTS RESERVED.</p>
                <div className="footer-legal">
                    <a href="#">TERMS OF SERVICE</a>
                    <a href="#">PRIVACY POLICY</a>
                    <a href="#">COOKIE SETTINGS</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
