import React, { useEffect, useState } from 'react'
import Post from './Post';
import socketIo from 'socket.io-client';
// import MessageBox from './MessageBox';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  // let msgBox;

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost/posts');
        if (!response.ok) {console.log(response);
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        const thePosts = await response.json();
        setPosts(thePosts);
      } catch (err) {
        console.error(err);
        // msgBox = <MessageBox msg={err} />    useRef().current
      alert(err);
      }
    })();
  }, []);

  useEffect(() => {
    console.log('connecting socket for comments');
    const socket = socketIo.connect('http://localhost');
    socket.on('comment', commentData => {
      console.log(commentData);

      const newPosts = [...posts];
      const index = posts.findIndex(p => p._id === commentData.postId);
      const thePost = newPosts[index] = { ...newPosts[index] };
      thePost.comments = thePost.comments || [];
      thePost.comments.push(commentData.comment);

      setPosts(newPosts);
    });

    return () => {
      console.log('disconnecting socket for comments');
      socket.disconnect();
    }
  }, [posts]);

  useEffect(() => {
    console.log('connecting socket for post');
    const socket = socketIo.connect('http://localhost');
    socket.on('post', post => {
      console.log(post);
      const newPosts = [...posts];
      newPosts.push(post);
      setPosts(newPosts);
    });

    return () => {
      console.log('disconnecting socket for post');
      socket.disconnect();
    }
  }, [posts]);

  return (
    <div>
      {/* {msgBox} */}
      {posts.map(p => <Post key={p._id} post={p} />)}
    </div>
  )
}
