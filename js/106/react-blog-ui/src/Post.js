import React/*, {useState}*/ from 'react';
// import AddComment from './AddComment';
import Comments from './Comments';
// import { Link } from 'react-router-dom';

function Post ({ post/*: {title, body, _id, comments}/*, setMsg/*, userId*/}) {
let [p] = post;
let {title, body, _id, comments} = p;
    // const [areCommentsShowing, setCommentsShowing] = useState();
    // let text = areCommentsShowing ? 'Hide' : 'Show';
    // let url = areCommentsShowing ? `/posts/${userId}/` : `/posts/${userId}/${id}`;

    let commentDiv = /*comments ?*/ <Comments postId={_id} comments={comments} key={_id} /*setMsg={setMsg}*/ />;// : null;

        return (
            <div>
                <section id="thePost"><span id="title">Title: </span>{title}<br/><span id="post">Post: </span>
                    <aside>{body}</aside>
                    {/* <button  id={`${text}Comments`}  onClick={() => setCommentsShowing(!areCommentsShowing)} > {text} Comments</button>  */}
                   
                         {commentDiv}
                </section><hr/>
            </div>
        );
    }


export default Post;