import React, {useState/*, useEffect*/} from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
// import {useParams} from 'react-router-dom';
// import Fetch from './Fetch';

function Comments ({postId, comments/*, setMsg*/}) {
    let [commentsArea, setComments] = useState([]);
    // let {postId} = useParams();
    // useEffect(() => {
    //     Fetch(`http://localhost/${postId}`, setComments/*, setMsg*/);
    // }, [postId/*, setMsg*/]);
        let showComments = commentsArea = comments ? comments.map((c, i) => <Comment comment={c} key={i} />) : null,
                addComment = <AddComment postId={postId} setComments={setComments} showComments={showComments}/>;
        

    return (
        <div>
            Comments Showing
            <button onClick={() => setComments(addComment)}> Add Comment</button> 
            {commentsArea }
        </div>
    );
    }

export default Comments;