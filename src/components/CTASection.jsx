import React from 'react';

const CTASection = ({ content }) => {
    const data = content?.cta || {
        subtitle: "WANT TO STAY IN TOUCH?",
        title: "FOLLOW US ON SOCIAL MEDIA",
        description: "STAY UP-TO-DATE WITH THE LATEST IN RUNNER RUNNER.",
        socialLinks: [
            { label: "INSTAGRAM", icon: "/assets/socialiconsimg/Instagram.png", url: "#" },
            { label: "FACEBOOK", icon: "/assets/socialiconsimg/Faceebook.png", url: "#" },
            { label: "YOUTUBE", icon: "/assets/socialiconsimg/Youtube.png", url: "#" },
            { label: "X", icon: "/assets/socialiconsimg/X.png", url: "#" },
            { label: "THREAD", icon: "/assets/socialiconsimg/Threads.png", url: "#" }
        ]
    };

    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-image-wrapper">
                    <img src={data.image || "/assets/ctaimage.png"} alt="Runner Runner Characters" className="cta-image" />
                </div>

                <div className="cta-content">
                    <p className="cta-subtitle">{data.subtitle}</p>
                    <h2 className="cta-title">{data.title}</h2>
                    <p className="cta-desc">{data.description}</p>

                    <div className="cta-social-links">
                        {data.socialLinks.map((link, idx) => (
                            <a key={idx} href={link.url} className="social-link" aria-label={link.label}>
                                <div className="social-icon">
                                    <img src={link.icon} alt={link.label} className="social-img" />
                                </div>
                                <span>{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
