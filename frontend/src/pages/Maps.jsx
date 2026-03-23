import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/maps.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);


const Maps = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cloudSectionRef = useRef(null);
    const secondSectionRef = useRef(null);
    const secondTrackRef = useRef(null);
    const waterSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);
    const thirdTrackRef = useRef(null);
    const bottomCloudSectionRef = useRef(null);
    const fourthSectionRef = useRef(null);
    const fourthTrackRef = useRef(null);
    const [content, setContent] = useState({});

    const mp = content.mapPage || {
        hero: { title: "RUNNER RUNNER", subtitle: "EXPLORE OUR MAPS" },
        horizontalScroll: [],
        cta: {
            title: "WHERE WILL YOU RUN NEXT?",
            midImage: "/assets/maps/section3midimg.png"
        }
    };
    const hero = mp.hero || {};
    const scrollData = mp.horizontalScroll || [];
    const cta = mp.cta || {};

    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                setContent(data);
            })
            .catch(() => { });
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;

        if (section && track && mp.horizontalScroll && mp.horizontalScroll.length > 0) {
            const scrollDistance = track.scrollWidth - section.clientWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    start: "top top",
                    end: () => `+=${track.scrollWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });

            // Move the track for a continuous sliding effect
            tl.to(track, {
                x: -scrollDistance,
                ease: "none"
            });
        }

        // Cloud Section Animations
        const cloudSection = cloudSectionRef.current;
        const cloudGroupFront = cloudSection.querySelector('.cloud-group-front');
        const cloudGroupBack = cloudSection.querySelector('.cloud-group-back');
        const character = cloudSection.querySelector('.mara-character');

        // Character Mara scrolls dynamically through the clouds and stops at the center
        gsap.fromTo(character,
            { y: '-100vh', opacity: 0 }, // Start off-screen top
            {
                y: '0%', // Animate to its absolute center position
                opacity: 1,
                scrollTrigger: {
                    trigger: cloudSection,
                    start: "top 80%",
                    end: "bottom 60%", // Stop animation in the middle of the scroll
                    scrub: 2
                }
            }
        );

        // Ensure clouds move up appropriately
        gsap.fromTo(cloudGroupFront,
            { y: '50vh', opacity: 0 },
            {
                y: '0vh',
                opacity: 1,
                scrollTrigger: {
                    trigger: cloudSection,
                    start: "top 95%",
                    end: "bottom center",
                    scrub: 2.5
                }
            }
        );

        gsap.fromTo(cloudGroupBack,
            { y: '30vh', opacity: 0 },
            {
                y: '0vh',
                opacity: 0.8,
                scrollTrigger: {
                    trigger: cloudSection,
                    start: "top 95%",
                    end: "bottom center",
                    scrub: 1.5
                }
            }
        );

        // Second Horizontal Scroll Section Animations
        const secondSection = secondSectionRef.current;
        const secondTrack = secondTrackRef.current;
        if (secondSection && secondTrack) {
            const secondScrollDistance = secondTrack.scrollWidth - secondSection.clientWidth;

            gsap.to(secondTrack, {
                x: -secondScrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: secondSection,
                    pin: true,
                    start: "top top",
                    end: () => `+=${secondTrack.scrollWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });
        }

        // Submarine Entrance Animation
        const waterSection = waterSectionRef.current;
        if (waterSection) {
            const submarine = waterSection.querySelector('.submarine-img');
            gsap.fromTo(submarine,
                { x: '-100vw', opacity: 0 }, // Modified to come from LEFT
                {
                    x: '0vw',
                    opacity: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: waterSection,
                        start: "top bottom",
                        end: "bottom top", // Longer distance for "slow" movement
                        scrub: 3 // Increased scrub for smoother/slower feel
                    }
                }
            );
        }

        // Third Horizontal Scroll Section Animations
        const thirdSection = thirdSectionRef.current;
        const thirdTrack = thirdTrackRef.current;
        if (thirdSection && thirdTrack) {
            const thirdScrollDistance = thirdTrack.scrollWidth - thirdSection.clientWidth;

            // We use a timeline to sequence the horizontal scroll followed by the submarine exit
            const thirdTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: thirdSection,
                    pin: true,
                    start: "top top",
                    // Increase scroll distance slightly for the exit animation
                    end: () => `+=${thirdTrack.scrollWidth * 1.5 + window.innerWidth}`,
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            });

            // 1. Scroll the track horizontally
            thirdTimeline.to(thirdTrack, {
                x: -thirdScrollDistance,
                ease: "none",
                // Make duration relative to distance for smooth scrubbing
                duration: thirdScrollDistance
            });

            // 2. Submarine Exit Animation
            // After track finishes moving, submarine goes to the right
            const subExit = thirdTrack.querySelector('.submarine-img-2');
            if (subExit) {
                thirdTimeline.to(subExit, {
                    x: '100vw', // Move it far right out of view
                    ease: "power1.in",
                    duration: thirdScrollDistance * 0.3 // Take 30% of the time to exit
                });
            }
        }

        // Bottom Cloud Section Animations (After Vertical Image)
        const bottomCloudSection = bottomCloudSectionRef.current;
        if (bottomCloudSection) {
            const bottomCloudGroupFront = bottomCloudSection.querySelector('.bottom-cloud-group-front');
            const bottomCloudGroupBack = bottomCloudSection.querySelector('.bottom-cloud-group-back');
            const bottomShip = bottomCloudSection.querySelector('.bottom-ship-character');

            // Ship enters from the RIGHT and stops in the center
            if (bottomShip) {
                gsap.fromTo(bottomShip,
                    { x: '100vw', opacity: 0 },
                    {
                        x: '0vw',
                        opacity: 1,
                        scrollTrigger: {
                            trigger: bottomCloudSection,
                            start: "top 80%",
                            end: "top 20%",
                            scrub: 2,
                        }
                    }
                );

                // Add a subtle floating/hovering effect
                gsap.to(bottomShip, {
                    y: "-20px",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }

            // Ensure clouds move up appropriately
            if (bottomCloudGroupFront) {
                gsap.fromTo(bottomCloudGroupFront,
                    { y: '80vh', opacity: 0 },
                    {
                        y: '0vh',
                        opacity: 1,
                        scrollTrigger: {
                            trigger: bottomCloudSection,
                            start: "top 95%",
                            end: "bottom center",
                            scrub: 2.5,
                        }
                    }
                );
            }

            if (bottomCloudGroupBack) {
                gsap.fromTo(bottomCloudGroupBack,
                    { y: '60vh', opacity: 0 },
                    {
                        y: '0vh',
                        opacity: 0.8,
                        scrollTrigger: {
                            trigger: bottomCloudSection,
                            start: "top 95%",
                            end: "bottom center",
                            scrub: 1.5,
                        }
                    }
                );
            }
        }

        // Fourth Horizontal Scroll Section Animations (Group 44)
        const fourthSection = fourthSectionRef.current;
        const fourthTrack = fourthTrackRef.current;
        if (fourthSection && fourthTrack) {
            // Using a timeline for consistency and better control
            gsap.to(fourthTrack, {
                x: () => -(fourthTrack.scrollWidth - window.innerWidth),
                ease: "none",
                scrollTrigger: {
                    trigger: fourthSection,
                    pin: true,
                    start: "top top",
                    end: () => `+=${fourthTrack.scrollWidth}`,
                    scrub: 1,
                    invalidateOnRefresh: true,
                }
            });
        }

        ScrollTrigger.refresh();

        return () => {
            if (ScrollTrigger.getAll().length > 0) {
                ScrollTrigger.getAll().forEach(st => st.kill());
            }
        };
    }, [mp.horizontalScroll]);


    return (
        <main className="maps-page">
            <section className="maps-hero">
                <div className="maps-hero-content">
                    <h1 className="maps-hero-title">{hero.title}</h1>
                    <p className="maps-hero-subtitle">{hero.subtitle}</p>

                    <div className="maps-scroll-down">
                        <span>SCROLL DOWN</span>
                        <div className="scroll-arrow">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: GSAP Horizontal Scroll Track */}
            <section className="maps-horizontal-scroll" ref={sectionRef}>
                <div className="scroll-track" ref={trackRef}>
                    {scrollData.map((slide, i) => (
                        <div
                            key={i}
                            className={`scroll-slide slide-${i + 1}`}
                            style={{ backgroundImage: `url(${slide.bg})` }}
                        >
                            {/* Overlay images removed as they are now pre-cut into the background */}
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Cloud Transition Section */}
            <section className="maps-cloud-section" ref={cloudSectionRef}>
                {/* Back Clouds (Lower z-index) */}
                <div className="cloud-group-back">
                    <img src={mp.cloudGroup} alt="Clouds Back" className="cloud-bg-img" />
                </div>

                {/* Character Mara scrolling top to middle */}
                <div className="mara-character">
                    <img src={mp.maraImage} alt="Mara" />
                </div>

                {/* Front Clouds (Higher z-index, overlaps section above) */}
                <div className="cloud-group-front">
                    <img src={mp.cloudGroup} alt="Clouds Front" className="cloud-bg-img" />
                </div>
            </section>

            {/* Spacer Section */}
            <section className="maps-spacer-section"></section>

            {/* Section 4: Second Horizontal Scroll section (City) */}
            <section className="maps-second-horizontal-scroll" ref={secondSectionRef}>
                <div className="second-scroll-track" ref={secondTrackRef}>
                    {/* Slide 1: new.png */}
                    <div
                        className="second-scroll-slide"
                        style={{ backgroundImage: `url(${mp.newWithoutCloud})` }}
                    >
                    </div>
                    {/* Slide 2: new2.png + Boy character */}
                    <div
                        className="second-scroll-slide"
                        style={{ backgroundImage: `url(${mp.new2BgImage})` }}
                    >
                        <div className="boy-character">
                            <img src={mp.boyImage} alt="Boy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 5: Water Transition Section */}
            <section className="maps-water-section" ref={waterSectionRef}>
                <div className="water-overlay" style={{ backgroundImage: `url("${mp.waterImage}")` }}></div>
                <div className="submarine-container">
                    <img src={mp.submarineImage} alt="Submarine" className="submarine-img" />
                </div>
            </section>

            {/* Section 7: Third Horizontal Scroll Section (Underwater) */}
            <section className="maps-third-horizontal-scroll" ref={thirdSectionRef}>
                <div className="third-scroll-track" ref={thirdTrackRef}>
                    <div
                        className="third-scroll-slide"
                        style={{ backgroundImage: `url(${mp.underwaterImage})` }}
                    >
                    </div>
                    <div
                        className="third-scroll-slide"
                        style={{ backgroundImage: `url(${mp.underwater2Image})` }}
                    >
                    </div>
                    <div className="third-scroll-slide submarine-slide">
                        <div className="water-overlay" style={{ backgroundImage: `url("${mp.waterImage}")` }}></div>
                        <div className="submarine-container-2">
                            <img src={mp.submarineImage} alt="Submarine Exit" className="submarine-img-2" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 8: First Vertical Scroll Section (Group 84) */}
            <section className="maps-vertical-section">
                <img
                    src="/assets/maps/horizontalscroll/Group%2084.png"
                    alt="Map Continuation"
                    className="vertical-section-img"
                />
            </section>

            {/* Section 9: Bottom Cloud Transition Section */}
            <section className="maps-bottom-cloud-section" ref={bottomCloudSectionRef}>
                {/* Back Clouds (Lower z-index) */}
                <div className="cloud-group-back bottom-cloud-group-back">
                    <img src={mp.cloudGroup} alt="Clouds Back" className="cloud-bg-img" />
                </div>

                {/* Ship character entering from left */}
                <div className="bottom-ship-character">
                    <img src="/assets/maps/horizontalscroll/Ship%201%202.png" alt="Ship" />
                </div>

                {/* Front Clouds (Higher z-index) */}
                <div className="cloud-group-front bottom-cloud-group-front">
                    <img src={mp.cloudGroup} alt="Clouds Front" className="cloud-bg-img" />
                </div>

                {/* Overlap with blank spacer below */}
                <div className="bottom-cloud-spacer-overlap">
                    <img src={mp.cloudGroup} alt="Clouds Overlap" className="cloud-bg-img" />
                </div>
            </section>

            {/* Spacer Section */}
            <section className="maps-spacer-section"></section>

            {/* Section 10 & 11: Final Horizontal Scroll Section (Group 85 -> Group 44 -> Group 40) */}
            <section className="maps-fourth-horizontal-scroll" ref={fourthSectionRef}>
                <div className="fourth-scroll-track" ref={fourthTrackRef}>
                    <div
                        className="fourth-scroll-slide"
                        style={{ backgroundImage: `url("/assets/maps/horizontalscroll/Group 85.png")` }}
                    >
                    </div>
                    <div
                        className="fourth-scroll-slide"
                        style={{ backgroundImage: `url("/assets/maps/horizontalscroll/Group 44 (1).png")` }}
                    >
                    </div>
                    <div
                        className="fourth-scroll-slide"
                        style={{ backgroundImage: `url("/assets/maps/horizontalscroll/Group 40.png")` }}
                    >
                    </div>
                </div>
            </section>

            {/* Section 12: Call-to-action section */}
            <section className="maps-cta-section">
                <div className="maps-cta-content">
                    <img src={cta.midImage} alt="Runners" className="cta-mid-img" />

                    <div className="cta-text-content">
                        <h2 className="cta-main-title">{cta.title}</h2>
                        <p className="cta-subtitle-1">{cta.subtitle1}</p>
                        <p className="cta-subtitle-2">{cta.subtitle2}</p>
                    </div>
                </div>
            </section>

            <FinalSection content={content} />
            <Footer content={content} />
        </main>
    );
};

export default Maps;
