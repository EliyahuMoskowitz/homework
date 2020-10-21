/*global google*/
const geoUser = 'EliyahuMoskowitz';
function initMap() {
    'use strict';
    let map, marker, location, origLoc, theTitle;
    const defIMG = '../68/images/waterfall.jpg', defMarker = 'https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png';
    function success(position, defTitle) {
        console.log(position);
        location = { lat: position.coords.latitude, lng: position.coords.longitude };
        origLoc = location;
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: location
        });
        marker = new google.maps.Marker({
            position: location,
            map: map,
            title: defTitle || `Your Location at ${Math.floor(location.lat, 2)} Latitude and ${Math.floor(location.lng, 2)} Longtitude`
        });
        theTitle = marker.title;
    }

    const infoWindow = new google.maps.InfoWindow(), side = $(`#side`);

    $('#submit').click(() => {
        side.empty();
        infoWindow.close();
        map.panTo(origLoc);
        marker.setPosition(origLoc);
        marker.setIcon({
            url: defMarker,
            scaledSize: new google.maps.Size(27, 43)
        });
        marker.setTitle(theTitle);
        marker.setAnimation(google.maps.Animation.DROP);
        fetch(`http://api.geonames.org/wikipediaSearch?q=${$('#search').val()}&maxRows=${$('#maxRows').val()}&username=${geoUser}&type=json`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`${r.status} which means ${r.statusText}`);
                }
                return r.json();
            })
            //.then(r => console.log(r));
            .then(set => {
                // map.zoom = 0;
                console.log(set);
                set.geonames.forEach(item => {
                    $(`<section class="items"><span id="title" class="block">${item.title}</span><img src="${item.thumbnailImg || defIMG}"/>
                    <sapn id="sum" class="block">${item.summary}</span></section>`).click(() => {
                        location = { lat: item.lat, lng: item.lng };
                        map.panTo(location); //map.zoom = 9;
                        infoWindow.close();
                        marker.setPosition(location);
                        marker.setIcon(item.thumbnailImg ? {
                            url: item.thumbnailImg,// || defMarker,
                            scaledSize: new google.maps.Size(65, 65)
                        } : null);
                        marker.setTitle(item.title);
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                        marker.addListener('click', function () {
                            //map.zoom = 10;
                            infoWindow.setContent(`<span id="infoSum" class="block">${item.summary}</span>
                            <a class="wikAnc" href="https://${item.wikipediaUrl}" target="_blank">See More On Wikepedia</a>`);
                            infoWindow.open(map, this);
                        });
                    }).appendTo(side);
                });
            }).catch(e => alert(e));
    });
    const defaultTitle = 'Could not find your location. Showing New York';
    const defPos = { coords: { latitude: 40.5, longitude: -74 } };
    function error() {
        console.error('Unable to retrieve your location');
        success(defPos, defaultTitle);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.error('Browser does not support geoLocation');
        success(defPos, defaultTitle);
    }
}
