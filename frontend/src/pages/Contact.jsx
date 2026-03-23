import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/contact.css';


const defaultContent = {};

const Contact = () => {
    const [cp, setCp] = useState(defaultContent);
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

    const hero = cp.hero || {};
    const form = cp.form || { labels: {}, placeholders: {}, subjectOptions: [] };
    const infoBox = cp.infoBox || {};
    const support = cp.support || {};
    const faqSection = cp.faqSection || {};
    const socialSection = cp.socialSection || {};
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
                                    <label>{form.labels?.name || ""} <span>{form.labels?.requiredText || ""}</span></label>
                                    <input 
                                        type="text" 
                                        placeholder={form.placeholders?.name || ""} 
                                        required 
                                        value={formData.name}
                                        onChange={e => setFormData({...formData, name: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>{form.labels?.email || ""} <span>{form.labels?.requiredText || ""}</span></label>
                                    <input 
                                        type="email" 
                                        placeholder={form.placeholders?.email || ""} 
                                        required 
                                        value={formData.email}
                                        onChange={e => setFormData({...formData, email: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{form.labels?.subject || ""} <span>{form.labels?.subjectInfo || ""}</span></label>
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
                                <label>{form.labels?.message || ""} <span>{form.labels?.requiredText || ""}</span></label>
                                <textarea 
                                    placeholder={form.placeholders?.message || ""} 
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({...formData, message: e.target.value})}
                                ></textarea>
                            </div>
                            <button type="submit" className="form-submit-btn" disabled={status === 'SENDING...'}>
                                {status || form.buttonText || ""}
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
                            <img src={bg.maskGroup || ""} alt="Mask Group" className="contact-mask-base-img" />
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
                                        <img src={icons.questionLeft || ""} alt="Question Left" className="cmask-q-icon-left" />
                                        <div className="cmask-faq-title-group">
                                            <h3 className="cmask-faq-title">{faqSection.title || ""}</h3>
                                            <p className="cmask-faq-subtitle">{faqSection.subtitle || ""}</p>
                                        </div>
                                        <img src={icons.questionRight || ""} alt="Question Right" className="cmask-q-icon-right" />
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
                            <img src={bg.girlImage || ""} alt="Girl Character" className="contact-mask-girl-img" />
                        </div>
                        <div className="contact-social-section">
                            <h2 className="contact-social-title">{socialSection.title || ""}</h2>
                            <p className="contact-social-desc">
                                {socialSection.description}
                            </p>
                            <div className="contact-social-icons">
                                {(socialSection.icons || []).map((s, idx) => (
                                    <a key={idx} href={s.url || ""} className="social-icon-box" target="_blank" rel="noopener noreferrer">
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
