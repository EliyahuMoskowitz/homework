import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Position, PositionCoords } from '../shared/position';

@Component({
  selector: 'app-locator',
  templateUrl: './locator.component.html',
  styleUrls: ['./locator.component.css']
})
export class LocatorComponent implements OnInit{//} AfterViewInit {
  // @ViewChild('findMe') locator: ElementRef;
  // @ViewChild('status') status: ElementRef;
  // @ViewChild('mapLink') mapLink: ElementRef;

  // @Output()
  // locationFound = new EventEmitter<boolean>();
  @Output()
  position = new EventEmitter<Position>();


  locator = null;
  mapLink = null;

  constructor() { }

  // ngAfterViewInit(): void {
    ngOnInit(): void {
    this.locator = document.getElementById('findMe');
    this.mapLink = document.getElementById('mapLink');
    if(this.locator){this.locator.addEventListener('click', this.geoFindMe);}
  }
    latitude: number;
    longitude: number;

  geoFindMe = () => {

      const status = document.getElementById('status');

      const success = (position: PositionCoords) => {
          console.log(position);
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          if(status){status.textContent = ''};
          // this.locationFound.emit(true);
          this.position.emit({longitude: this.longitude, latitude: this.latitude});
      }

      function error() {
        if(status){status.textContent = 'Unable to retrieve your location'};
      }

      if (!navigator.geolocation) {
        if(status){status.textContent = 'Geolocation is not supported by your browser';}
      } else {
        if(status){status.textContent = 'Locating…';}
          navigator.geolocation.getCurrentPosition(success, error);
      }

  }

}
