import { Component, OnChanges, OnInit } from '@angular/core';
import { Position } from './shared/position';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';

  zip: string | null = '';
  units = 'imperial';
  // locationFound: boolean;
  position: Position | null;

  setZip(zip: string){
    this.zip = zip;
    this.position = null
  }

  setUnits(units: string){
    this.units = units;
  }

  // setLocationFound(v: boolean){
  //   this.locationFound = v;
  // }

  setPosition(p: Position){
    this.position = p;
    this.zip = null
  }

  ngOnInit(): void {
    }
}
