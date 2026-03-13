import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/maps.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import contentData from '../../content.json';

const Maps = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const cloudSectionRef = useRef(null);
    const secondSectionRef = useRef(null);
    const secondTrackRef = useRef(null);
    const waterSectionRef = useRef(null);
    const thirdSectionRef = useRef(null);
    const thirdTrackRef = useRef(null);
    const [mp, setMp] = useState(contentData.mapPage || {
        hero: { title: "RUNNER RUNNER", subtitle: "EXPLORE OUR MAPS" },
        horizontalScroll: [],
        cta: { 
            title: "WHERE WILL YOU RUN NEXT?", 
            midImage: "/assets/maps/section3midimg.png"
        }
    });

    useEffect(() => {
        fetch('http://localhost:3000/api/content')
            .then(res => res.json())
            .then(data => {
                if (data.mapPage) setMp(data.mapPage);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        if (!mp.horizontalScroll || mp.horizontalScroll.length === 0) return;

        const section = sectionRef.current;
        const track = trackRef.current;
        const items = track.querySelectorAll('.scroll-slide');

        // Total width to scroll
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

            gsap.to(thirdTrack, {
                x: -thirdScrollDistance,
                ease: "none",
                scrollTrigger: {
                    trigger: thirdSection,
                    pin: true,
                    start: "top top",
                    end: () => `+=${thirdTrack.scrollWidth * 1.5}`, // Maintain slower scroll
                    scrub: 1.5,
                    invalidateOnRefresh: true,
                }
            });
        }

        return () => {
            if (ScrollTrigger.getAll().length > 0) {
                ScrollTrigger.getAll().forEach(st => st.kill());
            }
        };
    }, [mp.horizontalScroll]);

    const hero = mp.hero || {};
    const scrollData = mp.horizontalScroll || [];
    const cta = mp.cta || {};

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
                            className={`scroll-slide slide-${i+1}`}
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
                </div>
            </section>

            {/* Section 8: Call-to-action section */}
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

            <FinalSection />
            <Footer />
        </main>
    );
};

export default Maps;
