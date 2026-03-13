import React from 'react';

const PowerplayMagnetSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.magnet || {
        title: "MAGNET",
        subtitle: "EVERY COIN COMES TO YOU.",
        description: "ACTIVATE THE MAGNET TO PULL NEARBY COINS STRAIGHT INTO YOUR PATH. NO MISSED REWARDS - JUST SMOOTH COLLECTION WHILE YOU STAY FOCUSED ON THE RUN.",
        image: "/assets/powerplay assets/section4img.png"
    };
    return (
        <section className="powerplay-magnet-section">
            <div className="magnet-container">
                <div className="magnet-left">
                    <h2 className="magnet-title">{data.title}</h2>
                    <h3 className="magnet-subtitle">{data.subtitle}</h3>
                    <div className="magnet-divider"></div>
                    <p className="magnet-description">
                        {data.description}
                    </p>
                </div>
                <div className="magnet-right">
                    <img
                        src={data.image}
                        alt="Magnet Powerup"
                        className="magnet-main-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayMagnetSection;
