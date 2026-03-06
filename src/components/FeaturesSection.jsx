import React from 'react';

const FeaturesSection = () => {
    return (
        <section className="features-3d">
            <div className="features-container">
                <div className="features-left">
                    <h2 className="features-heading">
                        ENDLESS RUN!<br />
                        ENDLESS FUN!
                    </h2>
                    <div className="features-divider"></div>
                    <p className="features-desc">
                        IN RUNNER RUNNER, THE CITY IS YOUR PLAYGROUND. RUN, DODGE,
                        AND COLLECT POWER-UPS TO BEAT YOUR HIGH SCORE. SIMPLE TO
                        PLAY, HARD TO PUT DOWN. ARE YOU FAST ENOUGH TO STAY AHEAD?
                    </p>
                    <button className="features-btn">EXPLORE IT</button>
                </div>

                <div className="features-right">
                    <img
                        src="/assets/Mask group.png"
                        alt="Game Screenshot"
                        className="features-img"
                    />
                </div>
            </div>

            {/* Pagination indicator at bottom */}
            <div className="features-pagination">
                <span className="dot dot-active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </section>
    );
};

export default FeaturesSection;
