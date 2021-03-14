import React from 'react';
// import Fetch from './Fetch';
// import PropTypes from 'prop-types';

function AddComment({postId, setComments, showComments}) {
   async function addComment(){
    setComments(showComments);
    await fetch(`http://localhost/addComment/${postId}`, {
        method: 'POST',
        headers: {'content-type': 'applicvation/json'},
        body: JSON.stringify({body: document.getElementById('commentbody').value})
    });
   }
        return (
            <div id="addcomment">
                <textarea id="commentbody"></textarea>
                <button id="add" onClick={addComment}>add</button>
                <button id="cancel" onClick={() => setComments(showComments)}>cancel</button>
            </div>
        );
    }

// AddComment.propTypes = {};

export default AddComment;