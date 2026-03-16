import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayInvisibilitySection = ({ content }) => {
    const containerRef = useRef();
    const imageRef = useRef();
    const textRef = useRef();

    const data = content?.powerplayPage?.sections?.invisibility || {
        title: "INVISIBILITY",
        subtitle: "MAKE OBSTACLES DISAPPEAR.",
        description: "FOR A LIMITED TIME, OBSTACLES VANISH FROM YOUR PATH - GIVING YOU A CLEAR LANE TO RUN AT FULL SPEED. WHEN THE TRACK FEELS IMPOSSIBLE, TURN IT EFFORTLESS.",
        image: "/assets/powerplay assets/section3img.png"
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
        <section className="powerplay-invisibility-section" ref={containerRef}>
            <div className="invisibility-container">
                <div className="invisibility-left">
                    <img
                        src={data.image}
                        alt="Invisibility Visual"
                        className="invisibility-main-img"
                        ref={imageRef}
                    />
                </div>

                <div className="invisibility-right" ref={textRef}>
                    <h2 className="invisibility-title">{data.title}</h2>
                    <h3 className="invisibility-subtitle">{data.subtitle}</h3>
                    <div className="invisibility-divider"></div>
                    <p className="invisibility-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayInvisibilitySection;
