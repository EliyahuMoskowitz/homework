import React from 'react';

function Comment ({comment: {author, date, body}}) {

        return (
            <main id="commentDiv" >
                <section id="commentSection">
                    {/* <span id="name">Name:  </span>{name}<br/><span id="email"> */}
                    {/* e-mail: </span>{email}<br/> */}
                    <h2 id="comment">Comment: </h2>{body}</section>
                    <h3>by {{author}} on {{date}}</h3><hr/>
            </main>
        );
}

export default Comment;