import React from 'react';

const PowerupsSection = ({ content }) => {
    if (!content || !content.powerups) return null;

    const { title, subtitle, items } = content.powerups;

    return (
        <section className="powerups-section">
            <div className="powerups-content-wrapper">
                <div className="powerups-header">
                    <h2 className="powerups-title">{title}</h2>
                    <p className="powerups-subtitle">{subtitle}</p>
                </div>

                <div className="powerups-grid">
                    {items.map((powerup, index) => (
                        <div key={index} className="powerup-card">
                            <div className="powerup-card-bg">
                                <img src="/assets/card bg2.png" alt="Card Background" />
                            </div>
                            <div className="powerup-image-wrapper">
                                <img src={powerup.image} alt={powerup.name} />
                            </div>
                            <div className="powerup-info">
                                <h3 className="powerup-name">{powerup.name}</h3>
                                <p className="powerup-desc">{powerup.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="powerups-pagination">
                    <span className="dot dot-active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </section>
    );
};

export default PowerupsSection;
