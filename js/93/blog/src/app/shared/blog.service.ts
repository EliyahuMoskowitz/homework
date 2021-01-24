import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blog, BlogServerProps } from './Blogs';
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Post } from './Post';
import { Comment } from './Comment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient) { }

    getBlogs(): Observable<Blog[]>{
      return this.httpClient.get<BlogServerProps[]>('https://jsonplaceholder.typicode.com/users')
        .pipe(map(blogs => {
            return blogs.map(b => ({
              id: b.id,
              name: b.name,
              website: b.website,
              companyName: b.company.name,
              catchPhrase: b.company.catchPhrase,
              bs: b.company.bs
            }))
        }));
    }

    getPosts(userId: number){
      return this.httpClient.get<Post[]>(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    }

    getComments(postId: number){
      return this.httpClient.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    }
}
