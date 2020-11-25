import snakehead from './images/snakehead.png';
import applePicImported from './images/apple.png';
import Reptile from './snake.js';
import Fruit from './apple.js';
import './snake.css';


;// (function () {
//     'use strict';

const canvas = document.getElementById('theCanvas');
const context = canvas.getContext('2d'); //let snake;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const allValues = { canvas: canvas, context: context, drawWelcome: drawWelcome, startGame: startGame };

//const img = document.getElementById('snakeHead');
function startGame() {
    const SNAKE_SIZE = 64, GOAL = 0, intervalLength = 500, snakeImage = new Image();
    snakeImage.src = snakehead;
    const appleImg = new Image(), APPLE_SIZE = 64;
    appleImg.src = applePicImported;
    const apple = new Fruit(appleImg, APPLE_SIZE, allValues);
    // apple.drawApple();
    let snake = new Reptile(SNAKE_SIZE, intervalLength, snakeImage, GOAL, apple, allValues);

    document.addEventListener('keydown', e => {
        console.log(e);
        switch (e.key) {
            case 'ArrowUp':
                if (snake.direction !== 'ArrowDown' || snake.coords.length === 1) {
                    snake.direction = e.key
                } break;
            case 'ArrowDown':
                if (snake.direction !== 'ArrowUp' || snake.coords.length === 1) {
                    snake.direction = e.key
                } break;
            case 'ArrowLeft':
                if (snake.direction !== 'ArrowRight' || snake.coords.length === 1) {
                    snake.direction = e.key
                } break;
            case 'ArrowRight':
                if (snake.direction !== 'ArrowLeft' || snake.coords.length === 1) {
                    snake.direction = e.key
                } break;
            case ' ':
                snake.paused = !snake.paused;
        }
    });
    if (localStorage.highScore) {
        snake.highScore = localStorage.highScore;
    }
    snake.drawSnake();
}

startGame();

function drawWelcome() {
    context.fillStyle = 'blue';
    context.font = 'bold 38px fantasy';
    context.fillText('Welcome to SNAKE!!', canvas.width / 3, 150);
    context.fill();
}

// }());