import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoPageComponent } from './no-page/no-page.component';
import { BlogsComponent } from './blogs/blogs.component';
import { UserComponent } from './blogs/user/user.component';
import { GetPostsComponent } from './blogs/user/get-posts/get-posts.component';
import { PostComponent } from './blogs/user/get-posts/post/post.component';
import { GetCommentsComponent } from './blogs/user/get-posts/post/get-comments/get-comments.component';
import { CommentComponent } from './blogs/user/get-posts/post/get-comments/comment/comment.component';
import { BackButtonComponent } from './back-button/back-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NoPageComponent,
    BlogsComponent,
    UserComponent,
    GetPostsComponent,
    PostComponent,
    GetCommentsComponent,
    CommentComponent,
    BackButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
