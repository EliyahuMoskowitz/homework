(function (){
'use strict';

    const addComment = $('#addComment'), saveComment = $('#saveComment'), commentForm = $('#commentForm'),
             subject = $('#subject'), comment = $('#comment'), author = $('#author');//,  id = $('#id');

    let thisPostId;
    addComment.on('click', e => {
        commentForm.css('display', 'block');
        thisPostId = e.target.value;
    });

    saveComment.on('click', async e => {
        e.preventDefault();
        commentForm.css('display', 'none');

        await fetch('/addComment', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                subject: subject.val(),
                comment: comment.val(),
                author: author.val(),
                postId: thisPostId
            })
        });
    });

})();






/*

<!-- {{!-- <form id="commentForm">
  <label>author:
    <input id="author">
  </label>
  <label>Subject:
    <input id="subject">
  </label>
  <label>Comment:
    <textarea id="comment"></textarea>
  </label>
  <input type="hidden" id="id" value="{{id}}">
  <button id="saveComment">save comment</button>
  {{!-- <button id="cancel">cancel</button> --}}
</form> --}}

  {{!-- <a href="/addComment" >add comment</a> --}}
  {{!-- {{#noPosts}}
  <section>Be the first to leave a comment!</section> 
  {{/noPosts}} --}}
  {{!-- {{#comments}} --}}
    {{!-- {{.}} --}}
  {{!-- {{comments}} --}} -->*/