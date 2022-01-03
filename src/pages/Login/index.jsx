import axios from 'axios';
import { BASE_URL } from '../../static/static';
import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GLogin from '../../components/GLogin';
import { Context } from '../../context/Context';
import './index.css';
import PF from '../../static/static';


const Login = () => {
    const [error, setError] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        dispatch({type: "LOGIN_START"});
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email === '' || password === '') {
            setError(true);
            dispatch({ type: "LOGIN_FAILURE" });
            return;
        } else {
            setError(false);
        }
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password,
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data})
            navigate("/", { replace: true });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
            alert("LOGIN_FAILURE");
        };
    };

    const passEye = () => {
        if (passwordRef.current.type === 'password') {
            passwordRef.current.type = 'text';
        } else {
            passwordRef.current.type = 'password'; 
        }
    };

    return (
        <div className="login">
            <div className="login-top">
                <img className="login-img" src={PF+"bg-1.jpg"} alt=""/>
            </div>
            <div className="login-google">
                <GLogin />
            </div>
            <div className="login-text">
                <hr/><span>Log In</span><hr/>
            </div>
            <div className="login-form">
                <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                    <input ref={emailRef} type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
			      	<label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-1 position-relative">
                    <input ref={passwordRef} type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
			      	<label htmlFor="floatingPassword">Password</label>
                    <span toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password pass-eye" onClick={passEye}></span>
                </div>
                <div className="login-error">
                    {error && <span>Invalid Inputs!</span>}
                </div>
                <div className="form-group d-flex mb-3">
                    <div className="w-50 text-start">
                        <label className="checkbox-wrap checkbox-primary mb-0">Remember Me</label>
                        &nbsp;<input type="checkbox" defaultChecked/>
                    </div>
                    <div className="w-50 text-end">
                        <Link to="/forget-password">Forgot Password</Link>
                    </div>
                </div>
                <button id="login-button" className="w-100 btn btn-lg btn-primary mb-3" type="sumbit" disabled={isFetching}>Log In</button>
                </form>
            </div>
            <p className="text-center">Not a member ?&nbsp;<Link to="/register">Sign Up</Link></p>
        </div>
    );
};

export default Login;
