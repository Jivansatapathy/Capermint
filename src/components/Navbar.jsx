import React, { useState, useEffect } from 'react';

const Navbar = ({ nav, navbar }) => {
    const nb = navbar || {
        logo: "/assets/Runnerlogo.png",
        googlePlay: "/assets/Google Store download button.png",
        appStore: "/assets/App Store download button.png"
    };
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
                <div className="logo">
                    <img src={nb.logo} alt="Runner Runner Logo" className="main-logo" />
                </div>

                {/* Nav links – centred */}
                <div className="nav-links">
                    {nav && nav.map((item, i) => {
                        let linkPath = `#${item.toLowerCase().replace(/\s+/g, '-')}`;
                        if (item === 'HOME') linkPath = '/';
                        if (item === 'CHARACTERS') linkPath = '/characters';
                        if (item === 'POWERUPS') linkPath = '/powerplay';

                        return (
                            <a key={i} href={linkPath}>
                                {item}
                            </a>
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
