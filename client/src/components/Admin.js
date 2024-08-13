import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/admin.css';

const Admin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:4000/admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to login');
            });
    };
    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Логин:
                        <input
                            className={'input_reg'}
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Пароль:
                        <input
                            className={'input_reg'}
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <button className={'reg'} type="submit">Вход</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Admin;