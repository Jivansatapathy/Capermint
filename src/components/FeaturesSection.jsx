import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = ({ content }) => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    const data = content?.features3d || {
        heading: "ENDLESS RUN!\nENDLESS FUN!",
        description: "IN RUNNER RUNNER, THE CITY IS YOUR PLAYGROUND. RUN, DODGE, AND COLLECT POWER-UPS TO BEAT YOUR HIGH SCORE. SIMPLE TO PLAY, HARD TO PUT DOWN. ARE YOU FAST ENOUGH TO STAY AHEAD?",
        buttonText: "EXPLORE IT",
        image: "/assets/Mask group.png"
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Entrance
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from('.features-left', {
                x: -100,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            })
                .from('.features-right', {
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=1.0');

            // 3D Tilt and Dual Parallax (InkGames style)
            const containerNode = document.querySelector('.features-right'); // Animatable container

            const handleMouseMove = (e) => {
                if (!containerNode) return;
                const { clientX, clientY } = e;
                const rect = containerNode.getBoundingClientRect();

                // Track relative to the center of the image container
                const xNorm = ((clientX - rect.left) / rect.width - 0.5) * 2;
                const yNorm = ((clientY - rect.top) / rect.height - 0.5) * 2;

                // 1. Container tilts slightly in 3D
                gsap.to(containerNode, {
                    rotateY: xNorm * 10,
                    rotateX: -yNorm * 10,
                    x: xNorm * 10,
                    y: yNorm * 10,
                    duration: 0.6,
                    ease: 'power2.out',
                    transformPerspective: 1500
                });

                // 2. Image inside slides opposite to create deep parallax reveal
                gsap.to(imgRef.current, {
                    scale: 1.05,
                    xPercent: -xNorm * 5,
                    yPercent: -yNorm * 5,
                    duration: 0.6,
                    ease: 'power2.out'
                });
            };

            const handleMouseLeave = () => {
                if (!containerNode) return;
                gsap.to(containerNode, {
                    rotateY: 0,
                    rotateX: 0,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
                gsap.to(imgRef.current, {
                    scale: 1,
                    xPercent: 0,
                    yPercent: 0,
                    duration: 1,
                    ease: 'power3.out'
                });
            };

            if (containerNode) {
                containerNode.addEventListener('mousemove', handleMouseMove);
                containerNode.addEventListener('mouseleave', handleMouseLeave);
            }

            return () => {
                if (containerNode) {
                    containerNode.removeEventListener('mousemove', handleMouseMove);
                    containerNode.removeEventListener('mouseleave', handleMouseLeave);
                }
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="features-3d" ref={sectionRef}>
            <div className="features-container">
                <div className="features-left">
                    <h2 className="features-heading">
                        {data.heading.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i === 0 && <br />}
                            </React.Fragment>
                        ))}
                    </h2>
                    <div className="features-divider"></div>
                    <p className="features-desc">
                        {data.description}
                    </p>
                    <button className="features-btn">{data.buttonText}</button>
                </div>

                <div className="features-right">
                    <img
                        ref={imgRef}
                        src={data.image}
                        alt="Game Screenshot"
                        className="features-img"
                        style={{ transformStyle: 'preserve-3d' }}
                    />
                </div>
            </div>

            {/* Pagination indicator at bottom */}
            <div className="features-pagination">
                <span className="dot dot-active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </section>
    );
};

export default FeaturesSection;
