(function () {
    'use strict';

    let colors = [];
    let milli;
    startShow();
    function startShow() {
        let type = window.prompt('Enter "Random" or "Phase"').toLowerCase();
        if (type !== 'random' && type !== 'phase') {
            alert('Error entry. Try again');
            startShow();
        } else if (type === 'random') {
            for (let i = 0; i < 10000; i++) {        //10,000 random colors. Want 1000 milliseconds
                colors.push(`rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`);
            }
            milli = 1000;
        } else {
            milli = 50;
            doPhase();
        }
    }
    function doPhase() {
        let choice = window.prompt('What would you like to see change? "BLUE", "GREEN" or "RED"').toUpperCase();
        if (choice !== 'BLUE' && choice !== 'GREEN' && choice !== 'RED') {
            window.alert('Error entry. Try again');
            doPhase();
        } else {
            for (let i = 0; i < 256; i++) {         //for 256 of one of rgb. Want 50 milliseconds for this 
                if (choice === 'BLUE') {
                    colors.push(`rgb(0, 0, ${i})`);
                } else if (choice === 'GREEN') {
                    colors.push(`rgb(0, ${i}, 0)`);
                } else {
                    colors.push(`rgb(${i}, 0, 0)`);
                }
            }
        }
    }
    // for (let i = 0; i < 255; i++) {             //16,777,216 colors in order: Breaks Machine
    //     for (let j = 0; j < 255; j++) {
    //         for (let k = 0; k < 255; k++) {
    //             colors.push(`rgb(${k}, ${j}, ${i})`);
    //         }
    //     }
    // }

    function getID(name) {
        return document.getElementById(name);
    }

    const button = getID('apply');
    let intervalId, run = 0;
    button.addEventListener('click', () => {
        if (!intervalId) {         //(button.innerHTML === 'Start') 
            button.innerHTML = 'Stop';
            colorChanger();
            intervalId = setInterval(colorChanger, milli);
        } else {
            button.innerHTML = 'Start';
            clearTimeout(intervalId);
            intervalId = null;
        }
    });

    function colorChanger() {
        if (run === colors.length) {
            run = 0;
        }
        document.body.style.backgroundColor = colors[run++];
        document.body.style.color = colors[colors.length - run];
    }
}());