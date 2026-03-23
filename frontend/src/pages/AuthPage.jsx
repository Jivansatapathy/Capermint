import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

const AuthPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.');
            return false;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
        
        try {
            const baseUrl = import.meta.env.VITE_API_URL || '';
            const res = await axios.post(`${baseUrl}${endpoint}`, { email, password });
            
            if (isLogin) {
                localStorage.setItem('adminToken', res.data.token);
                localStorage.setItem('adminUser', JSON.stringify(res.data.user));
                if (onLogin) {
                    onLogin(); // update reactive state in App.jsx
                } else {
                    window.location.href = '/admin';
                }
            } else {
                setIsLogin(true);
                setError('Registration successful! Please log in.');
            }
        } catch (err) {
            setError(err.response?.data || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? 'Admin Sign In' : 'Create Admin Account'}</h2>
                <p className="auth-subtitle">Welcome to the Runner Runner control center.</p>
                
                {error && <div className={`auth-error ${error.includes('successful') ? 'success' : ''}`}>{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="admin@runnerrunner.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>
                
                <div className="auth-toggle">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="toggle-link">
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
            
            <div className="auth-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
        </div>
    );
};

export default AuthPage;
