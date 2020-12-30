import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
// import User from './User';

// let msgDiv = $('<div></div>').appendTo(document.body), blogDiv = $('<div></div>').appendTo(document.body);

// async function getUsers() {
//     try {
//         const users = await fetch('https://jsonplaceholder.typicode.com/users');
//         if (users.ok) {
//             const displayUsers = await users.json();
//             showUsers(displayUsers);
//         } else {
//             throw new Error(`Woops! Something is wrong. ${users.status}${users.statusText}`);
//         }
//     } catch (err) {
//         /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
//     }
// }

// let thisClickedPost;

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then( users => {
      if (users.ok) {
            return users.json();
      }
            throw new Error(`Woops! Something is wrong. ${users.status}${users.statusText}`);
    }).then(displayUsers => {
        showUsers(displayUsers);
        console.log('displaying users');
    }).catch (err => {
        /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
        });
    }


function showUsers(users) {
    const theBlog = $('<div id="blogDiv"></div>').appendTo(document.body);
    // let thisClickedPost;
    users.forEach(({ name, id, website, company: { name: CName, catchPhrase: phrase, bs } }) => {
    /*let eachBlog = */$(`<main class="aBlog"><div class="text-center">${name}</div><div class="text-center">${website}</div>
        <div class="text-center">Company: </br>${CName}</br>${phrase}</br>${bs}</div></main>`)
        // thisClickedPost = eachBlog;
        /*eachBlog*/.on('click', function(){ getPosts(id, this/*eachBlog*/)}).appendTo(theBlog);
        // theBlog.append(eachBlog);
    
        // .appendTo(blogDiv);
    });
}

function getPosts(id, thePost){
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(posts => {
            if (posts.ok) {
                return posts.json();
          }
                throw new Error(`Woops! Something is wrong. ${posts.status}${posts.statusText}`);
        }).then(displayPost => {
            // let thisPost = displayPosts.filter(p => p.id === e.target.id);//wrong. we instead only fetch the required post
            showPosts(displayPost, thePost);
            console.log('displaying posts');
        }).catch (err => {
            /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
            });
}

function showPosts(posts, thePost){
    // $(document.body).empty();
    let ourPost = $(thePost); ourPost.empty();
    posts.forEach(({title, body, id}) => {
    $(`<section id="post"><span>Title: </span>${title}<br/><span>Post: </span>${body}</section>`).appendTo(thePost);
    // let didGetComments;
    let commentButton = $('<button>Show Comments</button>');
    // if(!didGetComments){
        commentButton.on('click', function(){ 
        commentButton.remove();
        getComments(id,/* this,*/ thePost);
        console.log('getting comments. this is button', this);
    // }
        }).appendTo(ourPost);
    });
    
}

function getComments(id/*, button*/, post){
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
    .then(comments => {
        if (comments.ok) {
            return comments.json();
      }
            throw new Error(`Woops! Something is wrong. ${comments.status}${comments.statusText}`);
    }).then(displayComments => {
        showComments(displayComments/*, button*/, post);
        console.log('displaying comments');
    }).catch (err => {
        /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
        });
}

function showComments(comments/*, button*/, post){
    let theComments = $('<div></div>'), isComments;
    $(/*button*/'<button>Hide Comments</button>').appendTo(post)/*.text('Hide Comments')*/.on('click', function() {
        if(!isComments){
            theComments.hide();
            this.innerText = 'Show Comments';
            isComments = true;
        } else{
            theComments.show();
            this.innerText = 'Hide Comments';
            isComments = false;
        }
    });
    theComments.appendTo(post);
    comments.forEach(({name, email, body}) => {
        console.log('before showing comments');
        // isComments = true;
        /*let thisComment = */$(`<aside id="comments"><span>Name: </span>${name}<br/><span>e-mail: </span>${email}<br/><span>Comment: </span>${body}</aside>`).appendTo(theComments);
    });
        
    
    console.log('after showing comments');
}

getUsers();