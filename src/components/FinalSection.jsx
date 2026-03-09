import React from 'react';

const FinalSection = () => {
    return (
        <section className="final-section">
            <div className="final-bg" style={{ backgroundImage: "url('/assets/sectionbg14.png')" }}></div>
            <div className="final-overlay"></div>

            <div className="final-content">
                <h2 className="final-title">THE RUN STARTS NOW!</h2>
                <p className="final-subtitle">EVERY RUN IS DIFFERENT EVERY SECOND COUNTS.</p>

                <div className="final-store-buttons">
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/Google Store download button.png" alt="Google Play" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                        <img src="/assets/App Store download button.png" alt="App Store" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FinalSection;
