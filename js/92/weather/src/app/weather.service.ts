import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { WeatherServerProps } from './shared/weatherInterfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getWeather(url: string){

    return this.httpClient.get<WeatherServerProps>(url)
        .pipe(map(({name, main: {temp, humidity, feels_like}, weather}) => ({
                  name: name,
                  temp: temp,
                  humidity: humidity,
                  feel: feels_like,
                  description: weather[0].description,
                  imgSrc: `http://openweathermap.org/img/wn/${weather[0].icon}.png`
              }))
              , catchError(err => {
                    console.info(err);
                    return err.error;
                  }));
        }

}
