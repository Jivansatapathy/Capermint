import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const PowerplayChoiceSection = ({ content }) => {
    const sectionRef = useRef();
    const visualRef = useRef();
    const contentRef = useRef();

    const rawData = content?.powerplayPage?.sections?.choice;
    const defaultIcons = {};

    const data = {
        title: rawData?.title || "",
        subtitle: rawData?.subtitle || "",
        footer: rawData?.footer || "",
        icons: { ...defaultIcons, ...rawData?.icons }
    };

    useGSAP(() => {
        // Entrance animation
        gsap.from('.choice-visual > *', {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        gsap.from('.choice-content > *', {
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });

        // Continuous floating animation
        gsap.utils.toArray('.choice-icon', sectionRef.current).forEach((icon) => {
            gsap.to(icon, {
                y: "random(-15, 15)",
                x: "random(-10, 10)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
    }, { scope: sectionRef });

    return (
        <section className="powerplay-choice-section" ref={sectionRef}>
            <div className="choice-container">
                <div className="choice-visual" ref={visualRef}>
                    <img src={data.icons.potion} alt="Potion" className="choice-icon icon-potion" />
                    <img src={data.icons.img2x} alt="2x" className="choice-icon icon-2x" />
                    <img src={data.icons.shield} alt="Shield" className="choice-icon icon-shield" />
                    
                    <img src={data.icons.boy} alt="Runner" className="choice-hero-img" />
                    
                    <img src={data.icons.magnet} alt="Magnet" className="choice-icon icon-magnet" />
                    <img src={data.icons.img4x} alt="4x" className="choice-icon icon-4x" />
                    <img src={data.icons.blaster} alt="Blaster" className="choice-icon icon-blaster" />
                </div>

                <div className="choice-content" ref={contentRef}>
                    <h2 className="choice-title">{data.title}</h2>
                    <p className="choice-subtitle">{data.subtitle}</p>
                    <p className="choice-footer">{data.footer}</p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayChoiceSection;
