import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import "./LoginForm.css";

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Navigate to="/" />;

    const handleSubmit = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password })).catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };

    const quickLog = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(
            sessionActions.login({ email: "Askeland.Eric@gmail.com", password: "password" })
        ).catch(async res => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Log In</button>
            <button type="button" onClick={quickLog}>
                Quick Log
            </button>
        </form>
    );
}

export default LoginFormPage;
