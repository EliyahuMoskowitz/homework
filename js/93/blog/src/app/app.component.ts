import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TitleService } from './shared/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'welcome to our blogs';
  showTitle!: boolean;

  constructor(public setOurTitle: TitleService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.showTitle =  this.setOurTitle.shouldShowTitle();
  }


  ngOnInit(): void {
    this.showTitle =  this.setOurTitle.shouldShowTitle();
  }

  // setTitle(title: string){
  //   this.title = title;
  // }
}
