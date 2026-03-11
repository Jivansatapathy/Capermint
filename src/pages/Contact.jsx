import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
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
            { type: 'chat',  icon: '/assets/contactassets/chat.png',  title: 'LIVE CHAT', desc: 'AVAILABLE 24/7 VIA THE CHAT BUTTON AT THE BOTTOM-RIGHT OF THE PAGE.' },
        ]
    }
};

const Contact = () => {
    const [cp, setCp] = useState(defaultContent);

    useEffect(() => {
        fetch(API)
            .then(r => r.json())
            .then(data => { if (data.contactPage) setCp(data.contactPage); })
            .catch(() => {}); // use defaults if backend offline
    }, []);

    const hero    = cp.hero    || defaultContent.hero;
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
                <section 
                    className="contact-bg-overlay-section" 
                    style={{ backgroundColor: cp.bgSection.bgColor }}
                >
                    <div 
                        className="contact-bg-overlay-img" 
                        style={{ backgroundImage: `url(${cp.bgSection.overlayImage})` }}
                    ></div>
                    <div className="contact-bg-overlay-content">
                        <h2 className="bg-overlay-title">{cp.bgSection.title}</h2>
                        <p className="bg-overlay-subtitle">{cp.bgSection.subtitle}</p>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    );
};

export default Contact;
