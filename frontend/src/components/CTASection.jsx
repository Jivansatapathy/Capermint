import React from 'react';

const CTASection = ({ content }) => {
    const rawData = content?.cta;
    const defaultSocialLinks = [];

    const data = {
        subtitle: rawData?.subtitle || "",
        title: rawData?.title || "",
        description: rawData?.description || "",
        image: rawData?.image || null,
        socialLinks: rawData?.socialLinks || defaultSocialLinks
    };

    return (
        <section className="cta-section">
            <div className="cta-container">
                <div className="cta-image-wrapper">
                    <img src={data.image || null} alt="Runner Runner Characters" className="cta-image" />
                </div>

                <div className="cta-content">
                    <p className="cta-subtitle">{data.subtitle}</p>
                    <h2 className="cta-title">{data.title}</h2>
                    <p className="cta-desc">{data.description}</p>

                    <div className="cta-social-links">
                        {data.socialLinks.map((link, idx) => (
                            <a key={idx} href={link.url} className="social-link" aria-label={link.label}>
                                <div className="social-icon">
                                    <img src={link.icon || null} alt={link.label} className="social-img" />
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
