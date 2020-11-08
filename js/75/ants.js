//(function () {
'use strict';

const canvas = document.getElementById('theCanvas'), intervalLength = 100, home = document.getElementById('home');
const homeX = 1250, homeY = 70, homeRadius = 50; let foodRestPlace = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
//let ants = [];

class Ant {
    // # experimental private so no one can change it - but makes jshint very unhappy
    // static #SIZE = 2;

    // js hint not ready for this experimental syntax yet
    static SIZE = 2; static stepsMin = 15; static stepsMax = 35; static ants = []; static maxNoFood = 10000; // jshint ignore:line

    constructor(context, color = '#000000') {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.color = color;
        this.context = context;
        this.draw();
        this.strength = 1;
        this.fighting = false;
        this.specific = false;
        this.counter = 0;
        this.specificX = Ant.getRandomNumber(-1, 1);
        this.specificY = Ant.getRandomNumber(-1, 1);
        this.steps = Ant.getRandomNumber(Ant.stepsMin, Ant.stepsMax);
        this.goingHome = false;
        this.noFood = 0;

        // static without using experimental syntax
        /*if (! Ant.SIZE) {
          Ant.SIZE = 2;
        }*/
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, Ant.SIZE, Ant.SIZE);
    }

    move() {
        if (!this.specific) {
            this.x += Ant.getRandomNumber(-1, 1);
            this.y += Ant.getRandomNumber(-1, 1);
            if (++this.counter === this.steps) {
                this.specific = true;
                this.counter = 0;
            }
        } else if (this.goingHome) {
            // this.x = home.style.left;
            // this.y = home.style.top;
            this.x = homeX;
            this.y = homeY;
            // this.goingHome = false;
        }
        else {
            this.x += this.specificX;
            this.y += this.specificY;
            if (++this.counter === this.steps) {
                this.specific = false;
                this.counter = 0;
                this.specificX = Ant.getRandomNumber(-1, 1);
                this.specificY = Ant.getRandomNumber(-1, 1);
                this.steps = Ant.getRandomNumber(Ant.stepsMin, Ant.stepsMax);
            }
        }


        if (this.x < Ant.SIZE) {
            this.x = Ant.SIZE;
        } else if (this.x > canvas.width - Ant.SIZE) {
            this.x = canvas.width - Ant.SIZE;
        }

        if (this.y < Ant.SIZE) {
            this.y = Ant.SIZE;
        } else if (this.y > canvas.height - Ant.SIZE) {
            this.y = canvas.height - Ant.SIZE;
        }

        this.draw();
        this.fight();

        if (++this.noFood >= Ant.maxNoFood) {
            Ant.ants = Ant.ants.filter(a => a !== this);
        }
    }
    goHome() {

    }

    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    fight() {
        Ant.ants.forEach(a => {
            if (a.x === this.x && a.y === this.y && a.color !== this.color && !this.fighting) {
                console.log('before fight', Ant.ants.length);
                this.fighting = true;
                const fight = document.createElement('div'); fight.innerHTML = 'FIGHT'; fight.className = 'fight';
                fight.style.top = `${this.y}px`; fight.style.left = `${this.x}px`;
                document.body.appendChild(fight);
                if (this.strength > a.strength) {
                    this.strength += a.strength; console.log('this', this.strength);
                    Ant.ants = Ant.ants.filter(ant => ant !== a);
                } else if (this.strength < a.strength) {
                    a.strength += this.strength; console.log('a', a.strength);
                    Ant.ants = Ant.ants.filter(ant => ant !== this);
                } else {
                    let random = Ant.getRandomNumber(0, 1), remove;// ? this : a;
                    if (random) { this.strength += a.strength; remove = this; } else { a.strength += this.strength; remove = a; }
                    Ant.ants = Ant.ants.filter(ant => ant !== random);
                }
                setTimeout(() => fight.remove(), 2000);
                this.fighting = false;
                console.log('after fight', Ant.ants.length);
            }
        });
    }
}

class Food {
    static SIZE = 8; static foods = []    //jshint ignore:line
    constructor(context, color = 'red') {
        this.context = context;
        this.color = color;
        this.x = Ant.getRandomNumber(10, canvas.width - 10);
        this.y = Ant.getRandomNumber(10, canvas.width - 10);
        this.isHome = false;
        this.draw();
    }
    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, Food.SIZE, Food.SIZE);
    }
    captured() {
        Ant.ants.forEach(ant => {
            if (this.x === ant.x && this.y === ant.y && !this.isHome) {
                console.log('captured', ant, this);
                ant.goingHome = true;
                ant.noFood = 0;
                let intervalId = setInterval(() => {
                    this.x = ant.x;
                    this.y = ant.y;
                    if (ant.x === /*home.style.left && ant.y === home.style.top*/homeX && ant.y === homeY) {
                        clearInterval(intervalId);
                        this.isHome = true;
                        setTimeout(() => { ant.goingHome = false; }, 500);
                    }
                }, intervalLength);
            }
        });
    }
}

const context = canvas.getContext('2d');
// let ants = [];
for (let i = 0; i < 200; i++) {
    Ant.ants.push(new Ant(context));
}
for (let i = 0; i < 250; i++) {
    Food.foods.push(new Food(context));
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
        Ant.ants.push(new Ant(context, antColor.value));
    }
});

function drawHome() {
    context.lineWidth = 7;
    context.beginPath();
    context.arc(homeX, homeY, homeRadius, 0, 2 * Math.PI, true);
    context.strokeStyle = 'blue';
    context.fillStyle = 'yellow';
    context.stroke();
    context.fill();
}


//}());