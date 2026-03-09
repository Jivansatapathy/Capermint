import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const RunnersSection = ({ content }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.runner-card', sectionRef.current);

            cards.forEach(card => {
                const model = card.querySelector('.runner-model');
                const bg = card.querySelector('.runner-card-bg');
                const info = card.querySelector('.runner-info');

                const onMouseMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const xPercent = (x / rect.width - 0.5);
                    const yPercent = (y / rect.height - 0.5);

                    // Unified 3D Tilt for the whole card (No expansion)
                    gsap.to(card, {
                        rotateY: xPercent * 25,
                        rotateX: -yPercent * 25,
                        y: -10,
                        duration: 0.6,
                        ease: 'power2.out',
                        transformPerspective: 1000,
                        overwrite: 'auto'
                    });

                    // Subtle Parallax for the background
                    if (bg) {
                        gsap.to(bg, {
                            x: -xPercent * 15,
                            y: -yPercent * 15,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }

                    // Parallax for the info text
                    if (info) {
                        gsap.to(info, {
                            x: xPercent * 8,
                            y: yPercent * 8,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }
                };

                const onMouseLeave = () => {
                    // Force kill any active tweens 
                    gsap.killTweensOf([card, bg, model, info].filter(Boolean));

                    gsap.to(card, {
                        rotateY: 0,
                        rotateX: 0,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        overwrite: true
                    });
                    if (bg) {
                        gsap.to(bg, {
                            x: 0,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: true
                        });
                    }
                    if (info) {
                        gsap.to(info, {
                            x: 0,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            overwrite: true
                        });
                    }
                };

                card.addEventListener('mousemove', onMouseMove);
                card.addEventListener('mouseleave', onMouseLeave);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [content?.runners?.items?.length]);
    if (!content || !content.runners) return null;

    const { title, subtitle, items } = content.runners;

    return (
        <section className="runners-section" ref={sectionRef}>
            <div className="runners-header">
                <h2 className="runners-title">{title}</h2>
                <p className="runners-subtitle">{subtitle}</p>
            </div>

            <div className="runners-grid">
                {items.map((runner, index) => (
                    <div key={index} className="runner-card-wrapper">
                        <div className="runner-card">
                            <div className="runner-card-bg">
                                <img src="/assets/cardmask.png" alt="Card Background" />
                            </div>
                            <div
                                className="runner-model"
                                style={runner.modelScale ? { width: `${runner.modelScale}%` } : {}}
                            >
                                <img src={runner.modelImage} alt={runner.name} />
                            </div>
                            <div className="runner-info">
                                <h3 className="runner-name">{runner.name}</h3>
                                <p className="runner-desc">{runner.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="runners-pagination">
                <span className="dot dot-active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </section>
    );
};

export default RunnersSection;
