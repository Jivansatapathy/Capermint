import React from 'react';
import Footer from '../components/Footer';
import FinalSection from '../components/FinalSection';
import '../styles/maps.css';

const Maps = () => {
    return (
        <main className="maps-page">
            <section className="maps-hero">
                <div className="maps-hero-content">
                    <h1 className="maps-hero-title">
                        RUNNER RUNNER
                    </h1>
                    <p className="maps-hero-subtitle">
                        EXPLORE OUR MAPS
                    </p>
                </div>
            </section>

            {/* Section 2: Pure background image section */}
            <section className="maps-transition-section"></section>

            {/* Section 3: Call-to-action section */}
            <section className="maps-cta-section">
                <div className="maps-cta-content">
                    <img src="/assets/maps/section3midimg.png" alt="Runners" className="cta-mid-img" />
                    
                    <div className="cta-text-content">
                        <h2 className="cta-main-title">WHERE WILL YOU RUN NEXT?</h2>
                        <p className="cta-subtitle-1">EACH MAP OFFERS A UNIQUE ENVIRONMENT AND NEW CHALLENGES.</p>
                        <p className="cta-subtitle-2">CHOOSE YOUR MAP AND START THE ADVENTURE!</p>
                    </div>
                </div>
            </section>

            <FinalSection />
            <Footer />
        </main>
    );
};

export default Maps;
