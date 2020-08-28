(function () {
    'use strict';

    const link = document.createElement('link');
    link.setAttribute('href', 'HW_61.css');
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);

    function getID(name) {
        return document.getElementById(name);
    }
    function css(element, property, value) {
        element.style[property] = value;
    }

    let colors = [], milli, intervalId, run = 0, randomMilli = 1000, phaseMilli = 50, isRandom, firstTime = true;
    const apply = getID('apply'), body = getID('body'), table = getID('table');
    getID('red').addEventListener('click', doPhase('red'));
    getID('blue').addEventListener('click', doPhase('blue'));
    getID('green').addEventListener('click', doPhase('green'));
    getID('random').addEventListener('click', doRandom);

    function getColorPart() {
        return Math.floor(Math.random() * 256);
    }

    function doRandom() {
        reset(randomMilli);
        isRandom = true;
        for (let i = 0; i < 10000; i++) {        //10,000 random colors. Want 1000 milliseconds
            colors.push(`rgb(${getColorPart()}, ${getColorPart()}, ${getColorPart()})`);
        }
    }
    let isAlready;
    function doPhase(phaseColor) {
        return function () {
            reset(phaseMilli);
            isAlready = true;
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
        if (m === 50) {
            run = 0;
        }
        clearInterval(intervalId);
        apply.innerHTML = 'Start';
        css(body, 'backgroundColor', 'white');
        css(body, 'color', 'black');
        isRandom = false;
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
        css(body, 'backgroundColor', colors[run++]);
        css(body, 'color', colors[colors.length - run]);
        if (isRandom) {
            tableChanger();
        }
    }
    let numOfRows = 0, midOfInterval;
    function tableChanger() {
        if (firstTime) {
            table.deleteRow(1);
            firstTime = false;
        }
        midOfInterval = true;
        ++numOfRows;
        let row = table.insertRow();
        let cellTime = row.insertCell();
        let cellTextColor = row.insertCell();
        let cellBackgroundColor = row.insertCell();

        const now = new Date();
        cellTime.innerHTML = now.toLocaleString();
        cellTextColor.innerHTML = colors[colors.length - run];
        cellBackgroundColor.innerHTML = colors[run - 1];

        row.addEventListener('click', event => {
            if (!event.ctrlKey) {
                css(body, 'color', cellTextColor.innerHTML);
                css(body, 'backgroundColor', cellBackgroundColor.innerHTML);
            } else {
                if (event.target === cellTextColor) {
                    css(body, 'color', event.target.innerHTML);
                } else if (event.target === cellBackgroundColor) {
                    css(body, 'backgroundColor', event.target.innerHTML);
                }
            }
        });
        midOfInterval = false;
    }

    getID('resetTable').addEventListener('click', () => {
        if (!midOfInterval && isRandom) {               //otherwise 'numOfRows' is higher than actual numOfRows
            reset();
            for (let i = numOfRows; i > 0; i--) {
                table.deleteRow(i);
            }
            if (numOfRows > 0) {
                isAlready = false;
            }
            numOfRows = 0;
            if (!isAlready) {
                let noDataRow = table.insertRow();
                let noDataCell = noDataRow.insertCell();
                noDataCell.setAttribute('colspan', '3');
                noDataCell.innerHTML = 'No DATA Yet';
                css(noDataCell, 'textAlign', 'center');
                firstTime = true;
                isAlready = true;
            }
        }
    });
}());