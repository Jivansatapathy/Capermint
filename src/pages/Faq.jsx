import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import '../styles/faq.css';

const faqData = [
    {
        question: "HOW DO I DOWNLOAD RUNNER RUNNER?",
        answer: "YOU CAN DOWNLOAD RUNNER RUNNER DIRECTLY FROM OUR WEBSITE OR FROM YOUR PLATFORM'S APP STORE. IT'S COMPLETELY FREE TO PLAY, WITH OPTIONAL COSMETIC UPGRADES AVAILABLE IN-GAME."
    },
    {
        question: "WHAT PLATFORMS ARE SUPPORTED?",
        answer: "RUNNER RUNNER IS CURRENTLY AVAILABLE ON ANDROID AND IOS DEVICES. WE ARE ALSO WORKING ON A PC VERSION TO BE RELEASED SOON."
    },
    {
        question: "ARE THERE IN-APP PURCHASES?",
        answer: "YES, RUNNER RUNNER OFFERS OPTIONAL IN-APP PURCHASES FOR COSMETIC ITEMS LIKE CHARACTER SKINS, POWER-UPS, AND BATTLE PASSES. THESE DO NOT PROVIDE COMPETITIVE ADVANTAGES."
    },
    {
        question: "HOW DOES MULTIPLAYER WORK?",
        answer: "MULTIPLAYER IN RUNNER RUNNER ALLOWS YOU TO COMPETE AGAINST FRIENDS OR RANDOM PLAYERS WORLDWIDE IN REAL-TIME RACES. WINNING RACES EARNS YOU RANKING POINTS AND EXCLUSIVE REWARDS."
    },
    {
        question: "CAN I PLAY OFFLINE?",
        answer: "WHILE THE CORE MULTIPLAYER EXPERIENCE REQUIRES AN INTERNET CONNECTION, WE OFFER AN OFFLINE PRACTICE MODE WHERE YOU CAN HONE YOUR SKILLS ON VARIOUS TRACKS WITHOUT COMPETING AGAINST OTHERS."
    }
];

const FaqArrrow = ({ isOpen }) => (
    <svg 
        width="24" height="24" viewBox="0 0 24 24" fill="none" 
        style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
    >
        <path d="M6 9L12 15L18 9" stroke="#4B55C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const StarIcon = ({ fill = 'none', className = '' }) => (
    <svg 
        width="24" height="24" viewBox="0 0 24 24" fill={fill} 
        className={className} xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            stroke={fill === '#F9F506' ? '#F9F506' : '#F9F506'} 
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        />
    </svg>
);

const RatingsSummary = () => {
    const ratings = [
        { stars: 5, percentage: 78 },
        { stars: 4, percentage: 15 },
        { stars: 3, percentage: 4 },
        { stars: 2, percentage: 2 },
        { stars: 1, percentage: 1 }
    ];

    return (
        <section className="ratings-section">
            <div className="ratings-card">
                <div className="ratings-main-col">
                    <div className="ratings-header">
                        <span className="rating-number">4.8</span>
                        <span className="rating-out-of">OUT OF 5</span>
                    </div>
                    <div className="rating-stars-row">
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <StarIcon fill="#F9F506" />
                        <div className="half-star-container">
                             <StarIcon fill="none" className="star-outline" />
                             <div className="star-fill-mask" style={{ width: '80%' }}>
                                <StarIcon fill="#F9F506" className="star-filled" />
                             </div>
                        </div>
                    </div>
                    <p className="ratings-count">BASED ON 12,450+ REVIEWS</p>
                </div>

                <div className="ratings-bars-col">
                    {ratings.map((r, i) => (
                        <div key={i} className="rating-bar-row">
                            <span className="star-label">{r.stars}</span>
                            <div className="bar-container">
                                <div className="bar-fill" style={{ width: `${r.percentage}%` }}></div>
                            </div>
                            <span className="percentage-label">{r.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div className="faq-page">
            <section className="faq-hero-section">
                {/* Background Layer with Blur */}
                <div className="faq-hero-bg-container">
                    <div className="faq-hero-pill"></div>
                </div>

                {/* Left Question Icon */}
                <img 
                    src="/assets/contactassets/questioniconleft.png" 
                    alt="Question" 
                    className="faq-hero-icon faq-icon-left" 
                />

                {/* Center Content */}
                <div className="faq-hero-content">
                    <h1 className="faq-hero-title">Got Questions?</h1>
                    <h2 className="faq-hero-subtitle">We have answers.</h2>
                    <button className="faq-contact-btn">Contact Us</button>
                </div>

                {/* Right Question Icon */}
                <img 
                    src="/assets/contactassets/questioniconright.png" 
                    alt="Question" 
                    className="faq-hero-icon faq-icon-right" 
                />
            </section>

            <section className="faq-list-section">
                <div className="faq-container">
                    {faqData.map((item, index) => (
                        <div 
                            key={index} 
                            className={`faq-card ${activeIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className="faq-card-header">
                                <h3 className="faq-question">{item.question}</h3>
                                <FaqArrrow isOpen={activeIndex === index} />
                            </div>
                            <div className="faq-card-content">
                                <p className="faq-answer">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <RatingsSummary />
            <Footer />
        </div>
    );
};

export default Faq;
