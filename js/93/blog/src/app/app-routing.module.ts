import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { UserComponent } from './blogs/user/user.component';
import { GetPostsComponent } from './blogs/user/get-posts/get-posts.component';
import { NoPageComponent } from './no-page/no-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: BlogsComponent
  },
  {
    path: 'user/:userId',
    component: GetPostsComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
