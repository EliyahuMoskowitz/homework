(function () {
    'use strict';
    // function create(elem) {
    //     return document.createElement(elem);
    // }

    let minutes = 0, seconds = 0, tenthSecond = 0;

    let clock = $('#stopwatch'), time = $('<div></div>'), buttons = $('<section id="buttons"></section>'), intervalID;
    time.text(`${leftPad(minutes, 2)}: ${leftPad(seconds, 2)}: ${leftPad(tenthSecond++, 2)}`).appendTo(clock);
    let start = $('<button class="watchButtons">START</button>').click(function () {
        this.setAttribute('disabled', 'true');
        intervalID = setInterval(() => {
            if (tenthSecond > 9) {
                tenthSecond = 0;
                seconds++;
                if (seconds > 59) {
                    seconds = 0;
                    minutes++;
                }
            }
            time.text(`${leftPad(minutes, 2)}: ${leftPad(seconds, 2)}: ${leftPad(tenthSecond++, 2)}`);
        }, 100);
    }).appendTo(buttons);
    $('<button class="watchButtons">PAUSE</button>').click(() => {
        clearInterval(intervalID);
        start.attr('disabled', false);
    }).appendTo(buttons);
    $('<button class="watchButtons">RESTART</button>').click(() => {
        minutes = 0; seconds = 0; tenthSecond = 0;
        time.text(`${leftPad(minutes, 2)}: ${leftPad(seconds, 2)}: ${leftPad(tenthSecond++, 2)}`);
    }).appendTo(buttons);

    buttons.appendTo(clock);

    function leftPad(n, length, padder = '0') {
        let paddedString = n.toString();
        while (paddedString.length < length) {
            paddedString = `${padder}${paddedString}`;
        }
        return paddedString;
    }

}());
