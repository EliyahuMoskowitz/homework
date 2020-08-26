'use strict';
//1
function multiply(x, y) {
    return x * y;
}

let result = multiply(5, 4);
console.log(result);
result = multiply(2, 7);
console.log(result);
console.log(multiply(7, 52));
console.log(multiply(12, 25));
//2
function getMultiplier() {
    return multiply;
    //return function (x, y) { return x * y; };
}
let m = getMultiplier();
console.log(m(5, 54));

//3
function getMultiplier2(x) {
    return function (y) {
        return x * y;
    };
}
let m2 = getMultiplier2(4);
console.log(m2(7));

//outer taking both param
function getMultiplier3(p, q) {
    return function () {
        return p * q;
    };
}
let m3 = getMultiplier3(5, 3);
console.log(m3());

//game
let r = document.getElementById('result');
document.getElementById('play').addEventListener('click', playMultiply);
let games = 0;
function playMultiply() {
    let one = prompt('first number');
    let two = prompt('second number');
    if (one * two == ++games) {
        r.innerHTML = `JACKPOT! $${games}`;
    } else { r.innerHTML = multiply(one, two); }
}
document.getElementById('reset').addEventListener('click', function () { r.innerHTML = ''; games = 0; });
