import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharactersHero from '../components/CharactersHero';
import CharacterDetails from '../components/CharacterDetails';
import CharactersGroupSection from '../components/CharactersGroupSection';
import FinalSection from '../components/FinalSection';
import Footer from '../components/Footer';
import Lenis from '@studio-freight/lenis';
import '../styles/characters.css';
import { API_URL } from '../api_config';


const CharactersPage = () => {
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
        axios.get(API_URL)
            .then(res => setContent(res.data))
            .catch(() => {
                // Fallback to local data
            });

        return () => lenis.destroy();
    }, []);

    const sections = content?.charactersPage?.sections || [];

    return (
        <div className="characters-page">
            <main>
                <CharactersHero content={content} />
                {sections.map((section) => (
                    <CharacterDetails key={section.id} sectionData={section} />
                ))}
                <CharactersGroupSection data={content?.charactersPage?.groupSection} />
                <FinalSection content={content} />
            </main>
            <Footer content={content} />
        </div>
    );
};

export default CharactersPage;
