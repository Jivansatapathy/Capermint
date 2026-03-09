import React from 'react';

const GameModesSection = () => {
    return (
        <section className="game-modes-section" id="game-modes">
            <div className="container">
                <div className="game-modes-header">
                    <h2 className="game-modes-title">GAME MODES</h2>
                    <p className="game-modes-subtitle">
                        MORE THAN ONE WAY TO PLAY<br />
                        EACH MODE CHANGES HOW THE RUN FEELS
                    </p>
                </div>

                <div className="game-modes-grid">
                    {/* Card 1 */}
                    <div className="game-mode-card">
                        <div className="game-mode-img-wrapper">
                            <img src="/assets/vs mode 1.png" alt="Endless Run" />
                        </div>
                        <div className="game-mode-content">
                            <h3>ENDLESS RUN</h3>
                            <p>RUN AS FAR AS YOU CAN WITHOUT<br />STOPPING ONE MISTAKE ENDS IT ALL</p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="game-mode-card">
                        <div className="game-mode-img-wrapper">
                            <img src="/assets/vs mode 2.png" alt="VS Mode" />
                        </div>
                        <div className="game-mode-content">
                            <h3>VS MODE</h3>
                            <p>RACE AGAINST OTHERS IN REAL TIME<br />ONLY ONE RUNNER WINS</p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="game-mode-card">
                        <div className="game-mode-img-wrapper">
                            <img src="/assets/vs mode 3.png" alt="Raid Mode" />
                        </div>
                        <div className="game-mode-content">
                            <h3>RAID MODE</h3>
                            <p>FACE INTENSE OBSTACLE ATTACKS<br />SURVIVE THE CHAOS AND KEEP MOVING</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GameModesSection;
