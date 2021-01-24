import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Error } from '../shared/error';
import { Position } from '../shared/position';
import { Weather, WeatherServerProps } from '../shared/weatherInterfaces';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnChanges, OnDestroy{//} OnInit {
  apiKey = '560dcb7398e09264815a14af891179c4';

  subcription: Subscription;
  weather!: Weather | null;
  // weather!: Observable<Weather> | null;
  // weather!: Observable<Weather | Error>;
  error!: Error | null;

  @Input()
  zip!: string | null;
  @Input()
  units: string;
  @Input()
  position: Position;

  displayUnits: string;

  constructor(private httpClient: HttpClient,  private weatherService: WeatherService){}
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  // ngOnInit(): void {
    ngOnChanges(): void {
      const fetch = this.zip ? `zip=${this.zip}`
     : `lat=${this.position.latitude}&lon=${this.position.longitude}`;
    this.subcription /*this.weather*/ = this.httpClient.get<WeatherServerProps>(`http://api.openweathermap.org/data/2.5/weather?${fetch}&appid=${this.apiKey}&units=${this.units || 'imperial'}`)
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
          console.info(err, 'in error');
          this.weather = null;
        });

      //or if we are observable on weather
      // .pipe(map(({name, main: {temp, humidity, feels_like}, weather}) => ({
      //         name: name,
      //         temp: temp,
      //         humidity: humidity,
      //         feel: feels_like,
      //         description: weather[0].description,
      //         imgSrc: `http://openweathermap.org/img/wn/${weather[0].icon}.png`
      //     })));

      // this.weather = this.weatherService.getWeather(`http://api.openweathermap.org/data/2.5/weather?${fetch}&appid=${this.apiKey}&units=${this.units || 'imperial'}`);


      if (this.units.toLowerCase() === 'imperial') {
        this.displayUnits = 'Farenheit';
    } else if (this.units.toLowerCase() === 'metric') {
      this.displayUnits = 'Celcius';
    } else if (this.units.toLowerCase() === 'kelvin'){    //no bug
      this.displayUnits = 'Kelvin';
    }
    }

}
