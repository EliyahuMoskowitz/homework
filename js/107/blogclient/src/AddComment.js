import './AddComment.css';
import React, { useState } from 'react'
// import MessageBox from './MessageBox';

export default function AddComment({ onEndCommenting, postId }) {
  const [commentText, setCommentText] = useState('');
  // let msgBox;

  const addComment = async () => {
    try {
      const response = await fetch(`http://localhost/posts/${postId}/comments`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ body: commentText })
      });
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
    } catch (err) {
      console.error(err);
      // msgBox = <MessageBox msg={err} />     //useRef().current
      alert(err);
    }

    onEndCommenting();
  };

  return (
    <div className="addcommentform">
      {/* {msgBox} */}
      <textarea value={commentText} onChange={e => setCommentText(e.target.value)}></textarea>
      <button onClick={addComment}>add</button>
      <button onClick={onEndCommenting}>cancel</button>
    </div>
  )
}
