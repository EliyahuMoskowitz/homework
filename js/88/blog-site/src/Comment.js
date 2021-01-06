import React from 'react';

function Comment ({comment: {name, email, body}}) {

        return (
            <main id="commentDiv" >
                <section id="commentSection"><span id="name">Name:  </span>{name}<br/><span id="email">
                    e-mail: </span>{email}<br/><span id="comment">Comment: </span>{body}</section><hr/>
            </main>
        );
}

export default Comment;