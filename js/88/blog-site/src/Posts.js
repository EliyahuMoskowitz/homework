import React, { useState, useEffect } from 'react';
import {Link, useParams} from 'react-router-dom';
import Post from './Post';
import Fetch from './Fetch';

function Posts ({users/*, setMsg*/}) {
    const [posts, setPosts] = useState([]);
    const {userId} = useParams();
    
    let userName = users.find(u => u.id === +userId).name;

    useEffect(() => {
        Fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, setPosts/*, setMsg*/);
    }, [userId/*, setMsg*/]);

    return (
        <div>
            <h3 className="text-center text-success" >{userName}'s Blog</h3>
            <Link to="/home" id="backButton" >Back to all Blogs</Link>
            {posts.map(p => <Post key={p.id} post={p} /*setMsg={setMsg} /*userId={userId}*/ />)}
        </div>
    );
}

export default Posts;