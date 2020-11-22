import $ from 'jquery';
//const $ = require('jquery');
import './recipes.css';
import appleImg from '../../77/images/apple.png';
import snakeImg from '../../77/images/snakehead.png';
//const snakeImg = require('../../77/images/snakehead.png');

//(function () {
//'use strict';

const dName = $('#d-name'), dIng = $('#d-ing');
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

    fetch('recipes.json')
        .then(r => {
            if (!r.ok) {
                throw new Error(`Sorry! You got a ${r.status} which means ${r.statusText}`);
            }
            return r.json();
        })
        .then(r => {
            let name = r[find].name, ing = r[find].ingredients;
            dName.text(name);
            dIng.empty();
            ing.forEach((i, n) => {
                let sep = n === ing.length - 1 ? '' : ',';
                dIng.text(`${dIng.text()} ${i}${sep} `);
            });
            //results.show();
            img.prop('src', r[find].url).prop('alt', name).addClass('img')/*.show()*/.appendTo(results);
        })
        .catch(error => dName.text(error));

    const apple = new Image();
    const snake = new Image();
    apple.src = appleImg;
    snake.src = snakeImg;
    results.append(apple, snake);
}
//}());