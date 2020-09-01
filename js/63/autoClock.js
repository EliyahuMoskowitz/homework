(function () {
    'use strict';

    function create(elem) {
        return document.createElement(elem);
    }
    let clock = create('div');
    document.body.appendChild(clock);

    setInterval(() => {
        let d = new Date();
        clock.innerHTML = d.toLocaleTimeString();
    }, 1000);
}());

const showAutoClocks = function (amount) {
    'use strict';

    function create(elem) {
        return document.createElement(elem);
    }

    for (let i = 0; i < amount; i++) {

        let clock = create('div');
        document.body.appendChild(clock);

        setInterval(() => {
            let d = new Date();
            clock.innerHTML = d.toLocaleTimeString();
        }, 1000);
    }
};

(function () {
    'use strict';

    function create(elem) {
        return document.createElement(elem);
    }
    let clock = create('div');
    document.body.appendChild(clock);

    setInterval(() => {
        let d = new Date(), shift = 'AM', h = d.getHours();
        if (h > 12) {
            shift = 'PM';
            h -= 12;
        }
        clock.innerHTML = `${h}: ${d.getMinutes()}: ${d.getSeconds()}  ${shift}`;
    }, 1000);
}());