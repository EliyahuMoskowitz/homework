import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './weather/error/error.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';

const routes: Routes = [
  // {
  //   path: 'weather',
  //   component: WeatherDetailsComponent
  // },
  // {
  //   path: 'error',
  //   component: ErrorComponent
  // },
  // {
  //   path: '',
  //   component: ErrorComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
