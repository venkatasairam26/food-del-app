import './index.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import appUrl from '../context/storeContext';


const Login = (props) => {
    const { history } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const setToken = (token) => {
        Cookies.set('jwt_token', token, { expires: 1 });
        history.replace('/');
    }

    const onSubmitForm = async (event) => {
        event.preventDefault();

        const url = `${appUrl}/login`;
         try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const contentType = response.headers.get("Content-Type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            }
            if (response.ok) {
                const { jwtToken } = data;
                setToken(jwtToken);
            } else {
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network Error: Unable to reach server");
        }

        setEmail('');
        setPassword('');
    };


    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={onSubmitForm} >
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
                <button type="submit">Login</button>
                <button
                    type="button"
                    onClick={() => history.push('/register')}>Sign Up</button>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default Login;