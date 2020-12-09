export default class Stick {
    constructor(height, width, canvas, context, color, speed) {
        this.height = height;
        this.width = width;
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        this.x = (this.canvas.width - this.width) / 2;

        this.moveRight = false;
        this.moveLeft = false;
        if (!Stick.moveLength) { Stick.moveLength = speed }

        // this.makeStick();
        this.addEvents();

    }

    addEvents() {
        document.addEventListener("keydown", ev => {
            console.log(ev);
            if (ev.key == "ArrowRight" || ev.key == "Right") {
                this.moveRight = true;
            }
            else if (ev.key == "ArrowLeft" || ev.key == "Left") {
                this.moveLeft = true;
            }
        }, false);
        document.addEventListener("keyup", ev => {
            // console.log(ev);
            if (ev.key == "ArrowRight" || ev.key == "Right") {
                this.moveRight = false;
            }
            else if (ev.key == "ArrowLeft" || ev.key == "Left") {
                this.moveLeft = false;
            }
        }, false);
    }

    makeStick() {
        if (this.moveRight) {
            this.x += Stick.moveLength;
            if (this.x + this.width > this.canvas.width) {
                this.x = this.canvas.width - this.width;
            }
        }
        else if (this.moveLeft) {
            this.x -= Stick.moveLength;
            if (this.x < 0) {
                this.x = 0;
            }
        }

        this.context.beginPath();
        this.context.rect(this.x, this.canvas.height - this.height, this.width, this.height);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.closePath();

        // requestAnimationFrame(() => this.makeStick());
    }
}