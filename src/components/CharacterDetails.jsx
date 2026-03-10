import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CharacterDetails = ({ sectionData }) => {
    const cardRef = useRef(null);
    const imgRef = useRef(null);
    const sectionRef = useRef(null);

    const {
        characterName,
        characterTitle,
        mainQuote,
        personality,
        characterImage,
        sectionBg,
        cardBg,
        reversed,
        variant
    } = sectionData;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax for Card
            gsap.to(cardRef.current, {
                y: 200, // Increased movement
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Parallax for Character Image (slightly different speed)
            gsap.to(imgRef.current, {
                y: 350, // Much more significant downward movement
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`char-details-simple ${reversed ? 'reversed' : ''}`}
            style={{ backgroundImage: `url('${sectionBg}')` }}
        >
            <div className={`char-details-container ${reversed ? 'reversed' : ''}`}>
                {/* Card side */}
                <div className="char-details-card-side">
                    <div
                        ref={cardRef}
                        className={`char-details-card ${variant ? `${variant}-card` : ''} char-card-${sectionData.id}`}
                        style={{ backgroundImage: `url('${cardBg}')` }}
                    >
                        <div className="char-card-inner">
                            <h2 className="char-card-quote">{mainQuote}</h2>
                            <div className="char-card-divider"></div>
                            <div className="char-card-info">
                                <p className="char-card-label">PERSONALITY:</p>
                                <ul className="char-card-list">
                                    {personality.map((p, i) => (
                                        <li key={i}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="char-card-footer">
                                <h3 className="char-card-name">{characterName}</h3>
                                <p className="char-card-subtext">{characterTitle}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image side */}
                <div className="char-details-image-side">
                    <img
                        ref={imgRef}
                        src={characterImage}
                        alt={characterName}
                        className={`char-details-character-img char-img-${sectionData.id}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default CharacterDetails;
