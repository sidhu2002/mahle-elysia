import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3000/login', { email, password })
            .then(result => {
                console.log(result);
                const { token } = result.data;
                localStorage.setItem('token' , token);
                navigate('/home'); e
            })
            .catch(err => {
                console.error(err);
                setErrorMessage("wrong user credentials.");
            });
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-250">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label><strong>Email</strong></label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}

                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
