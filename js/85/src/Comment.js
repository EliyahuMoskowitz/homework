import $ from 'jquery';

export default class Comment{
    constructor({name, email, body, id}, post, button/*, theClickedPost*/){
        this.name= name;
        this.email = email;
        this.body = body;
        this.id = id;
        this.post = post;
        this.button = button;
        // this.showingComment = true;

        // if(!Comment.thisClickedBlog){Comment.thisClickedBlog = theClickedPost}
    }

    showComment(areCommentsShowing){
        let commentDiv = $('<main id="commentDiv"></main>').appendTo(this.post);
        /*let comment = */$(`<section id="commentSection"><span id="name">Name: </span>${this.name}<br/><span id="email">e-mail: </span>${this.email}<br/><span id="comment">Comment: </span>${this.body}</section>`)
               .append($('<hr/>')).appendTo(commentDiv /*Comment.theClickedPost*/);

        this.button.on('click', () => {
            if(areCommentsShowing){
                commentDiv.hide();  //comment.hide();
                areCommentsShowing = false;
                this.button.text('Show Comments');  //this.innerText = 'Show Comments'; if reg func
                this.button.attr('id', 'commentButton');
                // this.button.css('color', 'chartreuse');
            }else{
                commentDiv.show();  //comment.show();
                areCommentsShowing = true;
                this.button.text('Hide Comments');  //this.innerText = 'Hide Comments';  if reg func
                this.button.attr('id', 'hideComments');
                // this.button.css('color', 'orange');
            }
        });
    }
}