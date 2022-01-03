import axios from 'axios';
import { BASE_URL } from '../../static/static';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const Sidebar = () => {
    const [cats, setCats] = useState([]);

    useEffect(() => {
        const getCats = async () => {
            const res = await axios(`${BASE_URL}/categories`);
            setCats(res.data);
        };
        getCats();
    }, []);
    
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                   src="https://blog-api2021.herokuapp.com/images/wechat_qr.jpg"
                   alt="" 
                />
                <p>
                    Please contact me with this QR code. 😀 <br />
                    <br />
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
                    necessitatibus nostrum illum reprehenderit.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map((c, index) => (
                        <Link to={`/?cat=${c.name}`} className="link" key={index}>
                        <li className="sidebarListItem">{c.name}&nbsp;&nbsp;&nbsp;</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook-square"></i>
                    <i className="sidebarIcon fab fa-twitter-square"></i>
                    <i className="sidebarIcon fab fa-pinterest-square"></i>
                    <i className="sidebarIcon fab fa-instagram-square"></i>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
