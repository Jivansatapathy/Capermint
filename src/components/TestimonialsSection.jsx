import React from 'react';

const TestimonialsSection = () => {
    const testimonials = [
        {
            rating: 5,
            text: `"RUNNER RUNNER IS ABSOLUTELY ADDICTIVE! THE GAMEPLAY IS SMOOTH, THE CHARACTERS ARE AMAZING, AND EVERY RUN FEELS FRESH. I CAN'T STOP PLAYING!"`,
            name: "SARAH MITCHELL",
            role: "PRO PLAYER",
            icon: "🏃‍♀️"
        },
        {
            rating: 5,
            text: `"BEST ENDLESS RUNNER I'VE PLAYED. THE POWER-UPS ARE CREATIVE, THE WORLDS ARE BEAUTIFUL, AND THE DIFFICULTY CURVE IS PERFECT. HIGHLY RECOMMENDED!"`,
            name: "MARCUS JOHNSON",
            role: "CASUAL GAMER",
            icon: "🎮"
        },
        {
            rating: 5,
            text: `"MY VIEWERS LOVE WATCHING ME PLAY RUNNER RUNNER. THE FAST-PACED ACTION AND COMPETITIVE MODES MAKE FOR GREAT CONTENT. THIS GAME IS A GEM!"`,
            name: "EMMA CHEN",
            role: "STREAMER",
            icon: "📱"
        },
        {
            rating: 5,
            text: `"THE MECHANICS ARE TIGHT AND RESPONSIVE. I'VE BEEN GRINDING FOR HIGH SCORES AND THE LEADERBOARD SYSTEM KEEPS ME MOTIVATED. LOVE IT!"`,
            name: "ALEX RODRIGUEZ",
            role: "SPEEDRUNNER",
            icon: "⚡"
        },
        {
            rating: 4,
            text: `"FINALLY, A MOBILE GAME THAT RESPECTS MY TIME! NO PAY-TO-WIN NONSENSE, JUST PURE FUN. RUNNER RUNNER IS MY GO-TO GAME DURING BREAKS."`,
            name: "JESSICA LEE",
            role: "MOBILE GAMER",
            icon: "⭐"
        },
        {
            rating: 4,
            text: `"THE CHARACTER DESIGNS ARE INCREDIBLE, AND THE NEON AESTHETIC IS SO COOL. THIS GAME HAS SERIOUS PRODUCTION VALUE. DEVELOPERS DID AN AMAZING JOB!"`,
            name: "DAVID THOMPSON",
            role: "GAMING ENTHUSIAST",
            icon: "🎯"
        }
    ];

    return (
        <section className="testimonials-section">
            <div className="testimonials-header">
                <h2 className="testimonials-title">WHAT RUNNERS ARE SAYING</h2>
                <p className="testimonials-subtitle">THOUGHTS FROM RUNNERS AROUND THE WORLD</p>
            </div>

            <div className="testimonials-grid">
                {testimonials.map((review, index) => (
                    <div key={index} className="testimonial-card">
                        <div className="testimonial-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} className={`star ${i < review.rating ? 'filled' : 'empty'}`}>★</span>
                            ))}
                        </div>
                        <p className="testimonial-text">{review.text}</p>

                        <div className="testimonial-author">
                            <div className="testimonial-icon">{review.icon}</div>
                            <div className="testimonial-author-info">
                                <h4 className="testimonial-name">{review.name}</h4>
                                <span className="testimonial-role">{review.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSection;
