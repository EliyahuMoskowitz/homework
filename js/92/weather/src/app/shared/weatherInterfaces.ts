export interface WeatherServerProps{
  name: string;
  main: {
    temp: number,
    humidity: number,
    feels_like: number
  };
  weather: [{description: string, icon: string}];
}

export interface Weather{
  name: string;
  temp: number;
  humidity: number;
  feel: number;
  description: string;
  imgSrc: string;
}
