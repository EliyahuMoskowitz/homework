import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Blog } from 'src/app/shared/Blogs';
import { TitleService } from 'src/app/shared/title.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user!: Blog;

  // @Output()
  // setTitle = new EventEmitter<string>()


  constructor(public setTheUser: TitleService) { }

  setUser(){
    this.setTheUser.setUser(this.user);
  }

  ngOnInit(): void {
    // this.setTheUser.setUser(this.user);    WRONG! just last one. Click anchor for each
  }

}
