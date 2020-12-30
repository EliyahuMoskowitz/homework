import Comment from './Comment';
import $ from 'jquery';

export default class Post{
    constructor({title, body, id}, allBlogs/*, theBlog*/){
        this.title = title;
        this.body = body;
        this.id = id;
        this.firstTimeComments = true;
        this.areCommentsShowing;

        if(!Post.allBlogs){Post.allBlogs = allBlogs}
        if(!Post.allPosts){Post.allPosts = $('<div id="allPosts"></div>').appendTo(document.body)}
        // if(!Post.thisClickedBlog){Post.thisClickedBlog = theBlog}
        if(!Post.homeLink){Post.homeLink = $('<button id="backButton">Back to all Bloggers</button>').on('click', () => {
            Post.allBlogs.show();
            Post.allPosts.remove();
            Post.allPosts = null;
            Post.homeLink = null;
            document.title = 'Our Blog!';
        }).appendTo(Post.allPosts);
    }
}

    showPost(){
 // $(document.body).empty();
        // let clickedBlog = $(Post.thisClickedBlog);
        // Post.thisClickedBlog.empty();
            let post = $(`<section id="thePost"><span id="title">Title: </span>${this.title}<br/><span id="post">Post: </span>${this.body}</section>`).appendTo(Post.allPosts/*Post.thisClickedBlog*/);
            $('<br/>').appendTo(post);
            let commentButton = $(`<button id="commentButton">${!this.commentsShowing ? 'Show' : 'Hide'} Comments</button>`).appendTo(post);
            $('<hr/>').prependTo(post);            
            commentButton.on('click', () => {
                if(this.firstTimeComments){
                    this.getComments(this.id, post, commentButton/*, this*/);
                    this.firstTimeComments = false;
                    this.areCommentsShowing = true;
                    // commentButton.remove();
                    commentButton.text('Hide Comments');
                    commentButton.attr('id', 'hideComments');
                 }
            });
    }
     
    getComments(id, post, commentButton){
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
        .then(comments => {
            if (comments.ok) {
                return comments.json();
          }
                throw new Error(`Woops! Something is wrong. You may need to Reload. ${comments.status}${comments.statusText}`);
        }).then(displayComments => {
            // let thisComments = displayComments.filter or find(c => c.id === e.target.id);//wrong. we instead only fetch the required comments
            // let newButton = $(`<button id="commentButton">Hide Comments</button>`).appendTo(post)
            displayComments.forEach(c => {
            let com = new Comment(c, post, commentButton/*newButton  /*, Post.thisClickedBlog*/); com.showComment(this.areCommentsShowing);

            });
        }).catch (err => {
            /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
            });
    }

    }