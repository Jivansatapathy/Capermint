import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayBonusZoneSection = ({ content }) => {
    const sectionRef = useRef();
    const contentRef = useRef();

    const data = content?.powerplayPage?.sections?.bonusZone || {
        title: "BONUS ZONE"
    };

    useGSAP(() => {
        gsap.from(contentRef.current, {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    }, { scope: sectionRef });

    return (
        <section className="powerplay-bonus-zone-banner" ref={sectionRef}>
            <div className="bonus-zone-bg-left"></div>
            <div className="bonus-zone-bg-right"></div>
            <div className="bonus-zone-content" ref={contentRef}>
                <h2 className="bonus-zone-title">{data.title}</h2>
            </div>
        </section>
    );
};

export default PowerplayBonusZoneSection;
