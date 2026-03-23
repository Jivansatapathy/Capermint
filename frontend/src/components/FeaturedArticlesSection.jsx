import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticlesSection = ({ content }) => {
    // Shared data source with the Blog page
    const briefingsData = content?.briefings || {};

    // Use a subset or all items for the featured section
    const displayItems = (briefingsData.items || []).slice(0, 3);

    return (
        <section className="articles-section">
            <div className="articles-header">
                <h2 className="articles-heading">{briefingsData.title || ""}</h2>
                <p className="articles-subheading">{content?.articles?.subheading || ""}</p>
            </div>

            <div className="articles-container">
                {displayItems.length === 0 && <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', width: '100%' }}>Stay tuned for the latest updates!</p>}
                {displayItems.map((article, idx) => (
                    <div className="article-card" key={article.id || idx}>
                        <div className="article-image-wrapper">
                            <img src={article.image} alt={article.title} className="article-image" />
                        </div>
                        <div className="article-content">
                            <h3 className="article-title">{article.title}</h3>
                            <p className="article-desc">{article.desc}</p>
                            {article.date && <p className="article-date">{article.date}</p>}
                            <Link to={`/blog/${article.id}`} className="article-link">
                                READ MORE <span className="arrow">→</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="articles-footer">
                <Link to="/blog">
                    <button className="view-all-btn">{content?.articles?.viewAllText || ""}</button>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedArticlesSection;
