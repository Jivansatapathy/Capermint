import React from 'react';

const FeaturedArticlesSection = ({ content }) => {
    // Fallback safely if content or content.articles hasn't loaded
    const articlesData = content?.articles || {
        title: "FEATURED ARTICLES",
        subtitle: "NEWS UPDATES AND STORIES FROM RUNNER RUNNER",
        items: []
    };

    return (
        <section className="articles-section">
            <div className="articles-header">
                <h2 className="articles-heading">{articlesData.title}</h2>
                <p className="articles-subheading">{articlesData.subtitle}</p>
            </div>

            <div className="articles-container">
                {articlesData.items.map((article, idx) => (
                    <div className="article-card" key={idx}>
                        <div className="article-image-wrapper">
                            <img src={article.image} alt={article.title} className="article-image" />
                        </div>
                        <div className="article-content">
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-desc">{article.desc}</p>
                            <p className="article-date">{article.date}</p>
                            <a href={article.link || '#'} className="article-link">
                                READ MORE <span className="arrow">→</span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {articlesData.items.length > 0 && (
                <div className="articles-footer">
                    <button className="view-all-btn">VIEW ALL ARTICLES</button>
                </div>
            )}
        </section>
    );
};

export default FeaturedArticlesSection;
