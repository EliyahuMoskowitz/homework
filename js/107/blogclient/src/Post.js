import './Post.css';
import React, { useState } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';

export default function Post({ post }) {
  const [addingComment, setAddingComment] = useState(false);
  const endCommenting = () => setAddingComment(false);

  const content = addingComment ? <AddComment onEndCommenting={endCommenting} postId={post._id} /> : <button className="addcomment" onClick={() => setAddingComment(true)}>add comment</button>;

  const comments = post.comments ? post.comments.map((c, i) => <Comment key={i} comment={c} />) : null;

  return (
    <div className="post" id={post._id}>
      <h2>{post.title}</h2>
      <h3>by {post.author} on {new Date(post.date).toLocaleString()}</h3>
      <div>{post.body}</div>

      <div className="comments">
        {content}
        {comments}
      </div>
    </div>
  )
}
