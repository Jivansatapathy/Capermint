import React from 'react';

const RunnersSection = ({ content }) => {
    if (!content || !content.runners) return null;

    const { title, subtitle, items } = content.runners;

    return (
        <section className="runners-section">
            <div className="runners-header">
                <h2 className="runners-title">{title}</h2>
                <p className="runners-subtitle">{subtitle}</p>
            </div>

            <div className="runners-grid">
                {items.map((runner, index) => (
                    <div key={index} className="runner-card-wrapper">
                        <div className="runner-card">
                            <div className="runner-card-bg">
                                <img src="/assets/cardmask.png" alt="Card Background" />
                            </div>
                            <div
                                className="runner-model"
                                style={runner.modelScale ? { width: `${runner.modelScale}%` } : {}}
                            >
                                <img src={runner.modelImage} alt={runner.name} />
                            </div>
                            <div className="runner-info">
                                <h3 className="runner-name">{runner.name}</h3>
                                <p className="runner-desc">{runner.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="runners-pagination">
                <span className="dot dot-active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </section>
    );
};

export default RunnersSection;
