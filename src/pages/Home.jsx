import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroSection2 from '../components/HeroSection2';
import FeaturesSection from '../components/FeaturesSection';
import GameModesSection from '../components/GameModesSection';
import Section10 from '../components/Section10';
import CharacterSection from '../components/CharacterSection';
import CommunitySection from '../components/CommunitySection';
import RunnersSection from '../components/RunnersSection';
import PowerupsSection from '../components/PowerupsSection';
import ExploreSection from '../components/ExploreSection';
import StatsSection from '../components/StatsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FeaturedArticlesSection from '../components/FeaturedArticlesSection';
import CTASection from '../components/CTASection';
import FinalSection from '../components/FinalSection';
import Footer from '../components/Footer';
import Lenis from '@studio-freight/lenis';
import contentData from '../../content.json';
import '../styles/home.css';

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
            .catch(() => {
                // Backend is locally offline; using content.json as fallback
            });

        return () => lenis.destroy();
    }, []);

    return (
        <>
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
                <GameModesSection />
                <Section10 />
                <FinalSection />
                <TestimonialsSection />
                <CTASection />
                <FeaturedArticlesSection content={content} />
            </main>
            <Footer />
        </>
    );
};

export default Home;
