import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayShieldSection = ({ content }) => {
    const containerRef = useRef();
    const imageRef = useRef();
    const textRef = useRef();

    const data = content?.powerplayPage?.sections?.shield || {
        title: "SHIELD",
        subtitle: "ONE HIT. ZERO SLOWDOWN.",
        description: "ACTIVATE THE SHIELD TO ABSORB AN OBSTACLE WITHOUT BREAKING YOUR STREAK. KEEP YOUR MOMENTUM ALIVE AND STAY LOCKED IN ON YOUR HIGH SCORE.",
        image: "/assets/powerplay assets/section1img.png"
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
        <section className="powerplay-shield-section" ref={containerRef}>
            <div className="shield-container">
                <div className="shield-left">
                    <img 
                        src={data.image} 
                        alt="Shield Game View" 
                        className="shield-main-img" 
                        ref={imageRef}
                    />
                </div>
                <div className="shield-right" ref={textRef}>
                    <h2 className="shield-title">{data.title}</h2>
                    <h3 className="shield-subtitle">{data.subtitle}</h3>
                    <div className="shield-divider"></div>
                    <p className="shield-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayShieldSection;
