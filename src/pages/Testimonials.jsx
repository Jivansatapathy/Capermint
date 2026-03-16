import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import '../styles/testimonials.css';

import contentData from '../../content.json';

const Testimonials = () => {
    const content = contentData;
    const stats = content?.testimonialsPage?.stats || [
        {
            icon: "/assets/Testimonial/11.png",
            value: "2M+",
            title: "GAMES PLAYED",
            desc: "RUNS COMPLETED BY PLAYERS AROUND THE WORLD"
        },
        {
            icon: "/assets/Testimonial/12.png",
            value: "370K+",
            title: "INSTALLS",
            subtitle: "RUNNERS WHO HAVE JOINED THE",
            desc: "RUNNER RUNNER"
        },
        {
            icon: "/assets/Testimonial/13.png",
            value: "$75K+",
            title: "PRIZES DISTRIBUTED",
            desc: "REAL REWARDS EARNED THROUGH SPECIAL EVENTS"
        },
        {
            icon: "/assets/Testimonial/14.png",
            value: "3K+",
            title: "GAMES DAILY",
            desc: "THE RUN NEVER STOPS"
        }
    ];

    const hero = content?.testimonialsPage?.hero || { 
        title: "WHAT OUR RUNNERS SAY", 
        subtitle: "REAL FEEDBACK FROM REAL PLAYERS" 
    };

    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from('.testimonials-hero-content > *', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Stats Cards Animation
            gsap.from('.stats-card', {
                scrollTrigger: {
                    trigger: '.testimonial-stats-section',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="testimonials-page" ref={containerRef}>
            <section className="testimonials-hero">
                <div className="testimonials-hero-content">
                    <h1 className="testimonials-hero-title" dangerouslySetInnerHTML={{ __html: hero.title }}></h1>
                    <p className="testimonials-hero-subtitle">
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            <section className="testimonial-stats-section">
                <div className="testimonial-stats-box">
                    <div className="testimonial-stats-container">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`stats-card stats-card-${idx + 1}`}>
                                <img src={stat.icon} alt={stat.title} className="stats-card-icon" />
                                <div className="stats-card-content">
                                    <h2 className="stats-numeric">{stat.value}</h2>
                                    <h3 className="stats-title">{stat.title}</h3>
                                    {stat.subtitle && <p className="stats-subtitle">{stat.subtitle}</p>}
                                    <p className="stats-desc">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TestimonialsSection content={content} />
            <Footer content={content} />
        </main>
    );
};

export default Testimonials;
