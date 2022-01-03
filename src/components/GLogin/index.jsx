import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { Context } from '../../context/Context';
import { BASE_URL } from '../../static/static';
import './index.css'

const clientId = '500339813240-jji6t8hlb1va8eu0gk22bu2snogmptve.apps.googleusercontent.com';

const GLogin = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(Context);
    const onSuccess = async (res) => {
        dispatch({type: "LOGIN_START"});
        // console.log('[Login Success] currentUser:', res.profileObj);
        try {
            const response = await axios.post(`${BASE_URL}/auth/google-login`, {
                username: res.profileObj.name,
                email: res.profileObj.email,
                profilePic: res.profileObj.imageUrl
            });
            const gRes = { googleId: res.profileObj.googleId, ...response.data };
            dispatch({ type: "LOGIN_SUCCESS", payload: gRes});
            navigate('/', { replace: true });
        } catch (err) {
            // console.log('Login Failure:', err);
            alert('Glogin fail');
        };
    };

    const onFailure = (res) => {
        dispatch({ type: "LOGIN_FAILURE" });
        console.log('[Login Failure] res:', res);
    };

    return(
        <React.Fragment>
            <GoogleLogin
                className="g-login"
                clientId={clientId}
                buttonText='SIGN IN WITH GOOGLE'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </React.Fragment>
    );
};

export default GLogin;
