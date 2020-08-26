(function () {
    'use strict';

    let colors = [], milli, intervalId, run = 0, randomMilli = 1000, phaseMilli = 50;
    const apply = getID('apply');
    getID('red').addEventListener('click', doPhase('red'));
    getID('blue').addEventListener('click', doPhase('blue'));
    getID('green').addEventListener('click', doPhase('green'));
    getID('random').addEventListener('click', doRandom);

    function doRandom() {
        reset(randomMilli);
        for (let i = 0; i < 10000; i++) {        //10,000 random colors. Want 1000 milliseconds
            colors.push(`rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`);
        }
    }
    function doPhase(phaseColor) {
        return function () {
            reset(phaseMilli);
            for (let i = 0; i < 256; i++) {         //for 256 of one of rgb. Want 50 milliseconds for this 
                if (phaseColor === 'blue') {
                    colors.push(`rgb(0, 0, ${i})`);
                } else if (phaseColor === 'green') {
                    colors.push(`rgb(0, ${i}, 0)`);
                } else {
                    colors.push(`rgb(${i}, 0, 0)`);
                }
            }
        };
    }
    function reset(m) {
        colors = [];
        milli = m;
        run = 0;
        clearInterval(intervalId);
        apply.innerHTML = 'Start';
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
    }

    function getID(name) {
        return document.getElementById(name);
    }
    apply.addEventListener('click', () => {
        if (milli) {
            if (!intervalId) {         //(button.innerHTML === 'Start') 
                apply.innerHTML = 'Stop';
                colorChanger();
                intervalId = setInterval(colorChanger, milli);
            } else {
                apply.innerHTML = 'Start';
                clearInterval(intervalId);
                intervalId = null;
            }
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