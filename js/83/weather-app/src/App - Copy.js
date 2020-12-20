import React, { Component } from 'react';
import MessageBox from './MessageBox';
import Weather from './Weather';
// import Location from './Locator';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.locStatus = '';

    this.state = {
      weatherDetails: null,
      errorMessage: null
    }
  }


  getWeather = ({ target }) => {
    const zipCode = target.value, apiKey = '560dcb7398e09264815a14af891179c4';
    let fetch = `http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=imperial`;
    if (zipCode > '') {
      fetch += `&zip=${zipCode}`;

    } else {
      this.getLocation();
      fetch += `lat=${this.latitude}&lon=${this.longitude}`;
    }

    fetch(fetch)
      .then(async r => {
        if (!r.ok) {
          //I got the message this way
          let x = await r.json();
          let msg = x.message;
          throw new Error(`${r.status} ${r.statusText} ${msg}`);
        }
        return r.json();
      })
      .then(weather => {
        console.log(weather, this);
        this.setState({ weatherDetails: weather, errorMessage: null });
      })
      .catch(error => this.setState({ errorMessage: error.toString(), weatherDetails: null }));
  }

  getLocation = () => {
    //  this.locStatus = ;
    let longitude, latitude;

    function success(position) {
      console.log(position);
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      // this.locStatus = '';
    }

    function error() {
      this.locStatus = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
      this.locStatus = 'Geolocation is not supported by your browser';
    } else {
      this.locStatus = 'Locating…';

      return navigator.geolocation.getCurrentPosition(success, error);
    }
  }


  render() {
    return (
      <div className="App">

        <input placeholder="Zip or Current Location(Default)"
          onBlur={this.getWeather} />
        <button onClick={this.getLocation}>Get Location</button>

        {this.state.weatherDetails ? <Weather weather={this.state.weatherDetails} /> : null}
        {this.state.errorMessage ? <MessageBox msg={this.state.errorMessage} /> : null}
        {/* <MessageBox msg={this.state.errorMessage} /> */}

        <p id="status"></p>
        {/* <main id="middle"></main>
        <section id="side"></section> */}


      </div>
    )
  }
}
