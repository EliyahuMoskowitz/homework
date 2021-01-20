import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherDetailsComponent } from './weather/weather-details/weather-details.component';
import { FormsModule } from '@angular/forms';
import { WeatherComponent } from './weather/weather.component';
import { ErrorComponent } from './weather/error/error.component';
import { LocatorComponent } from './locator/locator.component';
import { MapLinkComponent } from './map-link/map-link.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherDetailsComponent,
    WeatherComponent,
    ErrorComponent,
    LocatorComponent,
    MapLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
