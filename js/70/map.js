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
            title: defTitle || `Your Location at ${Math.round(location.lat)} Latitude and ${Math.round(location.lng)} Longtitude`
        });
        theTitle = marker.title;

        const markers = [], circles = [], rectangles = [], polylines = [], polygons = [];
        let all = [];
        const drawingManager = new google.maps.drawing.DrawingManager();
        drawingManager.setMap(map);
        //const markTitles = [];
        const shapesRecord = $('#shapesRecord');
        google.maps.event.addListener(drawingManager, 'overlaycomplete', ev => {
            console.log(ev);
            all.push(ev.overlay);
            switch (ev.type) {
                case 'marker':
                    //markTitles.push(prompt('What would you like to name your marker?\n Press cancel for none'));
                    markers.push(ev.overlay.position);
                    localStorage.markers = JSON.stringify(markers);
                    shapesRecord.append(`<div class="box"><span class="shapeName">Marker:</br></span>Latitude ${ev.overlay.position.lat()}
                    <br/> Longitude ${ev.overlay.position.lng()}</div>`);
                    map.panTo({ lat: ev.overlay.position.lat(), lng: ev.overlay.position.lng() }); break;
                case 'circle':
                    circles.push({ center: ev.overlay.center, radius: ev.overlay.radius });
                    localStorage.circles = JSON.stringify(circles);
                    shapesRecord.append(`<div class="box"><span class="shapeName">Circle:</br></span><span class="special">Center:</span> Latitude ${(ev.overlay.center.lat())}
                    <br/> Longitude ${ev.overlay.center.lng()}</br><span class="special">Radius</span> ${Math.round(ev.overlay.radius)} Feet<br/>
                    <span class="special">Circumference:</span> ${Math.round(Math.PI * 2 * ev.overlay.radius)}<br/><span class="special">Area:</span> ${Math.round(Math.PI * (ev.overlay.radius * ev.overlay.radius))}</div>`);
                    map.panTo({ lat: ev.overlay.center.lat(), lng: ev.overlay.center.lng() }); break;
                case 'rectangle':
                    rectangles.push(ev.overlay.bounds);
                    console.log(ev.overlay.bounds);
                    localStorage.rectangles = JSON.stringify(rectangles);
                    shapesRecord.append(`<div class="box"><span class="shapeName">Rectangle:</br></span><span class="special">East</span> ${ev.overlay.bounds.Ya.j}
                    </br><span class="special">West</span> ${ev.overlay.bounds.Ya.i}</br><span class="special">North</span> ${ev.overlay.bounds.Sa.i}</br><span class="special">South</span> ${ev.overlay.bounds.Sa.j}</div>`);
                    map.panTo({ lat: ev.overlay.bounds.Ya.i, lng: ev.overlay.bounds.Sa.j }); break;
                case 'polyline':
                    const pathArrayPolyline = ev.overlay.getPath().getArray();
                    polylines.push(pathArrayPolyline/*ev.overlay.paths*/);
                    localStorage.polylines = JSON.stringify(polylines);
                    let box = $('<div class="box"></div');
                    box.append(`<span class="shapeName">Polyline: </span>`);
                    pathArrayPolyline.forEach((e, i) => {
                        let j = i + 1;
                        box.append(`<div><span class="special">Line ${j}:</span> Latitude ${e.lat()}<br/>Longitude ${e.lng()}</br></div>`);
                    }); box.appendTo(shapesRecord);
                    map.panTo({ lat: pathArrayPolyline[0].lat(), lng: pathArrayPolyline[0].lng() }); break;
                case 'polygon':
                    const pathArrayPolygon = ev.overlay.getPath().getArray();
                    polygons.push(pathArrayPolygon/*ev.overlay.paths*/);
                    localStorage.polygons = JSON.stringify(polygons);
                    let boxGon = $('<div class="box"></div');
                    boxGon.append(`<span class="shapeName">Polygon: </span>`);
                    pathArrayPolygon.forEach((e, i) => {
                        let j = i + 1;
                        boxGon.append(`<div><span class="special">Line ${j}:</span> Latitude ${e.lat()}<br/>Longitude ${(e.lat())}</br></div>`);
                    }); boxGon.appendTo(shapesRecord);
                    map.panTo({ lat: pathArrayPolygon[0].lat(), lng: pathArrayPolygon[0].lng() }); break;
            }
            // $('.shapeName').click(() => {
            //     console.log('shapeName');
            //     //map.panTo();
            // });
        });
        if (localStorage.markers) {
            JSON.parse(localStorage.markers).forEach((mark/*, index*/) => {
                let m = new google.maps.Marker({
                    position: {
                        lat: JSON.parse(mark.lat), lng: JSON.parse(mark.lng)
                    },
                    map: map//,
                    //title: markTitles[index]
                });
                all.push(m);
            });

        } if (localStorage.circles) {
            JSON.parse(localStorage.circles).forEach(circ => {
                let c = new google.maps.Circle({
                    center: circ.center,
                    radius: circ.radius,
                    map: map
                });
                all.push(c);
            });
        } if (localStorage.rectangles) {
            JSON.parse(localStorage.rectangles).forEach(rect => {
                let r = new google.maps.Rectangle({
                    bounds: { south: rect.south, west: rect.west, north: rect.north, east: rect.east },
                    map: map
                });
                all.push(r);
            });
        } if (localStorage.polylines) {
            JSON.parse(localStorage.polylines).forEach(polylin => {
                const path = [];
                polylin.forEach(point => {
                    path.push(point);
                });
                let pln = new google.maps.Polyline({
                    path: path,
                    map: map
                });
                all.push(pln);
            });
        } if (localStorage.polygons) {
            JSON.parse(localStorage.polygons).forEach(polygon => {
                const path = [];
                polygon.forEach(point => {
                    path.push(point);
                });
                let plgn = new google.maps.Polygon({
                    path: path,
                    map: map
                });
                all.push(plgn);
            });
        }

        const infoWindow = new google.maps.InfoWindow(), side = $(`#side`);
        const b = $('#clearShapes > button');
        b[0].addEventListener('click', () => {
            shapesRecord.empty();
        });
        b[1].addEventListener('click', () => {
            localStorage.clear();
            all.forEach(e => e.setMap(null));
            shapesRecord.empty();
            all = [];
        });//.title.addClass('clearTitle');

        let markerArray = [];
        $('#submit').click(() => {
            side.empty();
            infoWindow.close();
            map.panTo(origLoc);
            map.setZoom(7);
            markerArray.forEach(m => m.setMap(null));
            markerArray = [];
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
                    console.log(set);
                    if (set.geonames.length <= 0) {
                        $(`<section class="items">There are no GEONAMES found for that Query :(</br>Please try again</section>`).appendTo(side);
                    } else {
                        set.geonames.forEach(item => {
                            map.setZoom(2);
                            const oldMark = new google.maps.Marker({
                                position: { lat: item.lat, lng: item.lng },
                                map: map,
                                icon: item.thumbnailImg ? {
                                    url: item.thumbnailImg,
                                    scaledSize: new google.maps.Size(65, 65)
                                } : null,
                                title: item.title
                            });
                            markerArray.push(oldMark);
                            $(`<section class="items"><span id="title" class="block">${item.title}</span><img src="${item.thumbnailImg || defIMG}"/>
                    <sapn id="sum" class="block">${item.summary}</span></section>`).click(() => {
                                location = { lat: item.lat, lng: item.lng };
                                map.panTo(location); map.setZoom(8);
                                infoWindow.close();
                                oldMark.setMap(null);
                                marker.setPosition(location);
                                marker.setIcon(item.thumbnailImg ? {
                                    url: item.thumbnailImg,// || defMarker,
                                    scaledSize: new google.maps.Size(65, 65)
                                } : null);
                                marker.setTitle(item.title);
                                marker.setAnimation(google.maps.Animation.BOUNCE);
                                marker.addListener('click', function () {
                                    map.setZoom(10);
                                    infoWindow.setContent(`<span id="infoSum" class="block">${item.summary}</span>
                            <a class="wikAnc" href="https://${item.wikipediaUrl}" target="_blank">See More On Wikepedia</a>`);
                                    infoWindow.open(map, this);
                                });
                            }).appendTo(side);
                        });
                    }
                }).catch(e => alert(e));
        });
    }
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
