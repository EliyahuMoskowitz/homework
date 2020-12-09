export default class Brick {
    constructor(canvas, context, color, width, height, balls) {
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        this.width = width;
        this.height = height;
        this.alive = true;
        this.balls = balls;

        if (!Brick.globalX) { Brick.globalX = 0; } if (!Brick.globalY) { Brick.globalY = 0; }
        if (!Brick.space) { Brick.space = 2; }

        this.x = Brick.globalX;
        this.y = Brick.globalY;

        Brick.globalX += this.width + Brick.space;
        if (Brick.globalX > this.canvas.width) {
            Brick.globalX = 0;
            Brick.globalY += this.height + Brick.space;
        }
        //this.makeBrick();
    }

    makeBrick() {
        this.context.beginPath();

        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.fill();
        this.context.closePath();

        this.balls.forEach(b => {
            if (b.x > this.x && b.x < this.x + this.width && b.y > this.y && b.y < this.y + this.height) {
                this.alive = false;
                b.deltaY = -b.deltaY;
            }
        });
    }

}