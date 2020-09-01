(function () {
    'use strict';
    function create(elem) {
        return document.createElement(elem);
    }

    let hours = 12, minutes = 0, seconds = 0, m = true, shift = 'AM', hourCount = 0;

    let clock = create('div');
    document.body.appendChild(clock);
    setInterval(() => {
        if (seconds > 59) {
            seconds = 0;
            minutes++;
        }
        if (minutes > 59) {
            minutes = 0;
            hours++;
            hourCount++;
        }
        if (hours > 12) {
            hours = 1;
        }
        if (hourCount > 11) {
            m = !m;
        }
        if (!m) {
            shift = 'PM';
        } else {
            shift = 'AM';
        }
        clock.innerHTML = `${hours}: ${minutes}: ${seconds++}  ${shift}`;
    }, 1000);
}());

const showManualClocks = function (amount) {
    'use strict';
    function create(elem) {
        return document.createElement(elem);
    }
    for (let i = 0; i < amount; i++) {

        let hours = 12, minutes = 0, seconds = 0, m = true, shift = 'AM', hourCount = 0;

        let clock = create('div');
        document.body.appendChild(clock);
        setInterval(() => {
            if (seconds > 59) {
                seconds = 0;
                minutes++;
            }
            if (minutes > 59) {
                minutes = 0;
                hours++;
                hourCount++;
            }
            if (hours > 12) {
                hours = 1;
            }
            if (hourCount > 11) {
                m = !m;
            }
            if (!m) {
                shift = 'PM';
            } else {
                shift = 'AM';
            }
            clock.innerHTML = `${hours}: ${minutes}: ${seconds++}  ${shift}`;
        }, 1000);
    }
};