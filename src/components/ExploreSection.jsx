import React from 'react';

const ExploreSection = ({ content }) => {
    if (!content || !content.explore) return null;

    const { title, subtitle, buttonText } = content.explore;

    return (
        <section className="explore-section">
            <div className="explore-gradient-overlay"></div>

            <div className="explore-content">
                <h2 className="explore-title">{title}</h2>
                <h3 className="explore-subtitle">{subtitle}</h3>

                <button className="explore-button">
                    <span className="explore-btn-text">{buttonText}</span>
                    <span className="explore-btn-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 12L9 6" stroke="#21910B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                </button>
            </div>
        </section>
    );
};

export default ExploreSection;
