import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section10 = ({ content }) => {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);
    const imgWrapperRef = useRef(null);

    const rawData = content?.specialEvents;
    const data = {
        title: rawData?.title || "SPECIAL EVENTS",
        subtitle: rawData?.subtitle || "LIMITED TIME CHALLENGES WITH BIGGER REWARDS.\nEVERY EVENT BRINGS SOMETHING NEW!",
        eventTitle: rawData?.eventTitle || "CASH OUT EVENT IS LIVE",
        eventDescription: rawData?.eventDescription || "COMPLETE TASKS & RUN DURING THE EVENT CLIMB THE LEADERBOARD.\nTOP RUNNERS EARN REAL REWARDS.",
        buttonText: rawData?.buttonText || "EXPLORE >",
        image: rawData?.image || "/assets/image.png"
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Scroll Entrance animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });

            tl.from('.s10-header', {
                y: -40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
                .from('.s10-left', {
                    x: -100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.6')
                .from('.s10-right', {
                    x: 100,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=1.0');

            // 3D Tilt + Dual Parallax (same as FeaturesSection)
            const wrapperNode = imgWrapperRef.current;

            const handleMouseMove = (e) => {
                if (!wrapperNode) return;
                const { clientX, clientY } = e;
                const rect = wrapperNode.getBoundingClientRect();

                const xNorm = ((clientX - rect.left) / rect.width - 0.5) * 2;
                const yNorm = ((clientY - rect.top) / rect.height - 0.5) * 2;

                // Container tilts in 3D
                gsap.to(wrapperNode, {
                    rotateY: xNorm * 10,
                    rotateX: -yNorm * 10,
                    x: xNorm * 10,
                    y: yNorm * 10,
                    duration: 0.6,
                    ease: 'power2.out',
                    transformPerspective: 1500,
                });

                // Image inside slides opposite — deep parallax reveal
                gsap.to(imgRef.current, {
                    scale: 1.05,
                    xPercent: -xNorm * 5,
                    yPercent: -yNorm * 5,
                    duration: 0.6,
                    ease: 'power2.out',
                });
            };

            const handleMouseLeave = () => {
                if (!wrapperNode) return;
                gsap.to(wrapperNode, {
                    rotateY: -15,
                    rotateX: 10,
                    x: 0,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                });
                gsap.to(imgRef.current, {
                    scale: 1,
                    xPercent: 0,
                    yPercent: 0,
                    duration: 1,
                    ease: 'power3.out',
                });
            };

            if (wrapperNode) {
                wrapperNode.addEventListener('mousemove', handleMouseMove);
                wrapperNode.addEventListener('mouseleave', handleMouseLeave);
            }

            return () => {
                if (wrapperNode) {
                    wrapperNode.removeEventListener('mousemove', handleMouseMove);
                    wrapperNode.removeEventListener('mouseleave', handleMouseLeave);
                }
            };
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section10" ref={sectionRef}>
            {/* Top center header */}
            <div className="s10-header">
                <h2 className="s10-title">{data.title}</h2>
                <p className="s10-subtitle">
                    {(data.subtitle || "").split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                            {line}
                            {i < (data.subtitle || "").split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </p>
            </div>

            {/* Main content row */}
            <div className="s10-body">
                {/* Left: text content */}
                <div className="s10-left">
                    <h3 className="s10-event-title">{data.eventTitle}</h3>
                    <p className="s10-event-desc">
                        {(data.eventDescription || "").split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < (data.eventDescription || "").split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                    <button className="s10-btn">{data.buttonText}</button>
                </div>

                {/* Right: masked image with 3D tilt parallax */}
                <div className="s10-right">
                    <div className="s10-img-wrapper" ref={imgWrapperRef}>
                        <img
                            ref={imgRef}
                            src={data.image}
                            alt="Special Event"
                            className="s10-img"
                            style={{ transformStyle: 'preserve-3d' }}
                        />
                    </div>
                </div>
            </div>

            {/* Pagination dots */}
            <div className="s10-pagination">
                <span className="s10-dot s10-dot-active"></span>
                <span className="s10-dot"></span>
                <span className="s10-dot"></span>
            </div>
        </section>
    );
};

export default Section10;
