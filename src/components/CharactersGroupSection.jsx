import React from 'react';

const CharactersGroupSection = ({ data }) => {
    const group = data || {
        title: "WHO WILL YOU RUN AS?",
        subtitle: "EACH CHARACTER BRINGS A DIFFERENT ENERGY.",
        text: "CHOOSE YOUR IDENTITY AND START THE RACE.",
        image: "/assets/characterasssets/Full Cherecters 1.png",
        bg: "/assets/characterasssets/section13bg.png"
    };

    return (
        <section className="char-section-group" style={{ backgroundImage: `url('${group.bg}')` }}>
            <div className="char-group-content">
                <img
                    src={group.image}
                    alt="Full Runner Roster"
                    className="char-group-img"
                />
                <div className="char-group-text-layer">
                    <h2 className="char-group-title">{group.title}</h2>
                    <h3 className="char-group-subtitle">{group.subtitle}</h3>
                    <p className="char-group-text">{group.text}</p>
                </div>
            </div>
        </section>
    );
};

export default CharactersGroupSection;
