import React, {useState, useEffect} from 'react';
import Comment from './Comment';
// import {useParams} from 'react-router-dom';
import Fetch from './Fetch';

function Comments ({postId/*, setMsg*/}) {
    const [comments, setComments] = useState([]);

    // let {postId} = useParams();

    useEffect(() => {
        Fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`, setComments/*, setMsg*/);
    }, [postId/*, setMsg*/]);

    return (
        <div>
            Comments Showing
            {comments.map(c => <Comment comment={c} key={c.id} /> )}
        </div>
    );
    }

export default Comments;