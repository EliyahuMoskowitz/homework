export default class Fruit {
    constructor(img, size, allValues) {
        this.img = img;
        this.size = size;
        this.all = allValues;
        // this.canvas = allValues.canvas;
        /*if (!Fruit.canvas) {*/ Fruit.canvas = allValues.canvas;// }
        //do {
        this.x = Fruit.getRandomNumber('width');
        this.y = Fruit.getRandomNumber('height');
        //} while (snake.isOnTopOf(this.x, this.y));
        //} while (snake.coords.some(c => c.x === this.x && c.y === this.y));
        if (!Fruit.i) { Fruit.i = 0; }
    }

    drawApple() {
        if (Fruit.i++ < 1) {
            this.img.addEventListener('load', () => this.all.context.drawImage(this.img, this.x, this.y, this.size, this.size));
        } else {
            this.all.context.drawImage(this.img, this.x, this.y, this.size, this.size);
        }
    }
    static getRandomNumber(dir) {
        const div64 = Math.floor(Fruit.canvas[dir] / 64); console.log(div64);
        return Math.floor(Math.random() * div64 + 1) * 64;
    }
}