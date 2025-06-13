import {  useState } from 'react';
import { useHistory }  from 'react-router-dom';
import './index.css'
import appUrl from '../context/storeContext';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
     const history = useHistory();
    
    const redirectToLogin = () => {
        history.push('/login');
    }
    

    const onClickSubmit = async (event) => {
        event.preventDefault();

        const url = `${appUrl}/register`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        });
        console.log(response)
        if (response.ok) {
            setTimeout(() =>{redirectToLogin()},3000);
            setError("Registration successful, redirecting to login...");

        } else{
            setError("user already exists");
        }

        setPassword('');
        setEmail('');
        setUsername('');

    }

  
    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={onClickSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className='register-button'>Register</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}

export default Register;