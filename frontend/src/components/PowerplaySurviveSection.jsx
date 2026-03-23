import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplaySurviveSection = ({ content }) => {
    const sectionRef = useRef();
    const contentRef = useRef();

    const data = content?.powerplayPage?.sections?.survive || {};

    useGSAP(() => {
        gsap.from(contentRef.current.children, {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: sectionRef });

    return (
        <section className="powerplay-survive-banner" ref={sectionRef}>
            <div className="survive-bg-left"></div>
            <div className="survive-bg-right"></div>
            <div className="survive-content" ref={contentRef}>
                <h2 className="survive-title">{data.title}</h2>
                <p className="survive-subtitle">{data.subtitle}</p>
            </div>
        </section>
    );
};

export default PowerplaySurviveSection;
