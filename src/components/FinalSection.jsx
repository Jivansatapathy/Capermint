import React, { useState, useEffect } from 'react';

const FinalSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 'slide1',
            bg: '/assets/sectionbg14.png',
            type: 'standard',
            title: 'THE RUN STARTS NOW!',
            titleColor: '#48FF3F',
            subtitle: 'EVERY RUN IS DIFFERENT EVERY SECOND COUNTS.',
        },
        {
            id: 'slide2',
            bg: '/assets/sectionbg14-1.png',
            type: 'characters',
            title: 'THE RUN STARTS NOW!',
            titleColor: '#FFFB8F',
            subtitle: 'EVERY RUN EVERY DODGE EVERY WIN ADDS UP\nTHANK YOU FOR RUNNING WITH US.',
            leftChar: '/assets/NOVA 2.png',
            rightChar: '/assets/Mara 2.png',
            logo: '/assets/Runner Runner 4K 1.png',
            buttonText: 'JOIN THE RUN!',
            buttonColor: '#19557B'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [slides.length]);

    return (
        <section className="final-section">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`final-slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ backgroundImage: `url('${slide.bg}')` }}
                >
                    <div className="final-overlay"></div>

                    {slide.type === 'characters' && (
                        <div className="final-character-layer">
                            <img src={slide.leftChar} alt="NOVA" className="final-char-left" />
                            <img src={slide.logo} alt="Runner Runner Logo" className="final-game-logo" />
                            <img src={slide.rightChar} alt="Mara" className="final-char-right" />
                        </div>
                    )}

                    <div className="final-content">
                        <h2 className="final-title" style={{ color: slide.titleColor }}>{slide.title}</h2>
                        <p className="final-subtitle" style={{ whiteSpace: 'pre-line' }}>{slide.subtitle}</p>

                        {slide.type === 'standard' ? (
                            <div className="final-store-buttons">
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/Google Store download button.png" alt="Google Play" />
                                </a>
                                <a href="#" target="_blank" rel="noopener noreferrer">
                                    <img src="/assets/App Store download button.png" alt="App Store" />
                                </a>
                            </div>
                        ) : (
                            <div className="final-action-button-container">
                                <button className="final-action-button" style={{ color: slide.buttonColor }}>
                                    {slide.buttonText}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            <div className="final-pagination">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === currentSlide ? 'dot-active' : ''}`}
                        onClick={() => setCurrentSlide(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default FinalSection;
