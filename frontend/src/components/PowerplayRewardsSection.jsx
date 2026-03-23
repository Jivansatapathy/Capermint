import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayRewardsSection = ({ content }) => {
    const sectionRef = useRef();
    const contentRef = useRef();

    const data = content?.powerplayPage?.sections?.rewards || {};

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
        <section className="powerplay-rewards-banner" ref={sectionRef}>
            <div className="rewards-bg-left"></div>
            <div className="rewards-bg-right"></div>
            <div className="rewards-content" ref={contentRef}>
                <h2 className="rewards-title">{data.title}</h2>
                <p className="rewards-subtitle">{data.subtitle}</p>
            </div>
        </section>
    );
};

export default PowerplayRewardsSection;
