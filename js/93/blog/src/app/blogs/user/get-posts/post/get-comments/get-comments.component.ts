import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogService } from 'src/app/shared/blog.service';
import { Comment } from '../../../../../shared/Comment';


@Component({
  selector: 'app-get-comments',
  templateUrl: './get-comments.component.html',
  styleUrls: ['./get-comments.component.css']
})
export class GetCommentsComponent implements OnInit {

  @Input()
  postId!: number;

  comments!: Observable<Comment[]>

  constructor(private getUsComments: BlogService) { }

  ngOnInit(): void {
    this.comments = this.getUsComments.getComments(this.postId);
  }

}
