import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollFloat from './ScrollFloat';

const PowerupsSection = ({ content }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = document.querySelectorAll('.powerup-card');

            cards.forEach(card => {
                const imageWrapper = card.querySelector('.powerup-image-wrapper');

                const handleMouseMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const xPercent = (x / rect.width - 0.5);
                    const yPercent = (y / rect.height - 0.5);

                    // 3D Tilt for the card
                    gsap.to(card, {
                        rotateY: xPercent * 25,
                        rotateX: -yPercent * 25,
                        duration: 0.6,
                        ease: 'power2.out',
                        transformPerspective: 800
                    });

                    // Parallax Pop for the powerup icon
                    if (imageWrapper) {
                        gsap.to(imageWrapper, {
                            xPercent: xPercent * 10,
                            yPercent: yPercent * 10,
                            z: 40,
                            duration: 0.6,
                            ease: 'power2.out'
                        });
                    }
                };

                const handleMouseLeave = () => {
                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        duration: 0.8,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    if (imageWrapper) {
                        gsap.to(imageWrapper, {
                            xPercent: 0,
                            yPercent: 0,
                            z: 0,
                            duration: 0.8,
                            ease: 'elastic.out(1, 0.5)'
                        });
                    }
                };

                card.addEventListener('mousemove', handleMouseMove);
                card.addEventListener('mouseleave', handleMouseLeave);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);
    if (!content || !content.powerups) return null;

    const { title, subtitle, items } = content.powerups;

    return (
        <section className="powerups-section" ref={sectionRef}>
            <div className="powerups-content-wrapper">
                <div className="powerups-header">
                    <ScrollFloat
                        animationDuration={1}
                        ease='back.inOut(2)'
                        scrollStart='center bottom+=50%'
                        scrollEnd='bottom bottom-=40%'
                        stagger={0.03}
                        containerClassName="powerups-title"
                    >
                        {title}
                    </ScrollFloat>
                    <p className="powerups-subtitle">{subtitle}</p>
                </div>

                <div className="powerups-grid">
                    {items.map((powerup, index) => (
                        <div key={index} className="powerup-card">
                            <div className="powerup-card-bg">
                                <img src={powerup.cardBg || null} alt="Card Background" />
                            </div>
                            <div className="powerup-image-wrapper">
                                <img src={powerup.image || null} alt={powerup.name} />
                            </div>
                            <div className="powerup-info">
                                <h3 className="powerup-name">{powerup.name}</h3>
                                <p className="powerup-desc">{powerup.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="powerups-pagination">
                    <span className="dot dot-active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </section>
    );
};

export default PowerupsSection;
