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
import HomeTestimonials from '../components/HomeTestimonials';
import FeaturedArticlesSection from '../components/FeaturedArticlesSection';
import CTASection from '../components/CTASection';
import FinalSection from '../components/FinalSection';
import Footer from '../components/Footer';
import Lenis from '@studio-freight/lenis';
import '../styles/home.css';

import fallbackContent from '../fallbackContent.json';
import { API_URL } from '../api_config';


const Home = () => {
    const [content, setContent] = useState(fallbackContent);

    useEffect(() => {
        // Smooth scroll
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);

        // Try to fetch content from backend; silently use defaults if unavailable
        axios.get(API_URL)
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent(res.data);
                }
            })
            .catch(() => {
                console.warn("Backend offline, using fallback content.");
            });

        return () => lenis.destroy();
    }, []);

    return (
        <>
            <main>
                <HeroSection2 content={content} />
                <StatsSection content={content} />
                <FeaturesSection content={content} />
                <CharacterSection content={content} />
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
                <GameModesSection content={content} />
                <Section10 content={content} />
                <FinalSection content={content} />
                <HomeTestimonials content={content} />
                <CTASection content={content} />
                <FeaturedArticlesSection content={content} />
            </main>
            <Footer content={content} />
        </>
    );
};

export default Home;
