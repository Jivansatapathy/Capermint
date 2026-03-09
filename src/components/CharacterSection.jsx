import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CharacterSection = () => {
    const sectionRef = useRef(null);
    const modelRef = useRef(null);
    const cardRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from(cardRef.current, {
                scale: 0.8,
                opacity: 0,
                rotationX: -20,
                duration: 1.2,
                ease: 'back.out(1.2)'
            })
                .from('.coin-top', {
                    y: -150,
                    opacity: 0,
                    rotation: -45,
                    duration: 1.2,
                    ease: 'bounce.out',
                    clearProps: 'all'
                }, '-=0.8')
                .from('.coin-bottom', {
                    y: 150,
                    opacity: 0,
                    rotation: 45,
                    duration: 1.2,
                    ease: 'bounce.out',
                    clearProps: 'all'
                }, '-=1.0');

            // Continuous distinct animations for coins (starting after entrance)
            gsap.to('.coin-top', {
                y: -15,
                rotation: 10,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1.5
            });

            gsap.to('.coin-bottom', {
                rotation: -15,
                rotateX: 25,
                rotateY: 25,
                duration: 3.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1.5
            });

            gsap.to('.coin-bottom', {
                y: 15,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 1.5
            });

            // Mouse Interaction for parallax tilt
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const xPercent = (clientX / window.innerWidth - 0.5);
                const yPercent = (clientY / window.innerHeight - 0.5);

                gsap.to(cardRef.current, {
                    rotateY: -xPercent * 10,
                    rotateX: yPercent * 10,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="character-section" ref={sectionRef}>
            <div className="char-bg"></div>

            <div className="char-content-wrapper" style={{ perspective: '1000px' }}>
                {/* Character on the left */}
                <div className="char-character" ref={modelRef} style={{ transformStyle: 'preserve-3d' }}>
                    <img src="/assets/3d model.png" alt="Character" className="char-model-img" />
                </div>

                {/* Card stack in the center/right */}
                <div className="char-card-stack" ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="card-back">
                        <img src="/assets/backcard.png" alt="Back Card" />
                    </div>

                    <div className="card-top-container">
                        <img src="/assets/topcard.png" alt="Top Card" className="card-top-bg" />

                        <div className="card-content">
                            <h2 className="card-heading">HEY RUNNER!</h2>
                            <h3 className="card-subheading">I'M SPEEDSTER AUSTIN.</h3>
                            <p className="card-text">
                                THE CITY'S ALWAYS BEEN MY TURF, BUT NOW IT'S YOURS TO CONQUER.<br />
                                THE STREETS ARE FULL OF OBSTACLES, POWER-UPS,<br />
                                AND ENDLESS CHALLENGES. ARE YOU FAST ENOUGH TO BEAT THEM ALL?
                            </p>
                        </div>
                        <div className="card-signature">
                            <img src="/assets/Signature.png" alt="Austin Signature" />
                        </div>

                        {/* Top Coin on the card */}
                        <div className="card-coin coin-top">
                            <img src="/assets/Coin_top.png" alt="Coin Top" />
                        </div>

                        {/* Bottom Coin below the card (moved inside top container for Z-layering) */}
                        <div className="card-coin coin-bottom">
                            <img src="/assets/Coin_bottom.png" alt="Coin Bottom" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharacterSection;
