import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayMegaCoinSection = ({ content }) => {
    const containerRef = useRef();
    const textRef = useRef();
    const imageRef = useRef();

    const data = content?.powerplayPage?.sections?.megaCoin || {};

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
        <section className="powerplay-megacoin-section" ref={containerRef}>
            <div className="megacoin-container">
                <div className="megacoin-left" ref={textRef}>
                    <h2 className="megacoin-title">{data.title}</h2>
                    <h3 className="megacoin-subtitle">{data.subtitle}</h3>
                    <div className="megacoin-divider"></div>
                    <p className="megacoin-description">
                        {data.description}
                    </p>
                </div>
                <div className="megacoin-right">
                    <img
                        src={data.image}
                        alt="Mega Coin"
                        className="megacoin-main-img"
                        ref={imageRef}
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayMegaCoinSection;
