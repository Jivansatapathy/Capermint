import React from 'react';

const PowerplayShieldSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.shield || {
        title: "SHIELD",
        subtitle: "ONE HIT. ZERO SLOWDOWN.",
        description: "ACTIVATE THE SHIELD TO ABSORB AN OBSTACLE WITHOUT BREAKING YOUR STREAK. KEEP YOUR MOMENTUM ALIVE AND STAY LOCKED IN ON YOUR HIGH SCORE.",
        image: "/assets/powerplay assets/section1img.png"
    };
    return (
        <section className="powerplay-shield-section">
            <div className="shield-container">
                <div className="shield-left">
                    <img src={data.image} alt="Shield Game View" className="shield-main-img" />
                </div>
                <div className="shield-right">
                    <h2 className="shield-title">{data.title}</h2>
                    <h3 className="shield-subtitle">{data.subtitle}</h3>
                    <div className="shield-divider"></div>
                    <p className="shield-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayShieldSection;
