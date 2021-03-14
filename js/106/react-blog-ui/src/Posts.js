import React, { useState, useEffect } from 'react';
// import {Link, useParams} from 'react-router-dom';
import Post from './Post';
import Fetch from './Fetch';

function Posts ({setLinks}){//{users/*, setMsg*/}) {
    let [posts, setPosts] = useState([]);
    // const {userId} = useParams();
    
    // let userName = users.find(u => u.id === +userId).name;

    useEffect(() => {
        Fetch('http://localhost', setPosts/*, setMsg*/);
        // (async () => {
        //    const r = await fetch('http://localhost');
        //    const thePostsres = await r.json();
        // //    console.log(thePostsres);
        // setPosts(thePostsres.map(p => <Post key={p._id} post={p} />))
        // //    setPosts(thePostsres);
        // })();
        
        setLinks([{href: '/', text: 'home'}]);
        posts = posts.map(p => [p]);
    }, [/*userId/*, setMsg*/setLinks, setPosts]);

    
    return (
        <div>
            {/* <h3 className="text-center text-success" >{userName}'s Blog</h3> */}
            {/* <Link to="/home" id="backButton" >Back to all Blogs</Link> */}
            {posts.map(p => <Post key={p._id} /*title={p.title} body={p.body} comments={p.comments}*/ post={p} />)} 
            {/* {posts.length ? posts : null} */}
        </div>
    );
}

export default Posts;