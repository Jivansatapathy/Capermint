import React from 'react';

const PowerplayBonusRoadSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.bonusRoad || {
        title: "BONUS ROAD",
        subtitle: "ENTER THE BONUS ROAD.",
        description: "FIND THE BONUS ROAD AND SHIFT INTO A HIGH-REWARD ROUTE FILLED WITH EXTRA COINS AND BIG SCORING OPPORTUNITIES. IT'S YOUR CHANCE TO TURN A GREAT RUN INTO A RECORD-BREAKING ONE.",
        image: "/assets/powerplay assets/section8img.png"
    };
    return (
        <section className="powerplay-bonusroad-section">
            <div className="bonusroad-container">
                <div className="bonusroad-left">
                    <h2 className="bonusroad-title">{data.title}</h2>
                    <h3 className="bonusroad-subtitle">{data.subtitle}</h3>
                    <div className="bonusroad-divider"></div>
                    <p className="bonusroad-description">
                        {data.description}
                    </p>
                </div>
                <div className="bonusroad-right">
                    <img
                        src={data.image}
                        alt="Bonus Road"
                        className="bonusroad-main-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayBonusRoadSection;
