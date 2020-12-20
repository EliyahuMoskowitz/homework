

export default function Locator() {

    const status = document.querySelector('#status');
    // eslint-disable-next-line
    // let longitude, latitude;

    function success(position) {
        console.log(position);
        // eslint-disable-next-line
        // latitude = position.coords.latitude;
        // eslint-disable-next-line
        // longitude = position.coords.longitude;

        status.textContent = '';
    }

    function error() {
        status.textContent = 'Unable to retrieve your location';
    }

    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';

        return navigator.geolocation.getCurrentPosition(success, error);
    }

}
