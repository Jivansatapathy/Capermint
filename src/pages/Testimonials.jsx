import React from 'react';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import '../styles/testimonials.css';

const Testimonials = () => {
    return (
        <main className="testimonials-page">
            <section className="testimonials-hero">
                <div className="testimonials-hero-content">
                    <h1 className="testimonials-hero-title">
                        WHAT OUR <span>RUNNERS</span> ARE SAYING
                    </h1>
                    <p className="testimonials-hero-subtitle">
                        THOUSANDS OF PLAYERS ARE DASHING THROUGH THE CITY. HERE IS WHY THEY CANNOT STOP RUNNING.
                    </p>
                </div>
            </section>

            <section className="testimonial-stats-section">
                <div className="testimonial-stats-box">
                    <div className="testimonial-stats-container">
                        <div className="stats-card stats-card-1">
                            <img src="/assets/Testimonial/11.png" alt="Controller" className="stats-card-icon" />
                            <div className="stats-card-content">
                                <h2 className="stats-numeric">2M+</h2>
                                <h3 className="stats-title">GAMES PLAYED</h3>
                                <p className="stats-desc">RUNS COMPLETED BY PLAYERS AROUND THE WORLD</p>
                            </div>
                        </div>

                        <div className="stats-card stats-card-2">
                            <img src="/assets/Testimonial/12.png" alt="People" className="stats-card-icon" />
                            <div className="stats-card-content">
                                <h2 className="stats-numeric">370K+</h2>
                                <h3 className="stats-title">INSTALLS</h3>
                                <p className="stats-subtitle">RUNNERS WHO HAVE JOINED THE</p>
                                <p className="stats-desc">RUNNER RUNNER</p>
                            </div>
                        </div>

                        <div className="stats-card stats-card-3">
                            <img src="/assets/Testimonial/13.png" alt="Money" className="stats-card-icon" />
                            <div className="stats-card-content">
                                <h2 className="stats-numeric">$75K+</h2>
                                <h3 className="stats-title">PRIZES DISTRIBUTED</h3>
                                <p className="stats-desc">REAL REWARDS EARNED THROUGH SPECIAL EVENTS</p>
                            </div>
                        </div>

                        <div className="stats-card stats-card-4">
                            <img src="/assets/Testimonial/14.png" alt="Lightning" className="stats-card-icon" />
                            <div className="stats-card-content">
                                <h2 className="stats-numeric">3K+</h2>
                                <h3 className="stats-title">GAMES DAILY</h3>
                                <p className="stats-desc">THE RUN NEVER STOPS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialsSection />
            <Footer />
        </main>
    );
};

export default Testimonials;
