import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import User from './User';

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
// }                //  regenarator issues- can' do async await  :(  don't understand why not

// let thisClickedBlog;

function getUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
  .then( users => {
      if (users.ok) {
            return users.json();
      }
            throw new Error(`Woops! Something is wrong. You may need to Reload. ${users.status}${users.statusText}`);
    }).then(displayUsers => {
        showUsers(displayUsers);
    }).catch (err => {
        /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
        });
    }


function showUsers(users) {
    const theBlogs = $('<div id="blogDiv"></div>').appendTo(document.body);
    users.forEach(function(u) { let theUser = new User(u); theUser.showUser(theBlogs)});
}

getUsers();