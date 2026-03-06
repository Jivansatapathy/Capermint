import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection2 from '../components/HeroSection2';
import FeaturesSection from '../components/FeaturesSection';
import CharacterSection from '../components/CharacterSection';
import CommunitySection from '../components/CommunitySection';
import RunnersSection from '../components/RunnersSection';
import PowerupsSection from '../components/PowerupsSection';
import ExploreSection from '../components/ExploreSection';
import StatsSection from '../components/StatsSection';
import Lenis from '@studio-freight/lenis';
import contentData from '../../content.json';

const Home = () => {
    const [content, setContent] = useState(contentData);

    useEffect(() => {
        // Smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);

        // Try to fetch content from backend; silently use defaults if unavailable
        axios.get('http://localhost:3000/api/content')
            .then(res => setContent(res.data))
            .catch(() => { }); // use defaultContent already set

        return () => lenis.destroy();
    }, []);

    return (
        <main>
            <HeroSection2 content={content} />
            <StatsSection />
            <FeaturesSection />
            <CharacterSection />
            {content.community && content.community.map((item, idx) => (
                <CommunitySection
                    key={idx}
                    number={item.number}
                    title={item.title}
                    desc={item.desc}
                    image={item.image}
                    reversed={item.reversed}
                    gradientVariant={item.gradientVariant}
                />
            ))}
            <RunnersSection content={content} />
            <PowerupsSection content={content} />
            <ExploreSection content={content} />

            <section className="section-padding" id="about">
                <div className="container">
                    <h2 className="section-title">{content.about.title}</h2>
                    <p className="section-text">{content.about.text}</p>
                </div>
            </section>

            <section className="section-padding" id="game-features">
                <div className="container">
                    <h2 className="section-title">GAME FEATURES</h2>
                    <div className="features-grid">
                        {content.features.map((f, i) => (
                            <div key={i} className="feature-card">
                                <h3>{f.title}</h3>
                                <p>{f.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
