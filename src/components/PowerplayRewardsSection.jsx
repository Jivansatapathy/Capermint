import React from 'react';

const PowerplayRewardsSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.rewards || {
        title: "STACK REWARDS",
        subtitle: "TURN EVERY RUN INTO A REWARD RUSH."
    };
    return (
        <section className="powerplay-rewards-banner">
            <div className="rewards-bg-left"></div>
            <div className="rewards-bg-right"></div>
            <div className="rewards-content">
                <h2 className="rewards-title">{data.title}</h2>
                <p className="rewards-subtitle">{data.subtitle}</p>
            </div>
        </section>
    );
};

export default PowerplayRewardsSection;
