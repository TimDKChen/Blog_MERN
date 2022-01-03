import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import Posts from '../../components/Posts';
import Sidebar from '../../components/Sidebar';
import './index.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();

    // URLSearchParams function
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("/posts" + search);
            setPosts(res.data);
        };
        fetchPosts();
    }, [search]);

    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar/>
            </div>
        </>
    );
};

export default Home;
