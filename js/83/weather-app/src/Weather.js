import React from 'react';
import './weather.css';

export default function Weather(props) {
    const { name, main, weather } = props.weather; const { temp, humidity, feels_like: feel } = main;
    let imgSrc = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;

    return (
        <>
            <main id="weatherDetails">
                <section>{name}</section>
                <section>{`${temp} ° Farenhiet`}</section>
                <section>{weather[0].description}</section>
                <img src={imgSrc} alt="Description Icon" />
                <section>{`RealFeel: ${feel}`}</section>
                <section>{`Humidity: ${humidity}`}</section>
            </main>
        </>
    );
}





//     mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
//     mapLink.target = '_blank'; mapLink.id = 'map-link';
//     $('<aside></aside>').html(`You are Located at the follwing coordiantes: <br/>Latitude: ${latitude.toFixed(2)} °, Longitude: ${longitude.toFixed(2)} °`).appendTo(document.body);
//     mapLink.textContent = 'Show Where you are on Map';
//     document.body.appendChild(mapLink);
// }