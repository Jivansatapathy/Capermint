import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayBonusRoadSection = ({ content }) => {
    const containerRef = useRef();
    const textRef = useRef();
    const imageRef = useRef();

    const data = content?.powerplayPage?.sections?.bonusRoad || {
        title: "BONUS ROAD",
        subtitle: "ENTER THE BONUS ROAD.",
        description: "FIND THE BONUS ROAD AND SHIFT INTO A HIGH-REWARD ROUTE FILLED WITH EXTRA COINS AND BIG SCORING OPPORTUNITIES. IT'S YOUR CHANCE TO TURN A GREAT RUN INTO A RECORD-BREAKING ONE.",
        image: "/assets/powerplay assets/section8img.png"
    };

    useGSAP(() => {
        // Text animation
        gsap.from(textRef.current.children, {
            x: -100,
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

        // Image animation
        gsap.from(imageRef.current, {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: containerRef });

    return (
        <section className="powerplay-bonusroad-section" ref={containerRef}>
            <div className="bonusroad-container">
                <div className="bonusroad-left" ref={textRef}>
                    <h2 className="bonusroad-title">{data.title}</h2>
                    <h3 className="bonusroad-subtitle">{data.subtitle}</h3>
                    <div className="bonusroad-divider"></div>
                    <p className="bonusroad-description">
                        {data.description}
                    </p>
                </div>
                <div className="bonusroad-right">
                    <img
                        src={data.image}
                        alt="Bonus Road"
                        className="bonusroad-main-img"
                        ref={imageRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayBonusRoadSection;
