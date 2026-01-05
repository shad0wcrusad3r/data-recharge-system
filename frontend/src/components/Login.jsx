import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleAuth = async (e) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setErrorMessage('Please enter both username and password');
            return;
        }

        const endpoint = isLogin ? '/auth/login' : '/auth/signup';

        try {
            const response = await fetch(`http://localhost:5000${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                if (isLogin) {
                    localStorage.setItem('username', data.username);
                    navigate('/plans');
                } else {
                    alert('Account created! Please login.');
                    setIsLogin(true);
                }
            } else {
                setErrorMessage(data.message || 'Authentication failed');
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('Server error');
        }
    };

    return (
        <div className="container" style={{ marginTop: '50px' }}>
            <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
            <form onSubmit={handleAuth} className="user-input">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ display: 'block', margin: '0 auto 10px', padding: '10px' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ display: 'block', margin: '0 auto 10px', padding: '10px' }}
                />
                <button type="submit" style={{ width: '200px' }}>
                    {isLogin ? 'Login' : 'Sign Up'}
                </button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <p style={{ marginTop: '20px' }}>
                {isLogin ? "New user? " : "Already have an account? "}
                <span
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage('');
                        setUsername('');
                        setPassword('');
                    }}
                >
                    {isLogin ? 'Create Account' : 'Login here'}
                </span>
            </p>
        </div>
    );
}

export default Login;
