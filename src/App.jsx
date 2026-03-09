import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';

const defaultNav = ['HOME', 'GAME FEATURES', 'POWERUPS', 'BLOG', 'SUPPORT'];

function App() {
    const [nav, setNav] = useState(defaultNav);

    useEffect(() => {
        axios.get('http://localhost:3000/api/content')
            .then(res => setNav(res.data.nav))
            .catch(() => {
                // Backend is locally offline; using defaultNav
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="*" element={
                    <>
                        <Navbar nav={nav} />
                        <Home />
                    </>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
