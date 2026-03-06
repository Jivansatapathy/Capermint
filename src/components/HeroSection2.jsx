import React, { useEffect } from 'react';
import gsap from 'gsap';

const HeroSection2 = ({ content }) => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPercent = (clientX / window.innerWidth - 0.5);
            const yPercent = (clientY / window.innerHeight - 0.5);

            // Animate Assets with 3D tilt
            gsap.to('.hero-assets .asset', {
                x: xPercent * 10, // Minimal follow
                y: yPercent * 10,
                rotateY: xPercent * 30, // Proactive 3D tilt toward mouse
                rotateX: -yPercent * 30,
                duration: 1.2,
                ease: 'power2.out',
                stagger: 0.01
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id="home" style={{
            width: '100%',
            height: '100vh',
            backgroundImage: "url('/assets/BG photo.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            perspective: '1000px', // Added perspective for 3D tilt
        }}>

            {/* Title + Subtitle */}
            <div className="hero-content">
                <h1 className="hero-title" style={{
                    color: '#FFFFBD',
                    fontSize: '100px',
                    letterSpacing: '3px',
                    WebkitTextFillColor: '#FFFFBD',
                }}>
                    THE ULTIMATE COMPETITIVE<br />RUNNER EXPERIENCE
                </h1>
                <p className="hero-subtitle" style={{
                    color: '#FFFFBD',
                    fontSize: '30px',
                    letterSpacing: '3px',
                }}>
                    {content?.hero?.subtitle || 'WHERE SPEED MEETS STRATEGY'}
                </p>
            </div>

            {/* Floating assets */}
            <div className="hero-assets">
                <img src="/assets/coin.png" className="asset asset-coin" alt="Coin" style={{ width: '149px', height: '163px' }} />
                <img src="/assets/2x 1.png" className="asset asset-2x" alt="2X" style={{ width: '233px', height: '233px' }} />
                <img src="/assets/magnet 1.png" className="asset asset-magnet" alt="Magnet" style={{ width: '185px', height: '185px' }} />
                <img src="/assets/Chest_1 2.png" className="asset asset-chest" alt="Chest" style={{ width: '225px', height: '187px', borderRadius: '16px' }} />
                <img src="/assets/Shield_Animation 1.png" className="asset asset-shield" alt="Shield" style={{ width: '144px', height: '189px' }} />
                <img src="/assets/New-Icon 1.png" className="asset asset-character" alt="Character" style={{ width: '180px', height: '180px', borderRadius: '20px' }} />
                <img src="/assets/Blaster_animation 1.png" className="asset asset-blaster" alt="Blaster" style={{ width: '228px', height: '197px' }} />
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator">
                <div className="scroll-text">THE STORY</div>
                <div className="scroll-arrow">▼</div>
            </div>

        </section>
    );
};

export default HeroSection2;
