import React, { useState, useEffect } from 'react';

const Navbar = ({ nav }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                setIsVisible(false);
            } else {
                // Scrolling up
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
                    <img src="/assets/Runnerlogo.png" alt="Runner Runner Logo" className="main-logo" />
                </div>

                {/* Nav links – centred */}
                <div className="nav-links">
                    {nav && nav.map((item, i) => (
                        <a key={i} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
                            {item}
                        </a>
                    ))}
                </div>

                {/* Right side: language + divider + store buttons */}
                <div className="nav-right">
                    <div className="lang-selector">
                        ENG <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>▼</span>
                    </div>
                    <div className="nav-divider" />
                    <div className="store-buttons">
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/Google Store download button.png" alt="Google Play" />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/App Store download button.png" alt="App Store" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
