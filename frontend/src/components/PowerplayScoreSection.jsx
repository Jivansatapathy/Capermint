import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayScoreSection = ({ content }) => {
    const containerRef = useRef();
    const imageRef = useRef();
    const textRef = useRef();

    const data = content?.powerplayPage?.sections?.score || {
        title: "2X & 4X",
        subtitle: "DOUBLE & QUADRUPLE YOUR SCORE.",
        description: "COLLECT THE 2X OR 4X POWER-UP AND WATCH YOUR SCORE MULTIPLY AS YOU RUN THROUGH THE TRACK. A QUICK WAY TO BOOST YOUR POINTS.",
        image: "/assets/powerplay assets/section5right.png"
    };

    useGSAP(() => {
        // Image animation
        gsap.from(imageRef.current, {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Text animation
        gsap.from(textRef.current.children, {
            x: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section className="powerplay-score-section" ref={containerRef}>
            <div className="score-container">
                <div className="score-visual">
                    <img
                        src={data.image}
                        alt="Score Multiplier"
                        className="score-main-img"
                        ref={imageRef}
                    />
                </div>

                <div className="score-content" ref={textRef}>
                    <h2 className="score-main-title">{data.title}</h2>
                    <h3 className="score-main-subtitle">{data.subtitle}</h3>
                    <div className="score-horizontal-divider"></div>
                    <p className="score-main-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayScoreSection;
