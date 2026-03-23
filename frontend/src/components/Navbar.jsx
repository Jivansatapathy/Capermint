import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ nav, navbar }) => {
    const nb = navbar || {};
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav className={`navbar ${!isVisible ? 'navbar-hidden' : ''}`}>
            <div className="nav-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <img src={nb.logo} alt="Runner Runner Logo" className="main-logo" />
                </Link>

                {/* Nav links – centred */}
                <div className="nav-links">
                    {(nav || []).map((item, i) => {
                        let linkPath = `/#${item.toLowerCase().replace(/\s+/g, '-')}`;
                        if (item === 'HOME') linkPath = '/';
                        if (item === 'CHARACTERS') linkPath = '/characters';
                        if (item === 'POWERUPS') linkPath = '/powerplay';
                        if (item === 'MAPS') linkPath = '/maps';
                        if (item === 'BLOG') linkPath = '/blog';
                        if (item === 'SUPPORT') linkPath = '/contact';
                        if (item === 'TESTIMONIALS') linkPath = '/testimonials';
                        if (item === 'FAQ') linkPath = '/faq';

                        const isExternal = linkPath.startsWith('http') || linkPath.includes('#');
                        
                        if (isExternal && location.pathname === '/') {
                            return (
                                <a key={i} href={linkPath}>
                                    {item}
                                </a>
                            );
                        }

                        return (
                            <Link key={i} to={linkPath}>
                                {item}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side: language + divider + store buttons */}
                <div className="nav-right">
                    <div className="lang-selector">
                        ENG <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>▼</span>
                    </div>
                    <div className="nav-divider" />
                    <div className="store-buttons">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src={nb.googlePlay} alt="Google Play" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src={nb.appStore} alt="App Store" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
