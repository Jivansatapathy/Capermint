import React from 'react';

const CharactersGroupSection = ({ data }) => {
    const group = data || {};

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
