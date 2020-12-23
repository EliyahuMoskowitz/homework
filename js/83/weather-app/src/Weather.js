import React from 'react';
import './weather.css';

export default function Weather({ weather: { name, temp, humidity, feel, description, imgSrc } }) {

    return (
        <>
            <main id="weatherDetails">
                <section>{name}</section>
                <section>{`${temp} ° Farenhiet`}</section>
                <section>{description}</section>
                <img src={imgSrc} alt={description} />
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
// 