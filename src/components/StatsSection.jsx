<<<<<<< HEAD
import React from 'react';

const StatsSection = () => {
    return (
        <section id="stats" className="stats-section">
=======
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const stats = [
                { target: 2, suffix: 'M+', selector: '.stat-number-1' },
                { target: 370, suffix: 'K+', selector: '.stat-number-2' },
                { target: 75, prefix: '$', suffix: 'K+', selector: '.stat-number-3' },
                { target: 3, suffix: 'K+', selector: '.stat-number-4' }
            ];

            stats.forEach((stat) => {
                const obj = { value: 0 };
                const el = document.querySelector(stat.selector);

                if (!el) return;

                gsap.to(obj, {
                    value: stat.target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    onUpdate: () => {
                        const val = Math.floor(obj.value);
                        el.textContent = `${stat.prefix || ''}${val}${stat.suffix || ''}`;
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="stats" className="stats-section" ref={sectionRef}>
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
            <div className="stats-grid">

                {/* 1. Games Played */}
                <div className="stat-group stats-top-left">
<<<<<<< HEAD
                    <span className="stat-number color-cream">2M+</span>
=======
                    <span className="stat-number color-cream stat-number-1">0M+</span>
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
                    <div className="stat-card bg-yellow">
                        <h3 className="stat-title color-brown">GAMES PLAYED</h3>
                        <p className="stat-subtitle color-brown">RUNS COMPLETED BY PLAYERS<br />AROUND THE WORLD.</p>
                    </div>
                </div>

                {/* 2. Installs */}
                <div className="stat-group stats-top-right">
                    <div className="stat-number-wrapper">
<<<<<<< HEAD
                        <span className="stat-number color-light-green">370K+</span>
=======
                        <span className="stat-number color-light-green stat-number-2">0K+</span>
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
                    </div>
                    <div className="stat-card bg-green">
                        <h3 className="stat-title color-dark-green">INSTALLS</h3>
                        <p className="stat-subtitle color-dark-green">RUNNERS WHO HAVE JOINED<br />THE RUNNER RUNNER SO FAR.</p>
                    </div>
                </div>

                {/* 3. Prizes */}
                <div className="stat-group stats-bottom-left">
                    <div className="stat-number-wrapper">
<<<<<<< HEAD
                        <span className="stat-number color-light-purple">$75K+</span>
=======
                        <span className="stat-number color-light-purple stat-number-3">$0K+</span>
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
                    </div>
                    <div className="stat-card bg-pink">
                        <h3 className="stat-title color-purple">PRIZES DISTRIBUTED</h3>
                        <p className="stat-subtitle color-purple">REAL REWARDS EARNED THROUGH<br />SPECIAL EVENTS</p>
                    </div>
                </div>

                {/* 4. Daily Games */}
                <div className="stat-group stats-bottom-right">
                    <div className="stat-number-wrapper">
<<<<<<< HEAD
                        <span className="stat-number color-light-blue">3K+</span>
=======
                        <span className="stat-number color-light-blue stat-number-4">0K+</span>
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
                    </div>
                    <div className="stat-card bg-blue">
                        <h3 className="stat-title color-dark-blue">GAMES PLAYED EVERY DAY</h3>
                        <p className="stat-subtitle color-dark-blue">THE RUN NEVER STOPS</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StatsSection;
