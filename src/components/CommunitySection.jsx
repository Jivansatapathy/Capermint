import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CommunitySection = ({ title, desc, image, reversed, gradientVariant, number }) => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from('.community-title', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
                .from('.community-divider', {
                    scaleX: 0,
                    transformOrigin: 'left',
                    duration: 0.8,
                    ease: 'power2.inOut'
                }, '-=0.6')
                .from('.community-desc', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.4')
                .from('.community-image', {
                    x: reversed ? -100 : 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'back.out(1.2)'
                }, '-=1.0');

            // Continuous Floating Animation
            gsap.to(imgRef.current, {
                y: '+=20',
                duration: 3,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [reversed]);

    return (
        <section ref={sectionRef} className={`community-section ${reversed ? 'community-reversed' : ''} ${gradientVariant ? `community-gradient-${gradientVariant}` : ''}`}>
            <div className="community-gradient-overlay"></div>
            <div className="community-content">
                <div className="community-container">
                    <div className="community-text">
                        <h2 className="community-title">{title}</h2>
                        <div className="community-divider"></div>
                        <p className="community-desc">{desc}</p>
                    </div>
                    <div className="community-image">
                        <img ref={imgRef} src={image} alt="Mobile Game Preview" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
