import React from 'react';

const GameModesSection = ({ content }) => {
    const rawData = content?.gameModes;
    const defaultItems = [];

    const data = {
        title: rawData?.title || "",
        subtitle: rawData?.subtitle || "",
        items: (rawData?.items || defaultItems).map(item => ({
            ...item,
            description: item.description || ""
        }))
    };

    return (
        <section className="game-modes-section" id="game-modes">
            <div className="container">
                <div className="game-modes-header">
                    <h2 className="game-modes-title">{data.title}</h2>
                    <p className="game-modes-subtitle">
                        {(data.subtitle || "").split('\n').map((line, i) => (
                            <React.Fragment key={i}>
                                {line}
                                {i < (data.subtitle || "").split('\n').length - 1 && <br />}
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
                                    {(mode.description || "").split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i < (mode.description || "").split('\n').length - 1 && <br />}
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
