import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayJumperSection = ({ content }) => {
    const containerRef = useRef();
    const imageRef = useRef();
    const textRef = useRef();

    const data = content?.powerplayPage?.sections?.jumper || {
        title: "JUMPER",
        subtitle: "LAUNCH INTO ADVANTAGE.",
        description: "HIT A JUMPER TO BOUNCE HIGH ABOVE THE TRACK AND ESCAPE TIGHT OBSTACLES. GAIN A BETTER VIEW, MORE BREATHING ROOM, AND A CHANCE TO GRAB REWARDS FROM ABOVE.",
        image: "/assets/powerplay assets/section7img.png"
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
        <section className="powerplay-jumper-section" ref={containerRef}>
            <div className="jumper-container">
                <div className="jumper-left">
                    <img
                        src={data.image}
                        alt="Jumper Powerup"
                        className="jumper-main-img"
                        ref={imageRef}
                    />
                </div>
                <div className="jumper-right" ref={textRef}>
                    <h2 className="jumper-title">{data.title}</h2>
                    <h3 className="jumper-subtitle">{data.subtitle}</h3>
                    <div className="jumper-divider"></div>
                    <p className="jumper-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayJumperSection;
