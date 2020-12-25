// import $ from 'jquery';

// let msgDiv = $('<div></div>').appendTo(document.body), blogDiv = $('<div></div>').appendTo(document.body);

async function getUsers() {
    try {
        const users = await fetch('https://jsonplaceholder.typicode.com/users');
        if (users.ok) {
            const displayUsers = await users.json();
            showUsers(displayUsers);
        } else {
            throw new Error(`Woops! Something is wrong. ${users.status}${users.statusText}`);
        }
    } catch (err) {
        /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
    }
}

function showUsers(users) {
    users.forEach(({ name, website, company: { name: CName, catchPhrase: phrase, bs } }) => {
        $('<div id="blogDiv"></div>').appendTo(document.body).append($(`<main><div>${name}</div><div>${website}</div>
                <div>Company: </br>${CName}</br>${phrase}</br>${bs}</div></main>`));
        // .appendTo(blogDiv);
    });
}

getUsers();