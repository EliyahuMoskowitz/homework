import { Component, Input, OnInit } from '@angular/core';
import { Weather } from '../../shared/weatherInterfaces';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input()
  weather!: Weather;

  constructor() { }

  ngOnInit(): void {
  }

}
