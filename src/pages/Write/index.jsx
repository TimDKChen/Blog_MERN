import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { BASE_URL } from '../../static/static';
import { Context } from '../../context/Context';
import './index.css';

const Write = () => {
    const [cat, setCat] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);

    useEffect(() => {
        const catArray = async () => {
            let temp = [];
            const cats = await axios.get(`${BASE_URL}/categories`);
            cats.data.forEach(element => {
                temp.push(element.name);
            });
            setCat(temp);
        };
        catArray();
    }, []);

    const handleSumbit = async (event) => {
        event.preventDefault();
        // categories can not be empty
        const writeCat = cat.filter((c) => {
            let tempId = 'checkbox' + c;
            let temp = document.getElementById(`${tempId}`);
            return temp.checked;
        });
        if (file === null || title === "" || desc === "" || writeCat === []) {
            alert("Please fill your form !!!");
            return;
        }
        const newPost = {
            username: user.username,
            title: title,
            description: desc,
            categories: writeCat
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post(`${BASE_URL}/upload`, data);
            } catch (err) {};
        };
        // axios config
        const config = {
            headers: {
                'Authorization': 'Bearer ' + user.token,
            }
        };
        try {
            const res = await axios.post(`${BASE_URL}/posts`, newPost, config);
            alert("Create a post successfully!");
            window.location.replace("/post/" + res.data._id);
        } catch (err) {};
    };

    return (
        <div className="write">
            {file && (<img className="writeImg" src={URL.createObjectURL(file)} alt="" />)}
            <form className="writeForm" onSubmit={handleSumbit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input
                        type="file" 
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <input
                        type="text"
                        placeholder="Title"
                        className="writeInput"
                        autoFocus={true}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        placeholder="Tell your story"
                        type="text"
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}
                    ></textarea>
                </div>
                <div className="writeCategories">
                    {cat.length !== 0 && cat.map((c, index) => (
                        <div key={index} style={{ marginRight: "10px" }}>
                            <input type="checkbox" id={'checkbox'+c} value={c}/>{c}
                            <label htmlFor={'checkbox'+c}></label>
                        </div>
                    ))}
                </div>
                <button className="writeSumbit btn btn-primary" type="sumbit">Publish</button>
            </form>
        </div>
    );
};

export default Write;
