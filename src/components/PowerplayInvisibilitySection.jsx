import React from 'react';

const PowerplayInvisibilitySection = ({ content }) => {
    const data = content?.powerplayPage?.sections?.invisibility || {
        title: "INVISIBILITY",
        subtitle: "MAKE OBSTACLES DISAPPEAR.",
        description: "FOR A LIMITED TIME, OBSTACLES VANISH FROM YOUR PATH - GIVING YOU A CLEAR LANE TO RUN AT FULL SPEED. WHEN THE TRACK FEELS IMPOSSIBLE, TURN IT EFFORTLESS.",
        image: "/assets/powerplay assets/section3img.png"
    };
    return (
        <section className="powerplay-invisibility-section">
            <div className="invisibility-container">
                <div className="invisibility-left">
                    <img
                        src={data.image}
                        alt="Invisibility Visual"
                        className="invisibility-main-img"
                    />
                </div>

                <div className="invisibility-right">
                    <h2 className="invisibility-title">{data.title}</h2>
                    <h3 className="invisibility-subtitle">{data.subtitle}</h3>
                    <div className="invisibility-divider"></div>
                    <p className="invisibility-description">
                        {data.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PowerplayInvisibilitySection;
