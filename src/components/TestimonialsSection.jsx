import React, { useState } from 'react';

const TestimonialsSection = () => {
    const [formRating, setFormRating] = useState(0);

    const testimonials = [
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

    return (
        <section className="testimonials-section">
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
                    <h2 className="share-story-title">
                        SHARE YOUR <span className="highlight">STORY</span>
                    </h2>
                    <p className="share-story-subtitle">
                        GOT AN EPIC RUN? TELL US ABOUT IT AND YOU MIGHT BE FEATURED ON THIS PAGE!
                    </p>

                    <form className="share-story-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label>RUNNER NAME</label>
                                <input type="text" placeholder="YOUR USERNAME" />
                            </div>
                            <div className="form-group">
                                <label>EMAIL ADDRESS</label>
                                <input type="email" placeholder="YOU@EXAMPLE.COM" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>RATING</label>
                            <div className="form-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span 
                                        key={i} 
                                        className={`form-star-item ${i < formRating ? 'active' : ''}`}
                                        onClick={() => setFormRating(i + 1)}
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
                            <textarea placeholder="TELL US ABOUT YOUR EXPERIENCE..."></textarea>
                        </div>

                        <button type="submit" className="submit-review-btn">
                            SUBMIT REVIEW
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
