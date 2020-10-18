(function () {
    'use strict';

    let timezone, latitude, longitude,
        date, elevation, resultDiv = $(), locationStatus = $('<div id="locationStatus"></div>');

    $('#getLocation').click(geoFindMe);
    function geoFindMe() {
        resultDiv.empty().removeClass('showResults');
        locationStatus.appendTo(document.body);
        function success(position) {
            console.log(position);
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            locationStatus.text('Location Found!');
        }

        function error() {
            locationStatus.text('Unable to retrieve your location');
        }

        if (!navigator.geolocation) {
            locationStatus.text('Geolocation is not supported by your browser');
        } else {
            locationStatus.text('Locating…');
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }

    $('#getZmanim').click(() => {
        date = $('#date').val() || new Date().toLocaleDateString();
        timezone = $('#timezone').val();
        elevation = $('#elevation').val();
        latitude = latitude || $('#latitude').val();
        longitude = longitude || $('#longitude').val();
        // https://wyrezmanim.herokuapp.com/api/zmanim?timezone=America/New_York&latitude=40&longitude=-73&date=9/27/2021&elevation=50&format=json
        fetch('https://cors-anywhere.herokuapp.com/' + `http://wyrezmanim.herokuapp.com/api/zmanim?timezone=${timezone}&latitude=${latitude}&longitude=${longitude}&date=${date}&elevation=${elevation}&format=json`)
            .then(r => {
                resultDiv = $('#results').addClass('showResults');
                if (!r.ok) {
                    throw new Error(`${r.status} meaning ${r.statusText}`);
                }
                return r.json();
            })
            .then(results => {
                console.log('Results:', results);
                resultDiv.empty();
                // let special = [results.Date, results.Alos, results.SofZmanShmaGra, results.SofZmanTefilahGra,
                //     results.Chatzos, results.MinchaGedolah, results.MinchaKetana,
                //     results.PlagHamincha, results.CandleLighting, results.Shkia];
                //     special.forEach(e => {
                //         $(`<div><span class="resultHeadings"></span> ${e}</div>`).appendTo(resultDiv);
                //     });
                resultDiv.html(`<div><span class="resultHeadings">Date: </span>${results.Date}
                <div><span class="resultHeadings">Alos: </span>${results.Alos}
                <div><span class="resultHeadings">Sunrise: </span>${results.Sunrise}
                <div><span class="resultHeadings">Sof Zman Shma Gra: </span>${results.SofZmanShmaGra}
                <div><span class="resultHeadings">Sof Zman Tefilah Gra: </span>${results.SofZmanTefilahGra}
                <div><span class="resultHeadings">Chatzos: </span>${results.Chatzos}
                <div><span class="resultHeadings">Mincha Gedolah: </span>${results.MinchaGedolah}
                <div><span class="resultHeadings">Mincha Ketana: </span>${results.MinchaKetana}
                <div><span class="resultHeadings">Plag Hamincha: </span>${results.PlagHamincha}
                <div><span class="resultHeadings">Candle Lighting: </span>${results.CandleLighting}
                <div><span class="resultHeadings">Shkia: </span>${results.Shkia}`);

                locationStatus.empty();
                let isShowing, extraHolder = $();
                $('<button id="all"></button>').text('Show All').appendTo(resultDiv).click(function () {
                    isShowing = !isShowing;
                    let resultsSplit = JSON.stringify(results)./*replaceAll('"', '').replace('{' || '}')*/split(',');
                    if (isShowing) {
                        extraHolder = $('<div></div>').appendTo(resultDiv);
                        resultsSplit.forEach(e => {
                            extraHolder.append($(`<section>${e}</section>`));
                        });
                        this.innerText = 'Clear Extra';
                    } else {
                        extraHolder.empty();
                        this.innerText = 'Show All';
                    }
                });
            })
            .catch(e => { console.error(e); resultDiv.text(`SORRY! you've got an error: ${e}`); });
    });
}());