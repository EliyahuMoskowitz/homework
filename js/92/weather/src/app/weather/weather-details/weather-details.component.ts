import { Component, Input, OnInit } from '@angular/core';
import { Error } from 'src/app/shared/error';
import { WeatherService } from 'src/app/weather.service';
import { Weather } from '../../shared/weatherInterfaces';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.css']
})
export class WeatherDetailsComponent implements OnInit {

  @Input()
  weather!: Weather/* | Error*/;
  @Input()
  units!: string;


  ngOnInit(): void {
   
  }


  // displayWeather: boolean = typeof(this.weather === Weather) ? true : false;
  // displayWeather: boolean = this.weather.name ? true : false;


}
