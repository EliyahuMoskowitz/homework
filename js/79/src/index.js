import $ from 'jquery';
//const $ = require('jquery');
import './recipes.css';
import appleImg from '../../77/images/apple.png';
import snakeImg from '../../77/images/snakehead.png';
//const snakeImg = require('../../77/images/snakehead.png');

//(function () {
//'use strict';

// const dName = $('#d-name'), dIng = $('#d-ing');
const dName = $('<div id="d-name"></div>'), dIng = $('<div id="d-ing"></div>');
const results = $('#results');//.hide();
const img = $('<img>');


$('button').on('click', function () {
    showRecipe(this.id);
});
$('#clear').on('click', () => {
    // dName.empty();
    // dIng.empty();
    // img.hide();
    results.empty();
});

function showRecipe(find) {

    fetch('../src/recipes.json')
        .then(r => {
            if (!r.ok) {
                throw new Error(`Sorry! You got a ${r.status} which means ${r.statusText}`);
            }
            return r.json();
        })
        .then(r => {
            let name = r[find].name, ing = r[find].ingredients;
            dName.text(name).appendTo(results);
            dIng.empty();
            ing.forEach((i, n) => {
                let sep = n === ing.length - 1 ? '' : ',';
                dIng.text(`${dIng.text()} ${i}${sep} `);
            });
            dIng.appendTo(results);
            //results.show();
            img.prop('src', r[find].url).prop('alt', name).addClass('img')/*.show()*/.appendTo(results);
        })
        .catch(error => dName.text(error).appendTo(results));

    const apple = new Image();
    const snake = new Image();
    apple.src = appleImg;
    snake.src = snakeImg;
    results.append(apple, snake);
}
//}());