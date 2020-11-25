import Fruit from './apple.js';
let bangSound, crunchSound;// import bangSound from './sounds/bang.m4a';
// import crunchSound from './sounds/eatingApple.mp3'

export default class Reptile {
    constructor(size, speed, img, goal, apple, allValues, x = 0, y = 0, direction = 'ArrowRight') {
        this.size = size;
        this.speed = speed;
        this.img = img;
        this.highScore = goal;
        this.coords = [{ x: x, y: y }]
        // this.x = x;
        // this.y = y;
        this.previousCoords = [{}];
        this.direction = direction;
        this.score = 0;
        this.apple = apple;
        this.all = allValues;
        this.paused = false;
        this.gameOver = false;
    }

    drawSnake() {
        this.img.addEventListener('load', () => {
            this.all.context.drawImage(this.img, this.x, this.y, this.size, this.size);    //if regular function, would do for img just "this", but arrow, so this.img
            /*this.apple.img.addEventListener('load', this.apple.drawApple);*/
            setTimeout(() => this.gameLoop(), this.speed);
        });
    }

    gameLoop() {
        if (!this.paused) {
            this.all.context.clearRect(0, 0, this.all.canvas.width, this.all.canvas.height);
            this.apple.drawApple();
            this.all.context.font = 'bold 58px fanatsy';
            this.all.context.fillStyle = 'purple';
            this.all.context.fillText(`SCORE: ${this.score}`, this.all.canvas.width - 400, 150);
            this.all.context.fillText(`HIGH SCORE: ${this.highScore}`, this.all.canvas.width - 470, 70);

            for (let i = 0; i < this.previousCoords.length; i++) {
                this.previousCoords[i] = { x: this.coords[i].x, y: this.coords[i].y };
            }
            // this.previousCoords.forEach((pc, i) => pc = { x: this.coords[i].x, y: this.coords[i].y });
            switch (this.direction) {
                case 'ArrowLeft':
                    this.coords[0].x -= this.size;
                    //this.coords.forEach(c => c.x -= this.size);
                    break;
                case 'ArrowRight':
                    this.coords[0].x += this.size;
                    //this.coords.forEach(c => c.x += this.size);
                    break;
                case 'ArrowUp':
                    this.coords[0].y -= this.size;
                    //this.coords.forEach(c => c.y -= this.size);
                    break;
                case 'ArrowDown':
                    this.coords[0].y += this.size;
                    //this.coords.forEach(c => c.y += this.size);
                    break;
            }
            for (let i = 1; i < this.coords.length; i++) {
                this.coords[i].x = this.previousCoords[i - 1].x;
                this.coords[i].y = this.previousCoords[i - 1].y;
            }

            // if (this.x === this.apple.x && this.y === this.apple.y) {
            if (this.coords[0].x === this.apple.x && this.coords[0].y === this.apple.y) {
                console.log('crunch');
                this.all.context.clearRect(0, 0, this.all.canvas.width, this.all.canvas.height);
                this.apple = new Fruit(this.apple.img, this.apple.size, this.all);
                this.apple.drawApple();
                ++this.score;
                this.speed *= 0.9;
                let crunch = document.createElement('audio'); crunch.src = crunchSound || './sounds/eatingApple.mp3'; crunch.loop = false;
                crunch.play();

                this.coords.push({ x: this.previousCoords[this.previousCoords.length - 1].x, y: this.previousCoords[this.previousCoords.length - 1].y });
                this.previousCoords.push({});
            }

            this.all.context.fillStyle = 'green';
            this.coords.forEach((c, i) =>
                i === 0 ? this.all.context.drawImage(this.img, c.x, c.y, this.size, this.size) :
                    this.all.context.fillRect(c.x, c.y, this.size, this.size));
            //this.all.context.arc(c.x, c.y, this.size / 2, 0, 2 * Math.PI, true));
            // this.all.context.drawImage(this.img, this.x, this.y, this.size, this.size);
            this.all.drawWelcome();
            // if (this.x >= this.all.canvas.width || this.x < 0 || this.y < 0 || this.y >= this.all.canvas.height) {
            let hit = this.coords.filter(c => c.x === this.coords[0].x && c.y === this.coords[0].y && c !== this.coords[0])[0] || { x: null, y: null };
            if (this.coords[0].x >= this.all.canvas.width || this.coords[0].x < 0 || this.coords[0].y < 0 || this.coords[0].y >= this.all.canvas.height || (this.coords[0].x === hit.x && this.coords[0].y === hit.y)) {
                console.log('bang');
                let bang = document.createElement('audio'); bang.src = bangSound || './sounds/bang.m4a'; bang.loop = false;
                bang.play();
                this.gameOver = true;
                const over = document.createElement('div'); over.innerHTML = `GAME OVER!!<br/>You have earned ${this.score} points`; over.className = 'popUp';
                over.style.top = `${this.all.canvas.height / 3}px`; over.style.left = `${this.all.canvas.width / 5}px`;
                const restart = document.createElement('button'); restart.innerHTML = `RESTART`; restart.className = 'restart';
                restart.addEventListener('click', () => { document.body.removeChild(over); this.gameOver = false; this.all.startGame() });
                over.appendChild(restart); document.body.appendChild(over);
                //this.all.context.clearRect(0, 0, this.all.canvas.width, this.all.canvas.height);
                if (!localStorage.highScore || localStorage.highScore < this.score) {
                    localStorage.highScore = this.score;
                }
            }
        }
        if (!this.gameOver) {
            setTimeout(() => this.gameLoop(), this.speed);
        }
    }
    // isOnTopOf(x, y) {
    //     return this.coords.some(c => c.x === x && c.y === y);
    // }
}