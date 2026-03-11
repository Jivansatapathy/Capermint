import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import CharactersPage from './pages/CharactersPage';
import Powerplay from './pages/Powerplay';
import Contact from './pages/Contact';

const defaultNav = ['HOME', 'CHARACTERS', 'POWERUPS', 'BLOG', 'SUPPORT'];

function App() {
    const [content, setContent] = useState({ nav: defaultNav });

    useEffect(() => {
        axios.get('http://localhost:3000/api/content')
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent(res.data);
                }
            })
            .catch(() => {
                // Backend is locally offline
            });
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/characters" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <CharactersPage />
                    </>
                } />
                <Route path="/powerplay" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Powerplay />
                    </>
                } />
                <Route path="/contact" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Contact />
                    </>
                } />
                <Route path="*" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Home />
                    </>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
