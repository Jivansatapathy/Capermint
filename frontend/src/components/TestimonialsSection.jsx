import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import axios from 'axios';

const TestimonialsSection = ({ content }) => {
    const [formRating, setFormRating] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', review: '' });
    const [status, setStatus] = useState('');
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Stagger cards animation
            gsap.from('.testimonial-card', {
                scrollTrigger: {
                    trigger: '.testimonials-grid',
                    start: 'top 85%',
                },
                y: 60,
                opacity: 0,
                scale: 0.9,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Share Story Section
            gsap.from('.share-story-box', {
                scrollTrigger: {
                    trigger: '.share-story-section',
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleRatingClick = (r) => {
        setFormRating(r);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formRating === 0) {
            setStatus('Please select a rating');
            return;
        }
        setStatus('Sending...');
        try {
            const response = await axios.post('/api/testimonials', {
                ...formData,
                rating: formRating
            });
            if (response.status === 201 || response.status === 200) {
                setStatus('Review submitted successfully!');
                setFormData({ name: '', email: '', review: '' });
                setFormRating(0);
                setTimeout(() => setStatus(''), 3000);
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('Error sending review. Please try again.');
        }
    };

    const testimonials = content?.testimonials || [
        {
            rating: 5,
            text: `"RUNNER RUNNER IS ABSOLUTELY ADDICTIVE! THE GAMEPLAY IS SMOOTH, THE CHARACTERS ARE AMAZING, AND EVERY RUN FEELS FRESH. I CAN'T STOP PLAYING!"`,
            name: "SARAH MITCHELL",
            role: "PRO PLAYER",
            avatar: "/assets/Testimonial/avatars/sarah.png"
        },
        {
            rating: 5,
            text: `"BEST ENDLESS RUNNER I'VE PLAYED. THE POWER-UPS ARE CREATIVE, THE WORLDS ARE BEAUTIFUL, AND THE DIFFICULTY CURVE IS PERFECT. HIGHLY RECOMMENDED!"`,
            name: "MARCUS JOHNSON",
            role: "CASUAL GAMER",
            avatar: "/assets/Testimonial/avatars/marcus.png"
        },
        {
            rating: 5,
            text: `"MY VIEWERS LOVE WATCHING ME PLAY RUNNER RUNNER. THE FAST-PACED ACTION AND COMPETITIVE MODES MAKE FOR GREAT CONTENT. THIS GAME IS A GEM!"`,
            name: "EMMA CHEN",
            role: "STREAMER",
            avatar: "/assets/Testimonial/avatars/emma.png"
        },
        {
            rating: 5,
            text: `"THE MECHANICS ARE TIGHT AND RESPONSIVE. I'VE BEEN GRINDING FOR HIGH SCORES AND THE LEADERBOARD SYSTEM KEEPS ME MOTIVATED. LOVE IT!"`,
            name: "ALEX RODRIGUEZ",
            role: "SPEEDRUNNER",
            avatar: "/assets/Testimonial/avatars/alex.png"
        },
        {
            rating: 4,
            text: `"FINALLY, A MOBILE GAME THAT RESPECTS MY TIME! NO PAY-TO-WIN NONSENSE, JUST PURE FUN. RUNNER RUNNER IS MY GO-TO GAME DURING BREAKS."`,
            name: "JESSICA LEE",
            role: "MOBILE GAMER",
            avatar: "/assets/Testimonial/avatars/jessica.png"
        },
        {
            rating: 4,
            text: `"THE CHARACTER DESIGNS ARE INCREDIBLE, AND THE NEON AESTHETIC IS SO COOL. THIS GAME HAS SERIOUS PRODUCTION VALUE. DEVELOPERS DID AN AMAZING JOB!"`,
            name: "DAVID THOMPSON",
            role: "GAMING ENTHUSIAST",
            avatar: "/assets/Testimonial/avatars/david.png"
        }
    ];

    const shareStory = content?.testimonialsPage?.shareStory || {
        title: "SHARE YOUR <span class=\"highlight\">STORY</span>",
        subtitle: "GOT AN EPIC RUN? TELL US ABOUT IT AND YOU MIGHT BE FEATURED ON THIS PAGE!"
    };

    return (
        <section className="testimonials-section" ref={sectionRef}>
            <div className="testimonials-grid">
                {testimonials.map((review, index) => (
                    <div key={index} className="testimonial-card">
                        <div className="testimonial-stars">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? "star" : "star empty"}>★</span>
                            ))}
                        </div>
                        <p className="testimonial-text">{review.text}</p>

                        <div className="testimonial-author">
                            <div className="testimonial-avatar">
                                <img src={review.avatar} alt={review.name} />
                            </div>
                            <div className="testimonial-author-info">
                                <h4 className="testimonial-name">{review.name}</h4>
                                <span className="testimonial-role">{review.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="load-more-container">
                <button className="load-more-btn">
                    LOAD MORE
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            {/* SHARE YOUR STORY SECTION */}
            <div className="share-story-section">
                <div className="share-story-box">
                    <h2 className="share-story-title" dangerouslySetInnerHTML={{ __html: shareStory.title }}></h2>
                    <p className="share-story-subtitle">
                        {shareStory.subtitle}
                    </p>

                    <form className="share-story-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label>RUNNER NAME</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    placeholder="YOUR USERNAME" 
                                    required 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>EMAIL ADDRESS</label>
                                <input 
                                    type="email" 
                                    name="email"
                                    placeholder="YOU@EXAMPLE.COM" 
                                    required 
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>RATING</label>
                            <div className="form-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span 
                                        key={i} 
                                        className={`form-star-item ${i < formRating ? 'active' : ''}`}
                                        onClick={() => handleRatingClick(i + 1)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill={i < formRating ? "#FFB800" : "none"} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke={i < formRating ? "#FFB800" : "#38BDF8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>YOUR REVIEW</label>
                            <textarea 
                                name="review"
                                placeholder="TELL US ABOUT YOUR EXPERIENCE..." 
                                required
                                value={formData.review}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        {status && <p className="form-status" style={{ color: status.includes('Error') ? '#ff4757' : '#00E5FF', marginBottom: '15px' }}>{status}</p>}

                        <button type="submit" className="submit-review-btn" disabled={status === 'Sending...'}>
                            {status === 'Sending...' ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
