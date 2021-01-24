import { Injectable } from '@angular/core';
import { Blog } from './Blogs';
import { Post } from './Post';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  user!: Blog;
  // blogTitle!: string;

  showTitle: boolean = true;

  getTitle(){
    return this.user?.name;
    // return this.blogTitle;
  }

  setUser(user: Blog){
    this.user = user;
  }

  shouldShowTitle(){
    return this.showTitle;
  }

  setShowTitle(b: boolean){
    this.showTitle = b;
  }

  constructor() { }
}
