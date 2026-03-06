import React from 'react';

const StatsSection = () => {
    return (
        <section id="stats" className="stats-section">
            <div className="stats-grid">

                {/* 1. Games Played */}
                <div className="stat-group stats-top-left">
                    <span className="stat-number color-cream">2M+</span>
                    <div className="stat-card bg-yellow">
                        <h3 className="stat-title color-brown">GAMES PLAYED</h3>
                        <p className="stat-subtitle color-brown">RUNS COMPLETED BY PLAYERS<br />AROUND THE WORLD.</p>
                    </div>
                </div>

                {/* 2. Installs */}
                <div className="stat-group stats-top-right">
                    <div className="stat-number-wrapper">
                        <span className="stat-number color-light-green">370K+</span>
                    </div>
                    <div className="stat-card bg-green">
                        <h3 className="stat-title color-dark-green">INSTALLS</h3>
                        <p className="stat-subtitle color-dark-green">RUNNERS WHO HAVE JOINED<br />THE RUNNER RUNNER SO FAR.</p>
                    </div>
                </div>

                {/* 3. Prizes */}
                <div className="stat-group stats-bottom-left">
                    <div className="stat-number-wrapper">
                        <span className="stat-number color-light-purple">$75K+</span>
                    </div>
                    <div className="stat-card bg-pink">
                        <h3 className="stat-title color-purple">PRIZES DISTRIBUTED</h3>
                        <p className="stat-subtitle color-purple">REAL REWARDS EARNED THROUGH<br />SPECIAL EVENTS</p>
                    </div>
                </div>

                {/* 4. Daily Games */}
                <div className="stat-group stats-bottom-right">
                    <div className="stat-number-wrapper">
                        <span className="stat-number color-light-blue">3K+</span>
                    </div>
                    <div className="stat-card bg-blue">
                        <h3 className="stat-title color-dark-blue">GAMES PLAYED EVERY DAY</h3>
                        <p className="stat-subtitle color-dark-blue">THE RUN NEVER STOPS</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default StatsSection;
