import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayMagnetSection = ({ content }) => {
    const containerRef = useRef();
    const textRef = useRef();
    const imageRef = useRef();

    const data = content?.powerplayPage?.sections?.magnet || {
        title: "MAGNET",
        subtitle: "EVERY COIN COMES TO YOU.",
        description: "ACTIVATE THE MAGNET TO PULL NEARBY COINS STRAIGHT INTO YOUR PATH. NO MISSED REWARDS - JUST SMOOTH COLLECTION WHILE YOU STAY FOCUSED ON THE RUN.",
        image: "/assets/powerplay assets/section4img.png"
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
        <section className="powerplay-magnet-section" ref={containerRef}>
            <div className="magnet-container">
                <div className="magnet-left" ref={textRef}>
                    <h2 className="magnet-title">{data.title}</h2>
                    <h3 className="magnet-subtitle">{data.subtitle}</h3>
                    <div className="magnet-divider"></div>
                    <p className="magnet-description">
                        {data.description}
                    </p>
                </div>
                <div className="magnet-right">
                    <img
                        src={data.image}
                        alt="Magnet Powerup"
                        className="magnet-main-img"
                        ref={imageRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayMagnetSection;
