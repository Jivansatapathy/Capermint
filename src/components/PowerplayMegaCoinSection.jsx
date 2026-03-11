import React from 'react';

const PowerplayMegaCoinSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.megaCoin || {
        title: "MEGA COIN",
        subtitle: "BIGGER PICKUPS. BIGGER REWARDS.",
        description: "GRAB MEGA COINS FOR AN INSTANT SCORE BOOST. ONE PICKUP, MASSIVE VALUE - PERFECT FOR CLIMBING THE LEADERBOARD FASTER.",
        image: "/assets/powerplay assets/section6img.png"
    };
    return (
        <section className="powerplay-megacoin-section">
            <div className="megacoin-container">
                <div className="megacoin-left">
                    <h2 className="megacoin-title">{data.title}</h2>
                    <h3 className="megacoin-subtitle">{data.subtitle}</h3>
                    <div className="megacoin-divider"></div>
                    <p className="megacoin-description">
                        {data.description}
                    </p>
                </div>
                <div className="megacoin-right">
                    <img
                        src={data.image}
                        alt="Mega Coin"
                        className="megacoin-main-img"
                    />
                </div>
            </div>
        </section>
    );
};

export default PowerplayMegaCoinSection;
