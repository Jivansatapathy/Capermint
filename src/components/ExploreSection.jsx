import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExploreSection = ({ content }) => {
    const sectionRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from('.explore-title', {
                scale: 1.5,
                opacity: 0,
                duration: 1.5,
                ease: 'power4.out'
            })
                .from('.explore-subtitle', {
                    y: 30,
                    opacity: 0,
                    duration: 1.0,
                    ease: 'power3.out'
                }, '-=1.0')
                .from('.explore-button', {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                }, '-=0.6');

            // Button Hover Effect
            const btn = buttonRef.current;
            const handleMouseMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                });
            };

            btn.addEventListener('mousemove', handleMouseMove);
            btn.addEventListener('mouseleave', handleMouseLeave);
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    if (!content || !content.explore) return null;

    const { title, subtitle, buttonText } = content.explore;

    return (
        <section className="explore-section" ref={sectionRef}>
            <div className="explore-gradient-overlay"></div>

            <div className="explore-content">
                <h2 className="explore-title">{title}</h2>
                <h3 className="explore-subtitle">{subtitle}</h3>

                <button className="explore-button" ref={buttonRef}>
                    <span className="explore-btn-text">{buttonText}</span>
                    <span className="explore-btn-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#21910B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ExploreSection;
