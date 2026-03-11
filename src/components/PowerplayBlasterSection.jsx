import React from 'react';

const PowerplayBlasterSection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.blaster || {
        title: "BLASTER",
        subtitle: "CLEAR THE WAY. KEEP THE SPEED.",
        description: "FIRE UP THE BLASTER AND DESTROY OBSTACLES IN YOUR WAY. TURN DANGER INTO DEBRIS AND KEEP RUNNING AT FULL SPEED WITHOUT SLOWING DOWN.",
        image: "/assets/powerplay assets/section2img.png"
    };
    return (
        <section className="powerplay-blaster-section">
            <div className="blaster-container">
                <div className="blaster-left">
                    <h2 className="blaster-title">{data.title}</h2>
                    <h3 className="blaster-subtitle">{data.subtitle}</h3>
                    <div className="blaster-divider"></div>
                    <p className="blaster-description">
                        {data.description}
                    </p>
                </div>
                <div className="blaster-right">
                    <img src={data.image} alt="Blaster Game View" className="blaster-main-img" />
                </div>
            </div>
        </section>
    );
};

export default PowerplayBlasterSection;
