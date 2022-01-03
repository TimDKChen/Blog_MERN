import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import { BASE_URL } from '../../static/static';
import Search from '../Search';
import GLogout from '../GLogout';
import Icon from '../../static/blogging.png'
import BookData from '../../static/Data.json';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useContext(Context);
    // const PF = "http://localhost:5000/images/";
    const navigate = useNavigate();

    const handleLogout = async () => {
        // axios config
        const config = {
            headers: {
                'Authorization': 'Bearer ' + user.token,
            }
        };
        await axios.post(`${BASE_URL}/auth/logout`, { email: user.email }, config);
        dispatch({ type: "LOGOUT" });
        navigate('/', { replace: true, });
    }
    const handleSettings = () => {
        navigate('/settings', { replace: true, });
    }
    const handleUpload = () => {
        navigate('/write', { replace: true, });
    }
    const handleOpen = (event) => {
        event.stopPropagation();
        setOpen(!open);
        document.addEventListener('click', (event) => {
            setOpen(false);
        });
    }
    const handleLogin = () => {
        navigate('/login', { replace: true, });
    }
    const handleRegister = () => {
        navigate('/register', { replace: true, });
    }
    // console.log('user:', user);
    return (
        <div className="nav">
            <div className="nav-left">
                <Link to="/">
                    <img className="nav-icon" src={Icon} alt="Home" />
                </Link>
            </div>
            <div className="nav-center">
                <Search data={BookData}/>
            </div>
            {user === null && <div className="nav-log">
                <div className="nav-log-left">
                    <Link className="link" to="/login">
                        Log In
                    </Link>
                </div>
                <div className="nav-log-right">
                    <Link className="link" to="/register">
                        Sign Up
                    </Link>
                </div>
            </div>}
            <div className="nav-right">
                <div className="nav-right-avatar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" 
                        fill="currentColor" className="bi bi-person" viewBox="0 0 16 16"
                        onClick={handleOpen}
                    >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                </div>
                {open && <div className="nav-right-menu">
                    {user ? (
                        <React.Fragment>
                            <div className="nav-list-item" onClick={handleUpload}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-upload" viewBox="0 0 16 16">
                            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                            <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                            </svg>&nbsp;&nbsp;&nbsp;&nbsp;Upload
                            </div>
                            <div className="nav-list-item" onClick={handleSettings}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                            </svg>&nbsp;&nbsp;&nbsp;&nbsp;Settings
                            </div>
                            {user.googleId ? (
                                <GLogout />
                            ) : (
                                <div className="nav-list-item" onClick={handleLogout}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                <path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>&nbsp;&nbsp;&nbsp;&nbsp;Logout
                                </div>)}
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="nav-list-item" onClick={handleLogin}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"/>
                                <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                </svg>&nbsp;&nbsp;&nbsp;&nbsp;Log In
                            </div>
                            <div className="nav-list-item" onClick={handleRegister}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>&nbsp;&nbsp;&nbsp;&nbsp;Sign Up
                            </div>
                        </React.Fragment>
                    )}
                </div>}  
            </div>
        </div>
    );
};

export default Navbar;
