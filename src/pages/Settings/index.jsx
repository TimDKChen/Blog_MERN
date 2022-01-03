import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import Sidebar from '../../components/Sidebar';
import PF from '../../static/static';
import './index.css';

const Settings = () => {
    const { user, isFetching, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.name);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSumbit = async (event) => {
        event.preventDefault();
        if (username === "" || password === "") {
            alert("Setting could not be empty!!!");
            return;
        };
        dispatch({ type: "UPDATE_START" });
        const updatedUser = {
            userId: user._id,
            username,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            // blob type file
            // console.log('settings:', URL.createObjectURL(file));
            // console.log('data:', data.file, data.name);
            // 1. upload file
            try {
                await axios.post("/upload", data);
            } catch (err) {};
        };
        // 2. uppload data
        try {
            const res = await axios.put("/users/" + user._id, updatedUser);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
            alert("Update user's detail successfully!");
            navigate("/", { replace: true });
            return;
        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
            alert("Fail to update user's details!");
            return;
        }
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSumbit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file): PF+user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ outline: "none" }}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ outline: "none" }}
                    />
                    <button className="settingsSumbit" type="sumbit" disabled={isFetching}>Update</button>
                </form>
            </div>
            <Sidebar />
        </div>
    );
};

export default Settings;
