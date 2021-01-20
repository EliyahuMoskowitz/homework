import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Error } from '../shared/error';
import { Position } from '../shared/position';
import { Weather, WeatherServerProps } from '../shared/weatherInterfaces';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnChanges{//} OnInit {
  apiKey = '560dcb7398e09264815a14af891179c4';

  weather!: Weather | null;
  error!: Error | null;

  @Input()
  zip!: string | null;
  @Input()
  position: Position;

  constructor(private httpClient: HttpClient/*, public weather: Weather*/){}

  // ngOnInit(): void {
    ngOnChanges(): void {
      const fetch = this.zip ? `&zip=${this.zip}`
     : `lat=${this.position.latitude}&lon=${this.position.longitude}`;
    this.httpClient.get<WeatherServerProps>(`http://api.openweathermap.org/data/2.5/weather?${fetch}&appid=${this.apiKey}&units=imperial`)
      .subscribe(({name, main: {temp, humidity, feels_like}, weather}) => {
        this.weather = {
            name: name,
            temp: temp,
            humidity: humidity,
            feel: feels_like,
            description: weather[0].description,
            imgSrc: `http://openweathermap.org/img/wn/${weather[0].icon}.png`
          };
          this.error = null;
        }, err => {
          this.error = err.error;
          console.info(err);
          this.weather = null;
        });
    }

}
