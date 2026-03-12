import React from 'react';

const PowerplayChoiceSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.choice || {
        title: "WHICH POWERUP WILL YOU CHOOSE?",
        subtitle: "THE RIGHT POWER AT THE RIGHT MOMENT CAN CHANGE EVERYTHING.",
        footer: "WHAT'S YOUR WINNING STRATEGY?"
    };

    return (
        <section className="powerplay-choice-section">
            <div className="choice-container">
                <div className="choice-visual">
                    {/* Floating Powerup Icons */}
                    <img src="/assets/powerplay assets/section9farleftimg.png" alt="Potion" className="choice-icon icon-potion" />
                    <img src="/assets/powerplay assets/section9img2x.png" alt="2x" className="choice-icon icon-2x" />
                    <img src="/assets/powerplay assets/section9imgshield.png" alt="Shield" className="choice-icon icon-shield" />
                    
                    {/* Central Hero */}
                    <img src="/assets/powerplay assets/section9imgboy.png" alt="Runner" className="choice-hero-img" />
                    
                    <img src="/assets/powerplay assets/section9imgmagnet.png" alt="Magnet" className="choice-icon icon-magnet" />
                    <img src="/assets/powerplay assets/section9img4x.png" alt="4x" className="choice-icon icon-4x" />
                    <img src="/assets/powerplay assets/section9imgblaster.png" alt="Blaster" className="choice-icon icon-blaster" />
                </div>

                <div className="choice-content">
                    <h2 className="choice-title">{data.title}</h2>
                    <p className="choice-subtitle">{data.subtitle}</p>
                    <p className="choice-footer">{data.footer}</p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayChoiceSection;
