import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CharacterSection = ({ content }) => {
    const sectionRef = useRef(null);
    const modelRef = useRef(null);
    const cardRef = useRef(null);

    const rawData = content?.characterSection;
    const data = {
        heading: rawData?.heading || "HEY RUNNER!",
        subheading: rawData?.subheading || "I'M SPEEDSTER AUSTIN.",
        text: rawData?.text || "THE CITY'S ALWAYS BEEN MY TURF, BUT NOW IT'S YOURS TO CONQUER.\nTHE STREETS ARE FULL OF OBSTACLES, POWER-UPS,\nAND ENDLESS CHALLENGES. ARE YOU FAST ENOUGH TO BEAT THEM ALL?",
        modelImage: rawData?.modelImage || "/assets/3d model.png",
        signatureImage: rawData?.signatureImage || "/assets/Signature.png",
        backCardImage: rawData?.backCardImage || "/assets/backcard.png",
        topCardImage: rawData?.topCardImage || "/assets/topcard.png",
        coinTopImage: rawData?.coinTopImage || "/assets/Coin_top.png",
        coinBottomImage: rawData?.coinBottomImage || "/assets/Coin_bottom.png"
    };

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
                    <img src={data.modelImage} alt="Character" className="char-model-img" />
                </div>

                {/* Card stack in the center/right */}
                <div className="char-card-stack" ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
                    <div className="card-back">
                        <img src={data.backCardImage} alt="Back Card" />
                    </div>

                    <div className="card-top-container">
                        <img src={data.topCardImage} alt="Top Card" className="card-top-bg" />

                        <div className="card-content">
                            <h2 className="card-heading">{data.heading}</h2>
                            <h3 className="card-subheading">{data.subheading}</h3>
                            <p className="card-text">
                                {(data.text || "").split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i < data.text.split('\n').length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                        <div className="card-signature">
                            <img src={data.signatureImage} alt="Signature" />
                        </div>

                        {/* Top Coin on the card */}
                        <div className="card-coin coin-top">
                            <img src={data.coinTopImage} alt="Coin Top" />
                        </div>

                        {/* Bottom Coin below the card (moved inside top container for Z-layering) */}
                        <div className="card-coin coin-bottom">
                            <img src={data.coinBottomImage} alt="Coin Bottom" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharacterSection;
