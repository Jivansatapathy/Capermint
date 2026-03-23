import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const HeroSection2 = ({ content }) => {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // 1. Background Zoom-out Entrance
            if (bgRef.current) {
                tl.fromTo(bgRef.current,
                    { scale: 1.4, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 2.5, ease: 'expo.out' }
                );
            }

            // 2. Text Reveal (Word-by-word Title & Subtitle)
            if (document.querySelector('.hero-content .title-word')) {
                tl.from('.hero-content .title-word', {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    clearProps: 'y,opacity'
                }, '-=1.8');
            }

            if (document.querySelector('.hero-content .hero-subtitle')) {
                tl.from('.hero-content .hero-subtitle', {
                    y: 40,
                    opacity: 0,
                    duration: 1.0,
                    clearProps: 'y,opacity'
                }, '-=1.0');
            }

            // 3. Assets Pop-in
            if (document.querySelector('.hero-assets .asset')) {
                tl.from('.hero-assets .asset', {
                    scale: 0,
                    opacity: 0,
                    rotation: 'random(-45, 45)',
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'back.out(1.7)',
                    clearProps: 'scale,opacity,rotation'
                }, '-=0.8');
            }

            // 4. Scroll Indicator
            if (document.querySelector('.scroll-indicator')) {
                tl.from('.scroll-indicator', {
                    y: 20,
                    opacity: 0,
                    duration: 0.8
                }, '-=0.4');
            }

            // Mouse Move Interaction
            const handleMouseMove = (e) => {
                if (!document.querySelector('.hero-assets .asset')) return;

                const { clientX, clientY } = e;
                const xPercent = (clientX / window.innerWidth - 0.5);
                const yPercent = (clientY / window.innerHeight - 0.5);

                // Animate other assets normally
                if (document.querySelector('.hero-assets .asset:not(.asset-character)')) {
                    gsap.to('.hero-assets .asset:not(.asset-character)', {
                        x: xPercent * 40,
                        y: yPercent * 40,
                        rotateY: xPercent * 50,
                        rotateX: -yPercent * 50,
                        duration: 1.5,
                        ease: 'power3.out',
                        stagger: {
                            amount: 0.1,
                            from: 'center'
                        }
                    });
                }

                // Specifically handle the centered character to preserve its translateX(-50%)
                if (document.querySelector('.hero-assets .asset-character')) {
                    gsap.to('.hero-assets .asset-character', {
                        x: xPercent * 20,
                        y: yPercent * 20,
                        xPercent: -50,
                        rotateY: xPercent * 30,
                        rotateX: -yPercent * 30,
                        duration: 1.5,
                        ease: 'power3.out'
                    });
                }
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, sectionRef);

        return () => ctx.revert();
    }, [content]);

    // Helper to split text into words while preserving <br />
    const splitTitle = (text) => {
        return text.split('<br />').map((line, lineIdx) => (
            <React.Fragment key={lineIdx}>
                {line.split(' ').map((word, wordIdx) => (
                    <span key={wordIdx} className="title-word" style={{ display: 'inline-block', marginRight: '0.25em' }}>
                        {word}
                    </span>
                ))}
                {lineIdx === 0 && <br />}
            </React.Fragment>
        ));
    };

    const titleText = content?.hero?.title || "";

    return (
        <section id="home" ref={sectionRef} className="hero" style={{
            perspective: '1000px',
            backgroundColor: '#000'
        }}>
            {/* Background Layer */}
            <div
                ref={bgRef}
                className="hero-bg"
                style={{
                    backgroundImage: content?.hero?.bg ? `url('${content.hero.bg}')` : 'none',
                    zIndex: 0
                }}
            />

            {/* Dark vignette overlay */}
            <div className="hero-overlay" style={{ zIndex: 1 }}></div>

            {/* Title + Subtitle */}
            <div className="hero-content" style={{ zIndex: 10 }}>
                <h1 className="hero-title" style={{
                    color: '#FFFFBD',
                    WebkitTextFillColor: '#FFFFBD',
                    fontSize: '100px',
                    letterSpacing: '3px',
                }}>
                    {splitTitle(titleText)}
                </h1>
                <p className="hero-subtitle" style={{
                    color: '#FFFFBD',
                    fontSize: '30px',
                    letterSpacing: '3px',
                }}>
                    {content?.hero?.subtitle || ''}
                </p>
            </div>

            {/* Floating assets */}
            <div className="hero-assets" style={{ zIndex: 8 }}>
                {content?.hero?.assets?.coin && <img src={content.hero.assets.coin} className="asset asset-coin" alt="Coin" style={{ width: '149px', height: '163px' }} />}
                {content?.hero?.assets?.twoX && <img src={content.hero.assets.twoX} className="asset asset-2x" alt="2X" style={{ width: '233px', height: '233px' }} />}
                {content?.hero?.assets?.magnet && <img src={content.hero.assets.magnet} className="asset asset-magnet" alt="Magnet" style={{ width: '185px', height: '185px' }} />}
                {content?.hero?.assets?.chest && <img src={content.hero.assets.chest} className="asset asset-chest" alt="Chest" style={{ width: '225px', height: '187px', borderRadius: '16px' }} />}
                {content?.hero?.assets?.shield && <img src={content.hero.assets.shield} className="asset asset-shield" alt="Shield" style={{ width: '144px', height: '189px' }} />}
                {content?.hero?.assets?.character && <img src={content.hero.assets.character} className="asset asset-character" alt="Character" style={{ width: '180px', height: '180px', borderRadius: '20px' }} />}
                {content?.hero?.assets?.blaster && <img src={content.hero.assets.blaster} className="asset asset-blaster" alt="Blaster" style={{ width: '228px', height: '197px' }} />}
            </div>

            {/* Scroll indicator */}
            <div className="scroll-indicator" style={{ zIndex: 12 }}>
                <div className="scroll-text">THE STORY</div>
                <div className="scroll-arrow">▼</div>
            </div>

        </section>
    );
};

export default HeroSection2;
