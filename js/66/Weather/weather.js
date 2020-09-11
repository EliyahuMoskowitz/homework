/* global pcs */
(function () {
  'use strict';

  const units = 'imperial';

  const zipInput = $('#zip');

  const apiKey = 'xy2sdfghj4569cvbnm45dfgbasdfgh14529iu12';

  zipInput.change(() => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&zip=${zipInput.val()}&units=${units}`)
      .then(async r => {
        if (!r.ok) {
          //I got the message this way
          let x = await r.json();
          let msg = x.message;
          throw new Error(`${r.status} ${r.statusText} ${msg}`);
        }
        return r.json();
      })
      .then(weather => { console.log(weather); showWeather(weather); })
      .catch(err => pcs.messageBox.show(err));
  });


  function showWeather(weather) {
    JSON.stringify(weather).split(',').forEach(e => {
      $('<pre></pre>').text(e).appendTo(document.body);
    });
  }
}());