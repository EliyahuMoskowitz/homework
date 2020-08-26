(function () {
    'use strict';

    const cl = document.getElementById('click');
    cl.style.color = 'blue';
    cl.style.backgroundColor = 'red';
    cl.style.padding = '1em';
    cl.style.position = 'fixed';
    cl.style.top = '125px';
    cl.style.left = '105px';

    let idRight, idLeft;
    cl.addEventListener('click', event => {
        if (event.ctrlKey) {
            console.log('gtjb');
            clearInterval(idRight);
            clearInterval(idLeft);
        } else if (!idRight) {
            idRight = setInterval(moveRight, 60);
            cl.innerHTML = 'to the Right!';
            cl.style.color = 'white';
            cl.style.backgroundColor = 'blue';
            cl.style.top = `${Math.random() * 350}px`;
            cl.style.padding = '4em';
            clearInterval(idLeft);
        } else {
            clearInterval(idRight);
            idLeft = setInterval(moveLeft, 75);
            idRight = null;
            cl.style.color = 'red';
            cl.style.backgroundColor = 'yellow';
            cl.style.top = `${(Math.random() * 350) + 1}px`;
            cl.style.padding = '2em';
            cl.innerHTML = 'to the Left!';
        }
    });

    function moveRight() {
        cl.style.left = `${parseInt(cl.style.left) + 5}px`;
    }
    function moveLeft() {
        cl.style.left = `${parseInt(cl.style.left) - 4}px`;
    }
    let accepted;
    let button = document.getElementById('button');
    button.addEventListener('click', () => {
        console.log('license accepted');
        accepted = true;
        alert('License accepted. Thank You!');
        button.remove();
    });

    let anchor = document.getElementById('anchor');
    anchor.addEventListener('click', event => {
        console.log('anchor clicked');
        if (!accepted) {
            event.preventDefault();
            alert('you must first accept the terms to enter the restaraunt');
        }
    });

    /*   window.colors = [];
    for (let i = 0; i < 255; i++) {
        for (let j = 0; j < 255; j++) {
            for (let k = 0; k < 255; k++) {
                colors.push(`rgb(${i}, ${j}, ${k})`);
            }
        }
    }
    let back = document.getElementById('back');

    function setBackground(x) {
        back.style.backgroundColor = colors[x];
    }

    function cycle() {
        for (let i = 0; i < colors.length; i++) {
            setTimeout(setBackground(i), 2500);
        }
        cycle();
    }
    setTimeout(cycle(), 5000);
*/
}());
