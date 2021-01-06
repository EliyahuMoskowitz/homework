import React, {useState} from 'react';
import Comments from './Comments';
// import { Link } from 'react-router-dom';

function Post ({ post: {title, body, id}/*, setMsg/*, userId*/}) {

    const [areCommentsShowing, setCommentsShowing] = useState();
    let text = areCommentsShowing ? 'Hide' : 'Show';
    // let url = areCommentsShowing ? `/posts/${userId}/` : `/posts/${userId}/${id}`;

    let commentDiv = areCommentsShowing ? <Comments postId={id} /*setMsg={setMsg}*/ /> : null;

        return (
            <div>
                <section id="thePost"><span id="title">Title: </span>{title}<br/><span id="post">Post: </span>
                    <aside>{body}</aside><button /*Link*/ id={`${text}Comments`} /*to={url}*/ onClick={() => setCommentsShowing(!areCommentsShowing)} >
                        {text} Comments</button>    {commentDiv}
                </section><hr/>
            </div>
        );
    }


export default Post;