import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/contact.css';

import contentData from '../../content.json';

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
    const [cp, setCp] = useState(contentData.contactPage || defaultContent);
    const [faqActive, setFaqActive] = useState(0);
    const [activeTab, setActiveTab] = useState('GAMEPLAY');
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'GENERAL INQUIRY', message: '' });
    const [status, setStatus] = useState('');
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from('.contact-hero-content > *', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Form Section Animation
            gsap.from('.contact-form-container', {
                scrollTrigger: {
                    trigger: '.contact-form-section',
                    start: 'top 80%',
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });

            // Character Image Animation
            gsap.from('.contact-character-img', {
                scrollTrigger: {
                    trigger: '.contact-form-section',
                    start: 'top 70%',
                },
                x: -100,
                opacity: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.75)'
            });

            // Support Cards Animation
            gsap.from('.support-card', {
                scrollTrigger: {
                    trigger: '.contact-support-section',
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });

            // FAQ Section Animation
            gsap.from('.contact-mask-content-layout', {
                scrollTrigger: {
                    trigger: '.contact-bg-overlay-section',
                    start: 'top 70%',
                },
                scale: 0.95,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Social Icons Animation
            gsap.from('.social-icon-box', {
                scrollTrigger: {
                    trigger: '.contact-social-section',
                    start: 'top 90%',
                },
                scale: 0,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => { 
                if (data.contactPage) {
                    setCp(data.contactPage); 
                    if (data.contactPage.faqSection?.tabs?.length > 0) {
                        setActiveTab(data.contactPage.faqSection.tabs[0]);
                    }
                }
            })
            .catch(() => { }); // use defaults if backend offline
    }, []);

    const hero = cp.hero || defaultContent.hero;
    const form = cp.form || { labels: {}, placeholders: {}, subjectOptions: [] };
    const infoBox = cp.infoBox || defaultContent.infoBox;
    const support = cp.support || defaultContent.support;
    const faqSection = cp.faqSection || { tabs: [], allFaqs: {} };
    const socialSection = cp.socialSection || { icons: [] };
    const bg = cp.bgSection || {};
    const icons = cp.icons || {};

    const tabs = faqSection.tabs || [];
    const faqs = (faqSection.allFaqs && faqSection.allFaqs[activeTab]) || [];

    useEffect(() => {
        setFaqActive(0);
    }, [activeTab]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('SENDING...');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setStatus('SENT!');
                setFormData({ name: '', email: '', subject: 'GENERAL INQUIRY', message: '' });
                setTimeout(() => setStatus(''), 3000);
            } else {
                throw new Error('Failed');
            }
        } catch (e) {
            setStatus('ERROR');
        }
    };

    return (
        <main className="contact-page" ref={containerRef}>
            {/* ── HERO ── */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title"
                        dangerouslySetInnerHTML={{ __html: (hero.title || "").replace(/YOU!/, '<span>YOU!</span>') }}
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
                        <form className="contact-form-box" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>{form.labels?.name || "RUNNER NAME"} <span>{form.labels?.requiredText || "(REQUIRED)"}</span></label>
                                    <input 
                                        type="text" 
                                        placeholder={form.placeholders?.name || "YOUR NAME"} 
                                        required 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{form.labels?.email || "EMAIL ADDRESS"} <span>{form.labels?.requiredText || "(REQUIRED)"}</span></label>
                                    <input 
                                        type="email" 
                                        placeholder={form.placeholders?.email || "YOU@EXAMPLE.COM"} 
                                        required 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{form.labels?.subject || "SUBJECT"} <span>{form.labels?.subjectInfo || "(DROPDOWN OR TEXT FIELD)"}</span></label>
                                <div className="select-wrapper">
                                    <select 
                                        value={formData.subject}
                                        onChange={e => setFormData({...formData, subject: e.target.value})}
                                    >
                                        {(form.subjectOptions || ["GENERAL INQUIRY", "SUPPORT", "FEEDBACK"]).map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{form.labels?.message || "MESSAGE"} <span>{form.labels?.requiredText || "(REQUIRED)"}</span></label>
                                <textarea 
                                    placeholder={form.placeholders?.message || "ENTER MESSAGE..."} 
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="form-submit-btn" disabled={status === 'SENDING...'}>
                                {status || form.buttonText || "SEND MESSAGE"}
                            </button>
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
                    style={{ backgroundColor: bg.bgColor }}
                >
                    <div
                        className="contact-bg-overlay-img"
                        style={{ backgroundImage: `url(${bg.overlayImage})` }}
                    ></div>
                    <div className="contact-bg-overlay-content-wrapper">
                        <div className="contact-bg-overlay-centered-img">
                            <img src={bg.maskGroup || "/assets/contactassets/Mask group.png"} alt="Mask Group" className="contact-mask-base-img" />
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
                                        <img src={icons.questionLeft || "/assets/contactassets/questioniconleft.png"} alt="Question Left" className="cmask-q-icon-left" />
                                        <div className="cmask-faq-title-group">
                                            <h3 className="cmask-faq-title">{faqSection.title || "NEED HELP RIGHT NOW?"}</h3>
                                            <p className="cmask-faq-subtitle">{faqSection.subtitle || "CHECK OUT THE FREQUENTLY ASKED QUESTIONS"}</p>
                                        </div>
                                        <img src={icons.questionRight || "/assets/contactassets/questioniconright.png"} alt="Question Right" className="cmask-q-icon-right" />
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
                            <img src={bg.girlImage || "/assets/contactassets/girlimage.png"} alt="Girl Character" className="contact-mask-girl-img" />
                        </div>
                        <div className="contact-social-section">
                            <h2 className="contact-social-title">{socialSection.title || "CONNECT WITH US ON SOCIAL MEDIA"}</h2>
                            <p className="contact-social-desc">
                                {socialSection.description}
                            </p>
                            <div className="contact-social-icons">
                                {(socialSection.icons || []).map((s, idx) => (
                                    <a key={idx} href={s.url || "#"} className="social-icon-box" target="_blank" rel="noopener noreferrer">
                                        <img src={s.image} alt={s.platform} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <FinalSection />
            </>
            )}

            <Footer content={content} />
        </main>
    );
};

export default Contact;
