import React from 'react';

const CharactersHero = ({ content }) => {
    const hero = content?.charactersPage?.hero || {};

    return (
        <section className="char-hero" style={{ backgroundImage: `url('${hero.bgImage}')` }}>
            <div className="char-hero-overlay"></div>
            <div className="char-hero-content">
                <h1 className="char-hero-title">{hero.title}</h1>
                <p className="char-hero-subtitle">{hero.subtitle}</p>
            </div>
        </section>
    );
};

export default CharactersHero;
