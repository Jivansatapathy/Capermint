import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ content }) => {
    const heroRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {

            /* ── Entrance timeline ── */
            const tl = gsap.timeline({ delay: 0.2 });

            tl.from('.hero-title', {
                y: 60,
                opacity: 0,
                duration: 1.0,
                ease: 'power3.out',
            })
                .from('.hero-subtitle', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.6')
                .from('.score-widget', {
                    x: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                }, '-=0.6')
                .from([
                    '.asset-coin',
                    '.asset-2x',
                    '.asset-magnet',
                    '.asset-chest',
                ], {
                    scale: 0,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'back.out(1.5)',
                    stagger: 0.1,
                }, '-=0.4')
                .from([
                    '.asset-shield',
                    '.asset-character',
                    '.asset-blaster',
                ], {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    ease: 'power3.out',
                    stagger: 0.12,
                }, '-=0.5')
                .from('.scroll-indicator', {
                    y: 15,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                }, '-=0.3');

            /* ── Scroll parallax ── */
            const st = { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 1.2 };

            gsap.to('.hero-bg', { scale: 1.12, y: 100, ...st });

            const parallaxAssets = [
                { sel: '.asset-coin', y: -130 },
                { sel: '.asset-2x', y: -100 },
                { sel: '.asset-magnet', y: -130 },
                { sel: '.asset-chest', y: -80 },
                { sel: '.asset-shield', y: -60 },
                { sel: '.asset-blaster', y: -60 },
                { sel: '.asset-character', y: -40 },
            ];

            parallaxAssets.forEach(({ sel, y }) => {
                gsap.to(sel, { y, ...st });
            });

            /* ── Idle float ── */
            gsap.to('.asset', {
                y: '+=14',
                duration: 'random(2.5, 4)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
                stagger: { amount: 2.5, from: 'random' },
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={heroRef}>

            {/* City street background */}
            <div
                className="hero-bg"
                style={{ backgroundImage: "url('/assets/BG photo.png')" }}
            />





            {/* Main text */}
            <div className="hero-content">
                <h1 className="hero-title">
                    THE ULTIMATE COMPETITIVE<br />RUNNER EXPERIENCE
                </h1>
                <p className="hero-subtitle">{content.hero.subtitle}</p>
            </div>

            {/* Floating game assets */}
            <div className="hero-assets">
                {/* Coin – upper left */}
                <img src="/assets/coin.png" className="asset asset-coin" alt="Coin" />

                {/* 2x – mid left */}
                <img src="/assets/2x 1.png" className="asset asset-2x" alt="2X" />

                {/* Magnet – upper right */}
                <img src="/assets/magnet 1.png" className="asset asset-magnet" alt="Magnet" />

                {/* Chest – lower right */}
                <img src="/assets/New-Icon 1.png" className="asset asset-chest" alt="Chest" style={{ borderRadius: '16px', opacity: 0.92 }} />

                {/* Shield – lower centre-left */}
                <img src="/assets/Shield_Animation 1.png" className="asset asset-shield" alt="Shield" />

                {/* App-icon card – centre bottom */}
                <img src="/assets/New-Icon 1.png" className="asset asset-character" alt="Character" />

                {/* Blaster – lower centre-right */}
                <img src="/assets/Blaster_animation 1.png" className="asset asset-blaster" alt="Blaster" />
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-text">THE STORY</div>
                <div className="scroll-arrow">▼</div>
            </div>

        </section>
    );
};

export default HeroSection;
