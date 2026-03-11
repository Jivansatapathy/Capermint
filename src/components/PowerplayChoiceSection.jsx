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
                <h2 className="choice-title">{data.title}</h2>
                <p className="choice-subtitle">{data.subtitle}</p>
                <div className="choice-visual">
                    {/* Placeholder for images/icons if any */}
                </div>
                <p className="choice-footer-text">{data.footer}</p>
            </div>
        </section>
    );
};

export default PowerplayChoiceSection;
