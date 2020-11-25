import Ant from './Ant.js';
import Food from './Food.js';
import './ants.css';

// (function () {
//     'use strict';

const canvas = document.getElementById('theCanvas'), intervalLength = 16.66,// home = document.getElementById('home');
    homeRightX = 1250, homeRightY = 170, homeRightRadius = 50,
    homeLeftX = 100, homeLeftY = 170, homeLeftRadius = 50, midCanvas = 675, lengthOfPopUp = 12;

const allValues = {
    intervalLength: intervalLength, homeRightX: homeRightX, homeRightY: homeRightY, homeRightRadius: homeRightRadius,
    homeLeftX: homeLeftX, homeLeftY: homeLeftY, homeLeftRadius: homeLeftRadius, midCanvas: midCanvas, lengthOfPopUp: lengthOfPopUp
};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const context = canvas.getContext('2d');
const initialAnts = 200, initialFood = 250;// let ants = [];
for (let i = 0; i < initialAnts; i++) {
    let ant = new Ant(context, canvas, allValues);
    Ant.ants.push(ant);
}
for (let i = 0; i < initialFood; i++) {
    let food = new Food(context, canvas, allValues);
    Food.foods.push(food);
}

setInterval(() => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawHome();
    Ant.ants.forEach(ant => ant.move());
    Food.foods.forEach(food => { food.draw(); food.captured(); });
}, intervalLength);

const amount = document.getElementById('amount'), add = document.getElementById('add'), antColor = document.getElementById('color');
add.addEventListener('click', () => {
    for (let i = 0; i < amount.value; i++) {
        Ant.ants.push(new Ant(context, canvas, allValues, antColor.value));
    }
});

const amountFood = document.getElementById('amountFood'), addFood = document.getElementById('addFood'), foodColor = document.getElementById('colorFood');
addFood.addEventListener('click', () => {
    for (let i = 0; i < amountFood.value; i++) {
        Food.foods.push(new Food(context, canvas, allValues, foodColor.value));
    }
});

/*if(Food.foods){*/document.getElementById('clearFood').addEventListener('click', () => { Food.foods.forEach(f => f.isCleared = true); Food.foods = []; });
/*if(Ant.ants){*/document.getElementById('clearAnts').addEventListener('click', () => {
    Ant.ants.forEach(ant => ant.isDead = true);
    Ant.ants = [];
});

function drawHome() {
    context.lineWidth = 7;
    context.beginPath();
    context.arc(homeRightX, homeRightY, homeRightRadius, 0, 2 * Math.PI, true);
    context.stroke();
    context.strokeStyle = 'blue';
    context.fillStyle = 'yellow';
    context.stroke();
    context.fill();
    context.beginPath();
    context.arc(homeLeftX, homeLeftY, homeLeftRadius, 0, 2 * Math.PI, true);

    context.fillStyle = 'purple';
    context.fillText('LEFT HOME', homeLeftX - 27, homeLeftY - 60);
    context.fillText('RIGHT HOME', homeRightX - 28, homeRightY - 60);
    context.stroke();
    context.strokeStyle = 'blue';
    context.fillStyle = 'yellow';
    context.stroke();
    context.fill();
}


// }());