(function () {
  'use strict';

  const canvas = document.getElementById('theCanvas');
  const context = canvas.getContext('2d'); let grow = 0;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Snake {
    constructor(size, speed, img, goal, apple, x = 0, y = 0, direction = 'ArrowRight') {
      this.size = size;
      this.speed = speed;
      this.img = img;
      this.goal = goal;
      this.coords = [{ x: x, y: y }]
      // this.x = x;
      // this.y = y;
      // this.previousCoords = {};
      this.direction = direction;
      this.score = 0;
      this.apple = apple;
    }

    drawSnake() {
      this.img.addEventListener('load', () => {
        this.coords.forEach(c => context.drawImage(this.img, c.x, c.y, this.size, this.size));
        // context.drawImage(this.img, this.x, this.y, this.size, this.size);    //if regular function, would do for img just "this", but arrow, so this.img
        /*this.apple.img.addEventListener('load', this.apple.drawApple);*/
        let intervalID = setInterval(() => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          this.apple.drawApple();
          context.font = 'bold 58px fanatsy';
          context.fillStyle = 'purple';
          context.fillText(this.score, canvas.width - 120, 50);

          // this.previousCoords = {x: this.coords[0].x, y: this.coords[0].y};
          switch (this.direction) {
            case 'ArrowLeft':
              // this.x -= this.size;
              this.coords.forEach(c => c.x -= this.size);
              break;
            case 'ArrowRight':
              //this.x += this.size;
              this.coords.forEach(c => c.x += this.size);
              break;
            case 'ArrowUp':
              //this.y -= this.size;
              this.coords.forEach(c => c.y -= this.size);
              break;
            case 'ArrowDown':
              //this.y += this.size;
              this.coords.forEach(c => c.y += this.size);
              break;
          }
          // for (let i = 1; i < this.coords.length; i++) {
          //   this.coords[i].x = this.previousCoords.x;
          //   this.coords[i].y = this.previousCoords.y;
          // }

          // if (this.x === this.apple.x && this.y === this.apple.y) {
          if (this.coords[0].x === this.apple.x && this.coords[0].y === this.apple.y) {
            console.log('crunch');
            context.clearRect(0, 0, canvas.width, canvas.height);
            this.apple = new Apple(this.apple.img, this.apple.size);
            this.apple.drawApple();
            ++this.score;
            let crunch = document.createElement('audio'); crunch.src = 'sounds/eatingApple.mp3'; crunch.loop = false;
            crunch.play();

            this.coords.push({ x: this.coords[grow].x - this.size, y: this.coords[grow].y }); grow++;
            // console.log(this.coords, this.previousCoords);
          }

          context.fillStyle = 'green';
          // let previousCoords = {};
          this.coords.forEach((c, i) => {
            // if (c.x && c.y) {
            //   previousCoords.x = c.x;
            //   previousCoords.y = c.y;
            // }
            i === 0 ? context.drawImage(this.img, c.x, c.y, this.size, this.size) :
              context.fillRect(c.x, c.y, this.size, this.size);
          });
          // context.drawImage(this.img, this.x, this.y, this.size, this.size);
          drawWelcome();
          // if (this.x >= canvas.width || this.x < 0 || this.y < 0 || this.y >= canvas.height) {
          let hit = this.coords.filter(c => c.x === this.coords[0].x && c.y === this.coords[0].y && c !== this.coords[0])[0] || { x: null, y: null };
          if (this.coords[0].x >= canvas.width || this.coords[0].x < 0 || this.coords[0].y < 0 || this.coords[0].y >= canvas.height || (this.coords[0].x === hit.x && this.coords[0].y === hit.y)) {
            console.log('bang');
            let bang = document.createElement('audio'); bang.src = 'sounds/bang.m4a'; bang.loop = false;
            bang.play();
            clearInterval(intervalID);
            const over = document.createElement('div'); over.innerHTML = `GAME OVER!!<br/>You have earned ${this.score} points`; over.className = 'popUp';
            over.style.top = `${canvas.height / 3}px`; over.style.left = `${canvas.width / 5}px`;
            const restart = document.createElement('button'); restart.innerHTML = `RESART`; restart.className = 'restart';
            restart.addEventListener('click', () => { document.body.removeChild(over); startGame() });
            over.appendChild(restart); document.body.appendChild(over);
            context.clearRect(0, 0, canvas.width, canvas.height);
          }
        }, this.speed);
      });
    }
  }

  class Apple {
    constructor(img, size) {
      this.img = img;
      this.x = Apple.getRandomNumber('width');
      this.y = Apple.getRandomNumber('height');
      this.size = size;
    }
    drawApple() {
      context.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    static getRandomNumber(dir) {
      const div64 = Math.floor(canvas[dir] / 64); console.log(div64);
      return Math.floor(Math.random() * div64 + 1) * 64;
    }
  }


  //const img = document.getElementById('snakeHead');
  function startGame() {
    const SNAKE_SIZE = 64, GOAL = 10, intervalLength = 500, img = new Image();
    img.src = 'images/snakehead.png';

    const appleImg = new Image(), APPLE_SIZE = 64;
    appleImg.src = 'images/apple.png';
    const apple = new Apple(appleImg, APPLE_SIZE);
    // apple.drawApple();
    const snake = new Snake(SNAKE_SIZE, intervalLength, img, GOAL, apple);

    document.addEventListener('keydown', e => {
      console.log(e);
      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
          snake.direction = e.key;
      }
    });

    snake.drawSnake();
  }

  startGame();

  function drawWelcome() {
    context.fillStyle = 'blue';
    context.font = 'bold 38px fantasy';
    context.fillText('Welcome to SNAKE!!', canvas.width / 3, 150);
    context.fill();
  }
}());