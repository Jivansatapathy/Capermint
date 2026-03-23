import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import PowerplayHero from '../components/PowerplayHero';
import PowerplaySurviveSection from '../components/PowerplaySurviveSection';
import PowerplayShieldSection from '../components/PowerplayShieldSection';
import PowerplayBlasterSection from '../components/PowerplayBlasterSection';
import PowerplayInvisibilitySection from '../components/PowerplayInvisibilitySection';
import PowerplayRewardsSection from '../components/PowerplayRewardsSection';
import PowerplayMagnetSection from '../components/PowerplayMagnetSection';
import PowerplayScoreSection from '../components/PowerplayScoreSection';
import PowerplayMegaCoinSection from '../components/PowerplayMegaCoinSection';
import PowerplayBonusZoneSection from '../components/PowerplayBonusZoneSection';
import PowerplayJumperSection from '../components/PowerplayJumperSection';
import PowerplayBonusRoadSection from '../components/PowerplayBonusRoadSection';
import PowerplayChoiceSection from '../components/PowerplayChoiceSection';
import FinalSection from '../components/FinalSection';
import Lenis from '@studio-freight/lenis';
import '../styles/powerplay.css';

const Powerplay = () => {
    const [content, setContent] = useState({});

    useEffect(() => {
        // Smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);

        // Fetch content from backend
        axios.get('/api/content')
            .then(res => setContent(res.data))
            .catch(() => {
                // Fallback to local data
            });

        return () => lenis.destroy();
    }, []);

    return (
        <div className="powerplay-page">
            <main>
                <PowerplayHero content={content} />
                <PowerplaySurviveSection content={content} />
                <PowerplayShieldSection content={content} />
                <PowerplayBlasterSection content={content} />
                <PowerplayInvisibilitySection content={content} />
                <PowerplayRewardsSection content={content} />
                <PowerplayMagnetSection content={content} />
                <PowerplayScoreSection content={content} />
                <PowerplayMegaCoinSection content={content} />
                <PowerplayBonusZoneSection content={content} />
                <PowerplayJumperSection content={content} />
                <PowerplayBonusRoadSection content={content} />
                <PowerplayChoiceSection content={content} />
                <FinalSection content={content} />
            </main>
            <Footer />
        </div>
    );
};

export default Powerplay;
