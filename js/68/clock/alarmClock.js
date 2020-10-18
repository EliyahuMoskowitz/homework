(function () {
    'use strict';

    // function create(elem) {
    //     return document.createElement(elem);
    // }
    let alarmClock = $('#alarmClock');
    let clock = $('<div id="time"></div>').appendTo(alarmClock);
    let d = new Date(), numOfAlarm = 0, snooze;
    let time = d.toLocaleTimeString();
    clock.text(time);
    setAlarm(time);
    setInterval(() => {
        let d = new Date();
        let time = d.toLocaleTimeString();
        clock.text(time);
        setAlarm(time);
    }, 1000);

    $('#alarm').click(() => {
        window.pcs.messageBox.show('Please Set Your Alarm', false,
            ['hour', 'minute', 'second', 'AM/PM', 'alarm MSG', 'snooze length(seconds)', 'duration(seconds)']);
    });

    function setAlarm(time) {
        let a = window.pcs.messageBox.alarm[numOfAlarm];
        if (a && time === `${a[0]}:${a[1]}:${a[2]} ${a[3].toUpperCase()}`) {
            showAlarm(a);
        }
    }

    function showAlarm(a) {
        const msgSpan = $(`<span id="alarmMSG">${a[4]}</span>`).appendTo(alarmClock);
        /*const snooze = */$('<button class="delSn"></button').text('SNOOZE').click(() => {
            msgSpan.remove();
            setTimeout(() => {
                snooze = true;
                showAlarm(a);
                snooze = false;
            }, a[5] * 1000);
        }).appendTo(msgSpan);
        /*const delete = */$('<button class="delSn"></button').text('DELETE').click(() => {
            msgSpan.remove();
        }).appendTo(msgSpan);
        let original = msgSpan.css('backgroundColor');
        let colors = [];
        for (let i = 0; i < 50; i++) {
            colors.push(getColor());    //different colors each alarm
        }
        let run = 0;
        msgSpan.css('backgroundColor', colors[run++]);
        let intervalID = setInterval(() => {
            msgSpan.css('backgroundColor', colors[run++]);
            //msgSpan[0].style.backgroundColor = colors[run++];
        }, 1000);
        setTimeout(() => {
            clearInterval(intervalID);
            msgSpan.css('backgroundColor', original);
        }, a[6] * 1000);
        if (!snooze) {
            numOfAlarm++;
        }
    }

    function getColor() {
        return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    }
}());
