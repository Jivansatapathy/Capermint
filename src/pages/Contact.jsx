import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/contact.css';

const API = 'http://localhost:3000/api/content';

const defaultContent = {
    hero: {
        title: "WE'D LOVE TO HEAR FROM YOU!",
        subtitle: "GOT A QUESTION, FEEDBACK, OR NEED HELP? WE'RE HERE FOR YOU!",
        buttonText: "CONTACT US",
        characterImage: "/assets/contactassets/contactsection1img.png"
    },
    infoBox: {
        title: "GET IN TOUCH",
        text: "PLEASE FILL OUT THE FORM BELOW, AND WE'LL GET BACK TO YOU AS SOON AS POSSIBLE. OUR TEAM IS HERE TO ASSIST WITH ANY INQUIRIES OR SUPPORT NEEDS!"
    },
    support: {
        title: "CONTACT OUR SUPPORT TEAM",
        subtitle: "IF YOU NEED PERSONALIZED ASSISTANCE, YOU CAN REACH OUT TO OUR SUPPORT TEAM THROUGH ANY OF THE FOLLOWING METHODS",
        cards: [
            { type: 'email', icon: '/assets/contactassets/mail.png', title: 'SUPPORT@RUNNERRUNNER.COM', desc: 'AVAILABLE 24/7 VIA THE CHAT BUTTON AT THE BOTTOM-RIGHT OF THE PAGE.' },
            { type: 'phone', icon: '/assets/contactassets/phone.png', title: '+1 (555) 123-4567', desc: 'PREFER TO SPEAK WITH SOMEONE? CALL US DURING OUR SUPPORT HOURS.' },
            { type: 'chat', icon: '/assets/contactassets/chat.png', title: 'LIVE CHAT', desc: 'AVAILABLE 24/7 VIA THE CHAT BUTTON AT THE BOTTOM-RIGHT OF THE PAGE.' },
        ]
    },
    bgSection: {
        overlayImage: "/assets/contactassets/conatctbgsection.png"
    }
};

const Contact = () => {
    const [cp, setCp] = useState(defaultContent);
    const [faqActive, setFaqActive] = useState(0);
    const [activeTab, setActiveTab] = useState('GAMEPLAY');

    const tabs = ['GAMEPLAY', 'EVENTS', 'GAME MODES', 'REWARDS'];

    const allFaqs = {
        'GAMEPLAY': [
            { q: "WHAT PLATFORMS ARE SUPPORTED?", a: "YOU CAN DOWNLOAD RUNNER RUNNER DIRECTLY FROM OUR WEBSITE OR FROM YOUR PLATFORM'S APP STORE. IT'S COMPLETELY FREE TO PLAY." },
            { q: "IS THERE CROSS-PLAY ENABLED?", a: "YES, PC, MOBILE, AND CONSOLE PLATFORMS ARE ALL FULLY SUPPORTED AND ENABLE CROSS-PLAY." },
            { q: "ARE THERE IN-APP PURCHASES?", a: "YES, OPTIONAL COSMETIC ITEMS ARE AVAILABLE FOR PURCHASE IN-GAME." },
            { q: "HOW DOES MULTIPLAYER WORK?", a: "YOU CAN COMPETE WITH OTHERS IN REAL-TIME MATCHES AND TOURNAMENTS." },
            { q: "CAN I PLAY OFFLINE?", a: "NO, RUNNER RUNNER REQUIRES AN INTERNET CONNECTION TO SYNC SCORES AND MATCH WITH PLAYERS." }
        ],
        'EVENTS': [
            { q: "WHEN DO SPECIAL EVENTS START?", a: "NEW EVENTS TYPICALLY START EVERY FIRST FRIDAY OF THE MONTH." },
            { q: "DO EVENT ITEMS RETURN?", a: "SOME EXCLUSIVE ITEMS MAY RETURN DURING ANNIVERSARY CELEBRATIONS." },
            { q: "HOW DO I PARTICIPATE IN TOURNAMENTS?", a: "YOU CAN SIGN UP FOR TOURNAMENTS THROUGH THE EVENTS TAB." },
            { q: "ARE THERE LEADERBOARD REWARDS?", a: "TOP 10% OF PLAYERS EACH SEASON EARN EXCLUSIVE TITLES AND BANNERS." },
            { q: "CAN I PLAY EVENTS OFFLINE?", a: "NO, EVENTS REQUiRE AN ACTIVE INTERNET CONNECTION." }
        ],
        'GAME MODES': [
            { q: "WHAT IS SURVIVAL MODE?", a: "SURVIVAL MODE CHALLENGES YOU TO LAST AS LONG AS POSSIBLE AGAINST ENDLESS WAVES." },
            { q: "CAN I PLAY WITH FRIENDS IN CO-OP?", a: "YES, CO-OP MODE SUPPORTS UP TO 4 PLAYERS IN A SINGLE SESSION." },
            { q: "ARE THERE RANKED MATCHES?", a: "COMPETITIVE RANKED PLAY IS AVAILABLE FOR PLAYERS LEVEL 10 AND ABOVE." },
            { q: "IS THERE A PRACTICE MODE?", a: "YES, YOU CAN TEST YOUR ABILITIES IN THE TRAINING RANGE OFFLINE." },
            { q: "HOW DO I UNLOCK NEW MODES?", a: "NEW GAME MODES ARE EXPERIENCED AS YOU PROGRESS AND LEVEL UP." }
        ],
        'REWARDS': [
            { q: "HOW DO I EARN COINS?", a: "COINS ARE EARNED BY COMPLETING MATCHES, DAILY CHALLENGES, AND LEVELING UP." },
            { q: "WHAT IS THE BATTLE PASS?", a: "THE BATTLE PASS OFFERS A TIERED REWARD SYSTEM WITH EXCLUSIVE COSMETICS." },
            { q: "HOW DO I CLAIM DAILY REWARDS?", a: "LOG IN EVERY DAY AND CLAIM YOUR REWARD FROM THE MAIN DASHBOARD." },
            { q: "CAN I GIFT REWARDS TO FRIENDS?", a: "NO, ITEM GIFTING IS CURRENTLY NOT SUPPORTED IN THE GAME." },
            { q: "DO REWARDS EXPIRE?", a: "UNCLAIMED EVENT REWARDS MAY EXPIRE SEVERAL DAYS AFTER THE EVENT ENDS." }
        ]
    };

    const faqs = allFaqs[activeTab] || allFaqs['GAMEPLAY'];

    useEffect(() => {
        setFaqActive(0);
    }, [activeTab]);

    useEffect(() => {
        fetch(API)
            .then(res => res.json())
            .then(data => { if (data.contactPage) setCp(data.contactPage); })
            .catch(() => { }); // use defaults if backend offline
    }, []);

    const hero = cp.hero || defaultContent.hero;
    const infoBox = cp.infoBox || defaultContent.infoBox;
    const support = cp.support || defaultContent.support;

    return (
        <main className="contact-page">
            {/* ── HERO ── */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title"
                        dangerouslySetInnerHTML={{ __html: hero.title.replace(/YOU!/, '<span>YOU!</span>') }}
                    />
                    <p className="contact-hero-subtitle">{hero.subtitle}</p>
                    <button className="contact-hero-btn">{hero.buttonText}</button>
                </div>
            </section>

            {/* ── CONTACT FORM ── */}
            <section className="contact-form-section">
                <div className="contact-form-container">
                    <div className="contact-form-left">
                        <img src={hero.characterImage} alt="Character" className="contact-character-img" />
                    </div>

                    <div className="contact-form-middle">
                        <form className="contact-form-box">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>RUNNER NAME <span>(REQUIRED)</span></label>
                                    <input type="text" placeholder="YOUR NAME" required />
                                </div>
                                <div className="form-group">
                                    <label>EMAIL ADDRESS <span>(REQUIRED)</span></label>
                                    <input type="email" placeholder="YOU@EXAMPLE.COM" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>SUBJECT <span>(DROPDOWN OR TEXT FIELD)</span></label>
                                <div className="select-wrapper">
                                    <select defaultValue="GENERAL INQUIRY">
                                        <option value="GENERAL INQUIRY">GENERAL INQUIRY</option>
                                        <option value="SUPPORT">SUPPORT</option>
                                        <option value="FEEDBACK">FEEDBACK</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>MESSAGE <span>(REQUIRED)</span></label>
                                <textarea placeholder="ENTER MESSAGE..." required></textarea>
                            </div>
                            <button type="submit" className="form-submit-btn">SEND MESSAGE</button>
                        </form>
                    </div>

                    <div className="contact-form-right">
                        <div className="contact-info-box">
                            <h2 className="info-title">{infoBox.title}</h2>
                            <p className="info-text">{infoBox.text}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SUPPORT CARDS ── */}
            <section className="contact-support-section">
                <div className="contact-support-inner">
                    <h2 className="support-title">{support.title}</h2>
                    <p className="support-subtitle">{support.subtitle}</p>

                    <div className="support-cards">
                        {(support.cards || []).map((card, i) => (
                            <div key={i} className={`support-card support-card--${card.type}`}>
                                <div className="support-card-icon">
                                    <img src={card.icon} alt={card.type} />
                                </div>
                                <h3 className="support-card-title">{card.title}</h3>
                                <p className="support-card-desc">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── BACKGROUND OVERLAY SECTION ── */}
            {cp.bgSection && (
                <>
                    <section
                    className="contact-bg-overlay-section"
                    style={{ backgroundColor: cp.bgSection.bgColor }}
                >
                    <div
                        className="contact-bg-overlay-img"
                        style={{ backgroundImage: `url(${cp.bgSection.overlayImage})` }}
                    ></div>
                    <div className="contact-bg-overlay-content-wrapper">
                        <div className="contact-bg-overlay-centered-img">
                            <img src="/assets/contactassets/Mask group.png" alt="Mask Group" className="contact-mask-base-img" />
                            <div className="contact-mask-content-layout">
                                <div className="contact-mask-left">
                                    {tabs.map(tab => (
                                        <button
                                            key={tab}
                                            className={`cmask-btn ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                        >
                                            <span className="cmask-btn-text">{tab}</span>
                                            <span className="cmask-btn-icon">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="7 3 17 12 7 21"></polyline>
                                                </svg>
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="contact-mask-right">
                                    <div className="cmask-faq-header-wrapper">
                                        <img src="/assets/contactassets/questioniconleft.png" alt="Question Left" className="cmask-q-icon-left" />
                                        <div className="cmask-faq-title-group">
                                            <h3 className="cmask-faq-title">NEED HELP RIGHT NOW?</h3>
                                            <p className="cmask-faq-subtitle">CHECK OUT THE FREQUENTLY ASKED QUESTIONS</p>
                                        </div>
                                        <img src="/assets/contactassets/questioniconright.png" alt="Question Right" className="cmask-q-icon-right" />
                                    </div>
                                    <div className="cmask-faq-box">
                                        {faqs.map((faq, i) => (
                                            <div key={i} className={`cmask-faq-item ${faqActive === i ? 'active' : ''}`} onClick={() => setFaqActive(i)}>
                                                <div className="cmask-faq-head">
                                                    <h4>{faq.q}</h4>
                                                    <span>{faqActive === i ? '^' : 'v'}</span>
                                                </div>
                                                {faqActive === i && (
                                                    <div className="cmask-faq-body">
                                                        <p>{faq.a}</p>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <img src="/assets/contactassets/girlimage.png" alt="Girl Character" className="contact-mask-girl-img" />
                        </div>
                        <div className="contact-social-section">
                            <h2 className="contact-social-title">CONNECT WITH US ON SOCIAL MEDIA</h2>
                            <p className="contact-social-desc">
                                STAY UP-TO-DATE WITH THE LATEST NEWS, UPDATES, AND PROMOTIONS FROM RUNNER RUNNER BY FOLLOWING US ON SOCIAL MEDIA. JOIN THE CONVERSATION, SHARE YOUR EXPERIENCE, AND BE PART OF THE COMMUNITY!
                            </p>
                            <div className="contact-social-icons">
                                <a href="#" className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/contactassets/x.png" alt="X" />
                                </a>
                                <a href="#" className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/contactassets/facebook.png" alt="Facebook" />
                                </a>
                                <a href="#" className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/contactassets/tiktok.png" alt="TikTok" />
                                </a>
                                <a href="#" className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/contactassets/instahram.png" alt="Instagram" />
                                </a>
                                <a href="#" className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/contactassets/Youtube.png" alt="YouTube" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                <FinalSection />
            </>
            )}

            <Footer />
        </main>
    );
};

export default Contact;
