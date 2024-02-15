import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { z } from 'zod'; 

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errors, setErrors] = useState({}); // State to hold validation errors

    const schema = z.object({
        name: z.string().min(5, "at least 5 characters"),
        email: z.string().email("enter valid email address"),
        password: z.string().min(6)
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            schema.parse({
                name,
                email,
                password
            });


            axios.post('http://localhost:3000/register', { name, email, password })
                .then(result => {
                    console.log(result);
                    const { token } =result.data;
                    localStorage.setItem('item', token);
                    alert("Registration successful");
                })
                .catch(error => console.log(error.result.data));
            
                localStorage.setItem('registered', 'true');
                navigate('/login');

        } catch (error) {
            
            
            setErrors(error.errors.reduce((acc, curr) => {
                acc[curr.path[0]] = curr.message;
                return acc;
            }, {}));
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 ">
            <div className="bg-white p-3 rounded w-250">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label>
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>

                    <div className="mb-3">
                        <label>
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            className="form-control rounded-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
                <p>Already have an account</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
