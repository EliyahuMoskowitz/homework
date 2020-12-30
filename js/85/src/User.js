import Post from './Post';
import $ from 'jquery';

export default class User{
    constructor({ name, id, website, company: { name: CName, catchPhrase: phrase, bs } }){
        this.name = name;
        this.id = id;
        this.website = website;
        this.CName = CName;
        this.phrase = phrase;
        this.bs = bs;
        this.blog;

        // if(!User.thisClickedBlog){User.thisClickedBlog = null}
    }

    showUser(theBlogs){
        this.blog = $(`<main class="aBlog"><div class="text-center">${this.name}</div><div class="text-center">${this.website}</div>
            <div class="text-center">Company: </br>${this.CName}</br>${this.phrase}</br>${this.bs}</div></main>`).appendTo(theBlogs);
            // User.thisClickedBlog = this.blog;
            this.blog.on('click', () => { 
                theBlogs.hide();
                document.title = `${this.name}'s Blog`;
                this.getPosts(this.id, theBlogs/*, this.blog*//*User.thisClickedBlog*/)});//.appendTo(this.blog);
    }

    getPosts(id, theBlogs/*, theClickedUser*/){
            fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
                .then(posts => {
                    if (posts.ok) {
                        return posts.json();
                  }
                        throw new Error(`Woops! Something is wrong. You may need to Reload. ${posts.status}${posts.statusText}`);
                }).then(displayPosts => {
                    // let thisPost = displayPosts.filter or find(p => p.id === e.target.id);//wrong. we instead only fetch the required post
                    displayPosts.forEach(p => {
                         let thePost = new Post(p, theBlogs/*, theClickedUser*/); thePost.showPost();
                    });
                   
                }).catch (err => {
                    /*msgDiv*/$('<div id="msgDiv"></div>').appendTo(document.body).text(err);
                    });
    }

}