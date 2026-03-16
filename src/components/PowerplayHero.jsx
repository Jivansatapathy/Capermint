import React from 'react';
import '../styles/powerplay.css';

const PowerplayHero = ({ content }) => {
    const hero = content?.powerplayPage?.hero || {
        title: "POWER UP YOUR RUN.",
        subtitle: "CHANGE THE GAME."
    };
    
    const rawAssets = content?.powerplayPageAssets?.hero;
    const defaultAssets = [
        "/assets/powerplay assets/1.png",
        "/assets/powerplay assets/2.png",
        "/assets/powerplay assets/3.png",
        "/assets/powerplay assets/4.png"
    ];
    
    const assets = {
        assets: rawAssets?.assets || defaultAssets,
        runBtn: rawAssets?.runBtn || "/assets/powerplay assets/BTN 1.png"
    };

    return (
        <section className="powerplay-hero">
            <div className="powerplay-hero-bg"></div>
            <div className="powerplay-hero-overlay"></div>

            {/* Asset 1: Far back girl */}
            <img src={assets.assets[0]} alt="Runner 1" className="pp-asset pp-asset-1" />

            {/* Asset 2: Far right girl */}
            <img src={assets.assets[1]} alt="Runner 2" className="pp-asset pp-asset-2" />

            {/* Asset 3: Left afro girl */}
            <img src={assets.assets[2]} alt="Runner 3" className="pp-asset pp-asset-3" />

            {/* Sandwiched Text Layer (Behind the boy, above the rest) */}
            <div className="powerplay-hero-text">
                <h1 className="powerplay-title">{hero.title}</h1>
                <p className="powerplay-subtitle">{hero.subtitle}</p>
            </div>

            {/* Asset 4: Center boy (Topmost Layer) */}
            <img src={assets.assets[3]} alt="Runner 4" className="pp-asset pp-asset-4" />

            {/* Bottom Button */}
            <div className="powerplay-hero-action">
                <button className="powerplay-run-btn">
                    <img src={assets.runBtn} alt="Run" />
                </button>
            </div>
        </section>
    );
};

export default PowerplayHero;
