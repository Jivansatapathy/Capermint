import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsSection = ({ content }) => {
    const sectionRef = useRef(null);

    const rawItems = content?.stats?.items;
    const defaultItems = [];

    const statsItems = (rawItems || defaultItems).map(item => ({
        ...item,
        subtitle: item.subtitle || ""
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            statsItems.forEach((stat, index) => {
                const obj = { value: 0 };
                const el = document.querySelector(`.stat-number-${index + 1}`);

                if (!el) return;

                gsap.to(obj, {
                    value: stat.target,
                    duration: 2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                    onUpdate: () => {
                        const val = Math.floor(obj.value);
                        el.textContent = `${stat.prefix || ''}${val}${stat.suffix || ''}`;
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [statsItems]);

    return (
        <section id="stats" className="stats-section" ref={sectionRef}>
            <div className="stats-grid">
                {statsItems.map((stat, idx) => (
                    <div key={idx} className={`stat-group stats-${idx === 0 ? 'top-left' : idx === 1 ? 'top-right' : idx === 2 ? 'bottom-left' : 'bottom-right'}`}>
                        <div className={idx !== 0 ? "stat-number-wrapper" : ""}>
                            <span className={`stat-number ${stat.colorClass} stat-number-${idx + 1}`}>
                                {stat.prefix || ''}0{stat.suffix || ''}
                            </span>
                        </div>
                        <div className={`stat-card ${stat.bgClass}`}>
                            <h3 className={`stat-title ${stat.titleColorClass}`}>{stat.title}</h3>
                            <p className={`stat-subtitle ${stat.titleColorClass}`}>
                                {(stat.subtitle || "").split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        {i === 0 && stat.subtitle.includes('\n') && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;
