import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/shared/Post';
// import { TitleService } from 'src/app/shared/title.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  text: string = 'Show';

  title!: string | undefined;

  @Input()
  post!: Post;
  // @Input()
  // posts!: Post[];

  areCommentsShowing!: boolean

  setCommentsShowing(){
    this.areCommentsShowing = !this.areCommentsShowing;
    this.text = this.areCommentsShowing ? 'Hide' : 'Show';
  }

  // constructor(public getUsTitle: TitleService) { }

  ngOnInit(): void {
    // this.title = this.posts.find(p => p.id === this.post.id).name;
  }

}
