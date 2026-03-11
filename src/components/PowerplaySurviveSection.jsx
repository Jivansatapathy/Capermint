import React from 'react';

const PowerplaySurviveSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.survive || {
        title: "SURVIVE LONGER",
        subtitle: "WHEN THE PATH TURNS BRUTAL, THESE POWERS KEEP YOU MOVING."
    };
    return (
        <section className="powerplay-survive-banner">
            <div className="survive-bg-left"></div>
            <div className="survive-bg-right"></div>
            <div className="survive-content">
                <h2 className="survive-title">{data.title}</h2>
                <p className="survive-subtitle">{data.subtitle}</p>
            </div>
        </section>
    );
};

export default PowerplaySurviveSection;
