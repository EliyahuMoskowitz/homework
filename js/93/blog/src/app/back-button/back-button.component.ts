import { Component, OnInit } from '@angular/core';
import { TitleService } from '../shared/title.service';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  constructor(public getUsTitle: TitleService) { }

  ngOnInit(): void {
  }

  setAppTitle(){
      this.getUsTitle.setShowTitle(true);
    }

}
