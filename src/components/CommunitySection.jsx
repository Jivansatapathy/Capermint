import React from 'react';

const CommunitySection = ({ title, desc, image, reversed, gradientVariant, number }) => {
    return (
        <section className={`community-section ${reversed ? 'community-reversed' : ''} ${gradientVariant ? `community-gradient-${gradientVariant}` : ''}`}>
            <div className="community-gradient-overlay"></div>
            <div className="community-content">
                <div className="community-container">
                    <div className="community-text">
                        <h2 className="community-title">{title}</h2>
                        <div className="community-divider"></div>
                        <p className="community-desc">{desc}</p>
                    </div>
                    <div className="community-image">
                        <img src={image} alt="Mobile Game Preview" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CommunitySection;
