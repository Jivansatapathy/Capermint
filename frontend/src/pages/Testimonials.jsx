import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';
import '../styles/testimonials.css';
import { API_URL } from '../api_config';



const Testimonials = () => {
    const [content, setContent] = useState({});
    const stats = content?.testimonialsPage?.stats || [];

    const hero = content?.testimonialsPage?.hero || {};

    const containerRef = useRef(null);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setContent(res.data))
            .catch(() => { });

        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from('.testimonials-hero-content > *', {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            });

            // Stats Cards Animation
            gsap.from('.stats-card', {
                scrollTrigger: {
                    trigger: '.testimonial-stats-section',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main className="testimonials-page" ref={containerRef}>
            <section className="testimonials-hero">
                <div className="testimonials-hero-content">
                    <h1 className="testimonials-hero-title" dangerouslySetInnerHTML={{ __html: hero.title }}></h1>
                    <p className="testimonials-hero-subtitle">
                        {hero.subtitle}
                    </p>
                </div>
            </section>

            <section className="testimonial-stats-section">
                <div className="testimonial-stats-box">
                    <div className="testimonial-stats-container">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`stats-card stats-card-${idx + 1}`}>
                                <img src={stat.icon} alt={stat.title} className="stats-card-icon" />
                                <div className="stats-card-content">
                                    <h2 className="stats-numeric">{stat.value}</h2>
                                    <h3 className="stats-title">{stat.title}</h3>
                                    {stat.subtitle && <p className="stats-subtitle">{stat.subtitle}</p>}
                                    <p className="stats-desc">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <TestimonialsSection content={content} />
            <Footer content={content} />
        </main>
    );
};

export default Testimonials;
