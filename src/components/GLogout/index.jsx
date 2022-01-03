import React, { useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { Context } from '../../context/Context';
import './index.css';

const clientId = '500339813240-jji6t8hlb1va8eu0gk22bu2snogmptve.apps.googleusercontent.com';

const GLogout = () => {
    const { dispatch } = useContext(Context);
    const onSuccess = () => {
        alert('Logout made successfully !');
        dispatch({ type: "LOGOUT" });

    };

    return (
        <React.Fragment>
            <GoogleLogout
                className="g-logout"
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </React.Fragment>
    );
};

export default GLogout;
