import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const defaultNav = ['HOME', 'GAME FEATURES', 'POWERUPS', 'BLOG', 'SUPPORT'];

function App() {
    const [nav, setNav] = useState(defaultNav);

    useEffect(() => {
        axios.get('http://localhost:3000/api/content')
            .then(res => setNav(res.data.nav))
<<<<<<< HEAD
            .catch(() => { }); // use defaultNav already set
=======
            .catch(() => {
                // Backend is locally offline; using defaultNav
            });
>>>>>>> 4f0f341 (Updated GameModes and Section10 styling)
    }, []);

    return (
        <>
            <Navbar nav={nav} />
            <Home />
        </>
    );
}

export default App;
