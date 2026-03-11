import React from 'react';

const PowerplayBonusZoneSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.bonusZone || {
        title: "BONUS ZONE"
    };
    return (
        <section className="powerplay-bonus-zone-banner">
            <div className="bonus-zone-bg-left"></div>
            <div className="bonus-zone-bg-right"></div>
            <div className="bonus-zone-content">
                <h2 className="bonus-zone-title">{data.title}</h2>
            </div>
        </section>
    );
};

export default PowerplayBonusZoneSection;
