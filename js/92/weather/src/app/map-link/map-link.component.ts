import { Component, Input, OnInit } from '@angular/core';
import { Position } from '../shared/position';

@Component({
  selector: 'app-map-link',
  templateUrl: './map-link.component.html',
  styleUrls: ['./map-link.component.css']
})
export class MapLinkComponent implements OnInit {

  @Input()
  position: Position;


  constructor() { }

  ngOnInit(): void {
  }

}
