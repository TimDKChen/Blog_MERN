import { Link } from 'react-router-dom';
import PF from '../../static/static';
import './index.css';

const Post = ({ post }) => {
    return (
        <div className="post">
            {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
            <div className="postInfo">
                <Link to={`/post/${post._id}`} className="link">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <span className="postAuthor">Author: {post.username}</span>
                <p className="postDesc">{post.description}</p>
                <div className="postCats">
                    {post.categories.map((c, index) => (
                        <span className="postCat" key={index}>{c}</span>
                    ))}
                    <span className="postDate">
                        {new Date(post.timestamps).toDateString()}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Post;
