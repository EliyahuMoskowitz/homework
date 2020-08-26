'use strict';

let backColor = prompt('choose background color');
let txtColor = prompt('choose text color');

let body = document.getElementById('back');
let section = document.getElementById('txt');

body.style.backgroundColor = backColor;
section.style.color = txtColor;
