import React, { Component } from 'react';
import MessageBox from './MessageBox';
import Weather from './Weather';
// import Location from './Locator';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDetails: null,
      errorMessage: null,
      isMsgBoxOpen: false
    }
  }


  getWeather = ({ target }) => {
    const zipCode = target.value, apiKey = '560dcb7398e09264815a14af891179c4';

    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipCode/* || <Location/>*/}&units=imperial`)
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
        this.setState({
          weatherDetails: {
            name: weather.name,
            temp: weather.main.temp,
            humidity: weather.main.humidity,
            feel: weather.main.feels_like,
            description: weather.weather[0].description,
            imgSrc: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`
          }, errorMessage: null, isMsgBoxOpen: false
        });
        console.log(this.state.weatherDetails);
      })
      .catch(error => this.setState({ errorMessage: error.toString(), weatherDetails: null, isMsgBoxOpen: true }));
  }

  openCloseMsgBox = () => {
    this.setState({
      isMsgBoxOpen: false/*!this.state.openCloseMsgBox*/
    });
  };

  render() {
    return (
      <div className="App">

        <input placeholder="Zip"//{/*or Current Location(Default)*/}
          onBlur={this.getWeather} />

        {this.state.weatherDetails ? <Weather weather={this.state.weatherDetails} /> : null}
        {this.state.errorMessage && this.state.isMsgBoxOpen ? <MessageBox msg={this.state.errorMessage} closeBox={this.openCloseMsgBox} /> : null}
        {/* <MessageBox msg={this.state.errorMessage} /> */}

        <p id="status"></p>
        {/* <main id="middle"></main>
        <section id="side"></section> */}


      </div>
    )
  }
}
