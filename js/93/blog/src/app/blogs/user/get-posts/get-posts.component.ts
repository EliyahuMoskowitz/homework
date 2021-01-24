import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { Post } from 'src/app/shared/Post';
import { TitleService } from 'src/app/shared/title.service';

@Component({
  selector: 'app-get-posts',
  templateUrl: './get-posts.component.html',
  styleUrls: ['./get-posts.component.css']
})
export class GetPostsComponent implements OnInit, OnDestroy {
  title!: string;
  allPosts!: Observable<Post[]>

  // to go through 3 at a time
  posts!: Post[];

  displayAll: boolean = true;
  displayText: string = '3';
  lowest: number = 0;
  greatest: number = 2;
  amountToShow: number = 3;

  subscription!: Subscription;

  setDisplay(){
    this.displayAll = !this.displayAll;
    this.displayText = this.displayAll ? '3' : 'all';
  }

  previous(){
    this.lowest -= this.amountToShow;
    this.greatest -= this.amountToShow;

    if(this.lowest < 0){
      this.lowest = this.posts?.length - 1 - this.amountToShow;
      this.greatest = this.posts?.length - 1;
    }
  }

  next(){
    this.lowest += this.amountToShow;
    this.greatest += this.amountToShow;

    if(this.greatest >= this.posts?.length){
      this.lowest = 0;
      this.greatest = this.amountToShow - 1;
    }
  }

  constructor(private ourRoute: ActivatedRoute, private getPosts: BlogService, public getUsTitle: TitleService) { }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.getUsTitle.setShowTitle(false);
    this.allPosts = this.getPosts.getPosts(this.ourRoute.snapshot.params.userId);
      this.subscription = this.allPosts.subscribe(p => {
      this.posts = p;
  });
    this.title = this.getUsTitle.getTitle();
  }
}
