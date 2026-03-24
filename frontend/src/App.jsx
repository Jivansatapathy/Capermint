import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api_config';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminPage from './pages/AdminPage';
import CharactersPage from './pages/CharactersPage';
import Powerplay from './pages/Powerplay';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Faq from './pages/Faq';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Maps from './pages/Maps';
import AuthPage from './pages/AuthPage';


const defaultNav = [];

function App() {
    const [content, setContent] = useState({ nav: defaultNav });
    const [backendOffline, setBackendOffline] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        axios.get(API_URL, config)
            .then(res => {
                if (res.data && Object.keys(res.data).length > 0) {
                    setContent(res.data);
                    setBackendOffline(false);
                }
            })
            .catch(() => {
                setBackendOffline(true);
            });
    }, []);

    const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem('adminToken'));

    const ProtectedRoute = ({ children }) => {
        if (!isAuthed) return <AuthPage onLogin={() => setIsAuthed(true)} />;
        return children;
    };

    const BackendNotice = () => (
        <div style={{
            background: '#ff4444',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            fontWeight: 'bold',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
            ⚠️ ATTENTION: BACKEND SERVER IS NOT STARTED! USING LOCAL OFFLINE DATA.
        </div>
    );

    return (
        <BrowserRouter>
            {backendOffline && <BackendNotice />}
            <Routes>
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
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
                <Route path="/testimonials" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Testimonials />
                    </>
                } />
                <Route path="/faq" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Faq />
                    </>
                } />
                <Route path="/maps" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Maps />
                    </>
                } />
                <Route path="/blog" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <Blog />
                    </>
                } />
                <Route path="/blog/:id" element={
                    <>
                        <Navbar nav={content.nav} navbar={content.navbar} />
                        <BlogDetail />
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
