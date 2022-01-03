import axios from 'axios';
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { BASE_URL } from '../../static/static';
import './index.css';

const Register = () => {
    const [error, setError] = useState('');
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cpasswordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const cpassword = cpasswordRef.current.value;
        dispatch({type: "REGISTER_START"});
        if (username === '' || email === '' || password === '' || cpassword === '') {
            setError('Please fill the form!');
            return;
        } else if (password !== cpassword) {
            setError('Password must be equal to confirmed password!');
            return;
        }
        try {
            await axios.post(`${BASE_URL}/auth/register`, {
                username,
                email,
                password
            });
            setError('');
            alert('Sign up successfully!');
            // delay 3s
            setTimeout(3000);
            navigate("/login", { replace: true });
            dispatch({type: "REGISTER_SUCCESS"});
        } catch (err) {
            // console.log('111', err.response.data.error);
            setError(err.response.data.error);
            dispatch({type: "REGISTER_FAILURE"});
            return;
        };
    };

    const passEye = () => {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
        } else {
            passwordRef.current.type = 'password'; 
        }
    };

    const cpassEye = () => {
        if (cpasswordRef.current.type === 'password') {
            cpasswordRef.current.type = 'text';
        } else {
            cpasswordRef.current.type = 'password'; 
        }
    };

    return (
        <div className="register">
            <div className="register-text">
                <hr/><span>Sign up</span><hr/>
            </div>
            <div className="register-form">
                <form onSubmit={handleRegister}>
                <div className="form-floating mb-3">
                    <input ref={usernameRef} type="text" className="form-control" id="floatingUsername"/>
			      	<label htmlFor="floatingUsername">Username</label>
                </div>
                <div className="form-floating mb-3">
                    <input ref={emailRef} type="email" className="form-control" id="floatingEmail" placeholder="name@example.com"/>
			      	<label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating mb-3 position-relative">
                    <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
			      	<label htmlFor="floatingPassword">Password</label>
                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password pass-eye" onClick={passEye}></span>
                </div>
                <div className="form-floating mb-1 position-relative">
                    <input ref={cpasswordRef} type="password" className="form-control" id="floatingCPassword" placeholder="Password"/>
			      	<label htmlFor="floatingCPassword">Confirmed Password</label>
                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password pass-eye" onClick={cpassEye}></span>
                </div>
                <div className="login-error">
                    <span>{error}</span>
                </div>
                <button id="register-button" className="w-100 btn btn-lg btn-primary mt-3 mb-3" type="sumbit" disabled={isFetching}>Sign up</button>
                </form>
            </div>
            <p className="text-center">Already a member ?&nbsp;<Link to="/login">Log In</Link></p>
        </div>
    );
};

export default Register;
