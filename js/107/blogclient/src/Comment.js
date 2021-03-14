import './Comment.css';
import React from 'react';

export default function Comment({ comment }) {
  return (
    <>
      <h2>{comment.body}</h2>
      <h3>by {comment.author} on {new Date(comment.date).toLocaleString()}</h3>
    </>
  );
}
