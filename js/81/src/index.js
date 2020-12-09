/*global module*/
import './index.css';
import B from './budget.js';
import Ball from './ball.js';
import Racket from './stick.js';
import Brick from './brick.js';
import $ from 'jquery';

const ourBudget = new B();

const canvas = document.getElementById('theCanvas');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const context = canvas.getContext('2d'), BALL_RADIUS = 20, amountColors = 100;

let ballSpeed = 6, ballAmount = 5, paddleSpeed = 10, brickAmount = 100;//, intervalId;

// const ballSpeedInput = $('#ballSpeed'), ballAmountInput = $('#ballAmount'), paddleSpeedInput = $('#paddleSpeed'), brickAmountInput = $('#brickAmount');
// $('#saveCanvasDetails').on('click', () => {
//     ballSpeed = ballSpeedInput.val() || ballSpeed;
//     ballAmount = ballAmountInput.val() || ballAmount;
//     paddleSpeed = paddleSpeedInput.val() || paddleSpeed;
//     brickAmount = brickAmountInput.val() || brickAmount;
//     if (intervalId) { clearInterval(intervalId) }
//     runGame();
// });

const paddleWidth = 300, paddleHieght = 25, brickWidth = 100, brickHeight = 50;
let colors = [], runBalls = 0, runBricks = 0, play = true;//, once;
for (let i = 0; i < amountColors; i++) {
    colors.push(`rgb(${Math.random() * 256}, ${/*Math.random() * 256*/0}, ${Math.random() * 256})`);
}

// function runGame() {
const racket = new Racket(paddleHieght, paddleWidth, canvas, context, colors[Math.random() * amountColors/*colors.length*/], paddleSpeed);

let balls = [];
pushBalls();
function pushBalls() {
    for (let i = 0; i < ballAmount; i++) {
        balls.push(new Ball(BALL_RADIUS, canvas, context, colors[runBalls++]/*, balls*/, racket, ballSpeed));
    }
}

let bricks = [];
pushBricks();
function pushBricks() {
    for (let i = 0; i < brickAmount; i++) {
        bricks.push(new Brick(canvas, context, colors[runBricks++], brickWidth, brickHeight, balls));
    }
}

// requestAnimationFrame(() => {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     balls.forEach(b => b.drawBall());
//     racket.makeStick();
// });
let lost, won;
let intervalId = setInterval(() => {
    if (play) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        //if (balls.length > 0) {
        balls.forEach(b => {
            if (b.alive) {
                b.drawBall()
            }
            lost = balls.every(b => !b.alive);
        });
        // } else if (!once) {
        //     makeRestart(); once = true;
        // }
        racket.makeStick();
        bricks.forEach(br => {
            if (br.alive) {
                br.makeBrick()
            }
            won = bricks.every(br => !br.alive);
        });
        if (won || lost) {
            won ? endGame('WON') : endGame('LOST');
            play = false;
            clearInterval(intervalId);
        }
    }
}, 20);
// }

function endGame(wonLost) {
    $(`<div id="wonLostDiv">GAME OVER!! YOU <span>${wonLost}</span>!!</div>`).appendTo(document.body);
}


document.addEventListener("keydown", ev => {
    console.log(ev);
    if (ev.key == " ") {
        play = !play;
    }
});

// const restart = $('<button id="restart">RESTART</button>').appendTo(document.body).on('click', () => {
//     restart.hide();
//     console.log('clicked restart');
//     pushBalls();
// });

// function makeRestart() {
//     console.log('in make Restart');
//     // restart.show();
//     restart.css('display', 'block');
// }

if (module.hot) {
    module.hot.accept('./budget.js', function () {
        console.log('Accepting the updated BUDGET module!');
        ourBudget.calcBudget();
    })
}