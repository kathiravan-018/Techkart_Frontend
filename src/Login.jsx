import './Signup.css';
import techkart from './images/Techkart.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/login/',
                {
                    username,
                    password
                }
            );

            localStorage.setItem('username', username);

            setMessage(response.data.message);
            setIsSuccess(true);
            setShowMessage(true);

            setTimeout(() => {
                navigate('/');
            }, 1500);

        } catch (error) {
            setMessage('❌ Invalid Username or Password!');
            setIsSuccess(false);
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }
    };

    return (
        <div className='bg-danger main-container'>

            <div className='signup-logo'>
                <img src={techkart} alt="logo" />
            </div>

            <div className="signup-page">

                <div className="signup-details">

                    <h2 className='mb-4'>Login</h2>

                    {showMessage && (
                        <div
                            style={{
                                backgroundColor: isSuccess ? '#28a745' : '#dc3545',
                                color: 'white',
                                padding: '12px',
                                borderRadius: '10px',
                                marginBottom: '15px',
                                textAlign: 'center',
                                fontWeight: 'bold'
                            }}
                        >
                            {message}
                        </div>
                    )}

                    <label htmlFor="username">
                        Enter your Name :
                    </label>

                    <input
                        type="text"
                        id="username"
                        className='search-box mb-3'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="password">
                        Enter your Password :
                    </label>

                    <input
                        type="text"
                        id="password"
                        className='search-box mb-3'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="button"
                        className="btn btn-warning mt-4 rounded-pill"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                </div>

            </div>

        </div>
    );
}