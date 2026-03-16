import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayBlasterSection = ({ content }) => {
    const containerRef = useRef();
    const textRef = useRef();
    const imageRef = useRef();

    const data = content?.powerplayPage?.sections?.blaster || {
        title: "BLASTER",
        subtitle: "CLEAR THE WAY. KEEP THE SPEED.",
        description: "FIRE UP THE BLASTER AND DESTROY OBSTACLES IN YOUR WAY. TURN DANGER INTO DEBRIS AND KEEP RUNNING AT FULL SPEED WITHOUT SLOWING DOWN.",
        image: "/assets/powerplay assets/section2img.png"
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
        <section className="powerplay-blaster-section" ref={containerRef}>
            <div className="blaster-container">
                <div className="blaster-left" ref={textRef}>
                    <h2 className="blaster-title">{data.title}</h2>
                    <h3 className="blaster-subtitle">{data.subtitle}</h3>
                    <div className="blaster-divider"></div>
                    <p className="blaster-description">
                        {data.description}
                    </p>
                </div>
                <div className="blaster-right">
                    <img 
                        src={data.image} 
                        alt="Blaster Game View" 
                        className="blaster-main-img" 
                        ref={imageRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayBlasterSection;
