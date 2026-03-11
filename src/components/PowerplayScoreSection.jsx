import React from 'react';

const PowerplayScoreSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.score || {
        title: "2X & 4X",
        subtitle: "DOUBLE & QUADRUPLE YOUR SCORE.",
        description: "COLLECT THE 2X OR 4X POWER-UP AND WATCH YOUR SCORE MULTIPLY AS YOU RUN THROUGH THE TRACK. A QUICK WAY TO BOOST YOUR POINTS.",
        image: "/assets/powerplay assets/section5right.png"
    };
    return (
        <section className="powerplay-score-section">
            <div className="score-container">
                <div className="score-visual">
                    <img
                        src={data.image}
                        alt="Score Multiplier"
                        className="score-main-img"
                    />
                </div>

                <div className="score-content">
                    <h2 className="score-main-title">{data.title}</h2>
                    <h3 className="score-main-subtitle">{data.subtitle}</h3>
                    <div className="score-horizontal-divider"></div>
                    <p className="score-main-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayScoreSection;
