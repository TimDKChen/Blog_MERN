import Post from '../Post';
import './index.css';

const Posts = ({ posts }) => {
    return (
        <div className="posts">
            {posts.map((p, index) => (
                <Post post={p} key={index} />
            ))}
        </div>
    );
}

export default Posts;
