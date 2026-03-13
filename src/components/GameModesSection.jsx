import React from 'react';

const GameModesSection = ({ content }) => {
    const data = content?.gameModes || {
        title: "GAME MODES",
        subtitle: "MORE THAN ONE WAY TO PLAY\nEACH MODE CHANGES HOW THE RUN FEELS",
        items: [
            {
                title: "ENDLESS RUN",
                description: "RUN AS FAR AS YOU CAN WITHOUT\nSTOPPING ONE MISTAKE ENDS IT ALL",
                image: "/assets/vs mode 1.png"
            },
            {
                title: "VS MODE",
                description: "RACE AGAINST OTHERS IN REAL TIME\nONLY ONE RUNNER WINS",
                image: "/assets/vs mode 2.png"
            },
            {
                title: "RAID MODE",
                description: "FACE INTENSE OBSTACLE ATTACKS\nSURVIVE THE CHAOS AND KEEP MOVING",
                image: "/assets/vs mode 3.png"
            }
        ]
    };

    return (
        <section className="game-modes-section" id="game-modes">
            <div className="container">
                <div className="game-modes-header">
                    <h2 className="game-modes-title">{data.title}</h2>
                    <p className="game-modes-subtitle">
                        {data.subtitle.split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < data.subtitle.split('\n').length - 1 && <br />}
                            </React.Fragment>
                        ))}
                    </p>
                </div>

                <div className="game-modes-grid">
                    {data.items.map((mode, index) => (
                        <div key={index} className="game-mode-card">
                            <div className="game-mode-img-wrapper">
                                <img src={mode.image} alt={mode.title} />
                            </div>
                            <div className="game-mode-content">
                                <h3>{mode.title}</h3>
                                <p>
                                    {mode.description.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i < mode.description.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GameModesSection;
