import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalSection = ({ content }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sectionRef = useRef(null);

    const rawSlides = content?.finalSection?.slides;
    const defaultSlides = [];

    const slides = rawSlides || defaultSlides;

    // Slide interval
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [slides.length]);

    // Scroll Animations
    useEffect(() => {
        if (!slides.length || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Only animate the characters when scrolling into the section
            // Use fromTo to ensure opacity 1 at the end and visibility even if triggered early
            if (document.querySelector('.final-char-left')) {
                gsap.fromTo('.final-char-left', 
                    { yPercent: -50, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: 'bounce.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 95%',
                        }
                    }
                );
            }

            if (document.querySelector('.final-char-right')) {
                gsap.fromTo('.final-char-right',
                    { yPercent: -50, opacity: 0 },
                    {
                        yPercent: 0,
                        opacity: 1,
                        duration: 1.5,
                        ease: 'bounce.out',
                        delay: 0.2,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 95%',
                        }
                    }
                );
            }

            if (document.querySelector('.final-game-logo')) {
                gsap.fromTo('.final-game-logo',
                    { scale: 0, rotation: -15, opacity: 0 },
                    {
                        scale: 1,
                        rotation: 0,
                        opacity: 1,
                        duration: 1,
                        ease: 'back.out(2)',
                        delay: 0.5,
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 95%',
                        }
                    }
                );
            }

            // Force refresh after a short delay to account for Map pins
            setTimeout(() => {
                ScrollTrigger.refresh();
                window.dispatchEvent(new Event('resize'));
            }, 1000);
        }, sectionRef);

        return () => ctx.revert();
    }, [slides]);

    return (
        <section className="final-section" ref={sectionRef}>
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`final-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url('${slide.bg}')` }}
                >
                    <div className="final-overlay"></div>

                    {index === currentSlide && slide.type === 'characters' && (
                        <div className="final-character-layer">
                            <img src={slide.leftChar} alt="Character Left" className="final-char-left" style={{ opacity: 1, willChange: 'transform, opacity' }} />
                            <img src={slide.logo} alt="Runner Runner Logo" className="final-game-logo" style={{ opacity: 1, willChange: 'transform, opacity' }} />
                            <img src={slide.rightChar} alt="Character Right" className="final-char-right" style={{ opacity: 1, willChange: 'transform, opacity' }} />
                        </div>
                    )}

                    <div className="final-content">
                        <h2 className="final-title" style={{ color: slide.titleColor }}>{slide.title}</h2>
                        <p className="final-subtitle" style={{ whiteSpace: 'pre-line' }}>{slide.subtitle}</p>

                        {slide.type === 'standard' ? (
                            <div className="final-store-buttons">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src={slide.storeButtons?.googlePlay || null} alt="Google Play" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src={slide.storeButtons?.appStore || null} alt="App Store" />
                                </a>
                            </div>
                        ) : (
                            <div className="final-action-button-container">
                                <button className="final-action-button" style={{ color: slide.buttonColor }}>
                                    {slide.buttonText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div className="final-pagination">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'dot-active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default FinalSection;
