(function () {
    'use strict';

    function getID(id) {
        return document.getElementById(id);
    }

    for (let i = 1; i <= 8; i++) {
        let section = getID(`section${i}`);
        let input = getID(`input${i}`);
        input.addEventListener('input', () => section.style.color = input.value);
        section.addEventListener('mouseover', () => {
            section.style.fontSize = '1.001rem';
            section.style.fontStyle = 'italic';
            section.style.fontFamily = 'impact, fantasy';
        });
        section.addEventListener('mouseleave', () => {
            section.style.fontSize = '1rem';
            section.style.fontStyle = 'normal';
            section.style.fontFamily = 'serif';
        });
    }

    const bg = getID('bg');
    bg.addEventListener('input', () => document.body.style.backgroundColor = bg.value);

    let moveLeft = 0, east = true;
    setInterval(go, 10);
    function go() {
        if (east) {
            bg.style.left = `${++moveLeft}px`;
            if (moveLeft >= screen.width) {
                east = false;
            }
        } else {
            bg.style.left = `${--moveLeft}px`;
            if (moveLeft < 0) {
                east = true;
            }
        }
    }
}());