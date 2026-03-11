import React from 'react';

const PowerplayJumperSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.jumper || {
        title: "JUMPER",
        subtitle: "LAUNCH INTO ADVANTAGE.",
        description: "HIT A JUMPER TO BOUNCE HIGH ABOVE THE TRACK AND ESCAPE TIGHT OBSTACLES. GAIN A BETTER VIEW, MORE BREATHING ROOM, AND A CHANCE TO GRAB REWARDS FROM ABOVE.",
        image: "/assets/powerplay assets/section7img.png"
    };
    return (
        <section className="powerplay-jumper-section">
            <div className="jumper-container">
                <div className="jumper-left">
                    <img
                        src={data.image}
                        alt="Jumper Powerup"
                        className="jumper-main-img"
                    />
                </div>
                <div className="jumper-right">
                    <h2 className="jumper-title">{data.title}</h2>
                    <h3 className="jumper-subtitle">{data.subtitle}</h3>
                    <div className="jumper-divider"></div>
                    <p className="jumper-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayJumperSection;
