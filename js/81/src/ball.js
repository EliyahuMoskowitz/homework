// import Paddle from './stick.js';

export default class Ball {
    constructor(radius, canvas, context, color/*, balls*/, paddle, speed) {
        this.radius = radius;
        this.color = color;
        this.deltaX = speed;
        this.deltaY = speed;
        this.canvas = canvas;
        this.context = context;
        // this.balls = balls;
        this.paddle = paddle;
        this.alive = true;

        if (!Ball.globalX) { Ball.globalX = 0/*this.canvas.width / 2*/; }
        if (!Ball.globalY) { Ball.globalY = 0/*this.canvas.height - this.paddle.height - 500*/; }
        this.spotX = this.radius + Ball.globalX;
        this.spotY = this.radius + Ball.globalY;
        this.x = this.spotX;
        this.y = this.spotY;
        Ball.globalX += (this.radius * 2);
        Ball.globalY += (this.radius * 2);

        // this.drawBall();
    }

    drawBall() {
        // this.context.clearRect(this.x - this.spotX, this.y - this.spotY, this.x + this.spotX, this.y + this.spotY);
        // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.x += this.deltaX;
        this.y += this.deltaY;

        if (this.x < this.radius || this.x > this.canvas.width - this.radius) {
            this.deltaX = -this.deltaX;
        }
        if (this.y < this.radius || (this.y > this.canvas.height - this.paddle.height && (this.x >= this.paddle.x && this.x <= this.paddle.x + this.paddle.width))
                        /*|| this.y > this.canvas.height - this.radius*/) {
            this.deltaY = -this.deltaY;
        }
        if (this.y > this.canvas.height/* - this.radius*/) {
            this.alive = false;
            // this.balls = this.balls.filter(b => b != this);
            console.log('OUT');
        }

        this.context.beginPath();

        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();

        // requestAnimationFrame(() => this.drawBall());
        // setTimeout(() => this.drawBall(), 10);
    }
}