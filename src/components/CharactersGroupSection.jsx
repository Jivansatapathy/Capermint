import React from 'react';

const CharactersGroupSection = () => {
    return (
        <section className="char-section-group" style={{ backgroundImage: "url('/assets/characterasssets/section13bg.png')" }}>
            <div className="char-group-content">
                <img
                    src="/assets/characterasssets/Full Cherecters 1.png"
                    alt="Full Runner Roster"
                    className="char-group-img"
                />
                <div className="char-group-text-layer">
                    <h2 className="char-group-title">WHO WILL YOU RUN AS?</h2>
                    <h3 className="char-group-subtitle">EACH CHARACTER BRINGS A DIFFERENT ENERGY.</h3>
                    <p className="char-group-text">CHOOSE YOUR IDENTITY AND START THE RACE.</p>
                </div>
            </div>
        </section>
    );
};

export default CharactersGroupSection;
