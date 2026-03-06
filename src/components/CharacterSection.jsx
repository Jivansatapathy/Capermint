import React from 'react';

const CharacterSection = () => {
    return (
        <section className="character-section">
            <div className="char-bg"></div>

            <div className="char-content-wrapper">
                {/* Character on the left */}
                <div className="char-character">
                    <img src="/assets/3d model.png" alt="Character" className="char-model-img" />
                </div>

                {/* Card stack in the center/right */}
                <div className="char-card-stack">
                    <div className="card-back">
                        <img src="/assets/backcard.png" alt="Back Card" />
                    </div>

                    <div className="card-top-container">
                        <img src="/assets/topcard.png" alt="Top Card" className="card-top-bg" />

                        <div className="card-content">
                            <h2 className="card-heading">HEY RUNNER!</h2>
                            <h3 className="card-subheading">I'M SPEEDSTER AUSTIN.</h3>
                            <p className="card-text">
                                THE CITY'S ALWAYS BEEN MY TURF, BUT NOW IT'S YOURS TO CONQUER.<br />
                                THE STREETS ARE FULL OF OBSTACLES, POWER-UPS,<br />
                                AND ENDLESS CHALLENGES. ARE YOU FAST ENOUGH TO BEAT THEM ALL?
                            </p>
                        </div>
                        <div className="card-signature">
                            <img src="/assets/Signature.png" alt="Austin Signature" />
                        </div>

                        {/* Top Coin on the card */}
                        <div className="card-coin coin-top">
                            <img src="/assets/Coin_top.png" alt="Coin Top" />
                        </div>
                    </div>

                    {/* Bottom Coin below the card */}
                    <div className="card-coin coin-bottom">
                        <img src="/assets/Coin_bottom.png" alt="Coin Bottom" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CharacterSection;
