import Ant from './Ant.js';

export default class Food {

    //static SIZE = 8; static foods = []    //jshint ignore:line        webpack won't let without babel
    //will put in constructor-see there
    constructor(context, canvas, allValues, color = 'red') {
        this.all = allValues;
        this.context = context;
        this.canvas = canvas;
        this.color = color;
        this.x = Ant.getRandomNumber(150, this.canvas.width - 170);
        this.y = Ant.getRandomNumber(100, this.canvas.width - 250);
        this.isHome = false;
        this.isCleared = false;
        this.draw();

        if (!Food.SIZE) { Food.SIZE = 8; } if (!Food.foods) { Food.foods = []; }
    }
    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, Food.SIZE, Food.SIZE);
    }
    captured() {
        Ant.ants.forEach(ant => {
            if (this.x === ant.x && this.y === ant.y && !this.isHome && !ant.goingHome) {
                console.log('captured', ant, this);
                this.isHome = true;
                ant.goingHome = true;
                ant.noFood = 0;

                let theHomeX, theHomeY;
                if (this.x < this.all.midCanvas) {
                    theHomeX = this.all.homeLeftX; theHomeY = this.all.homeLeftY;
                } else {
                    theHomeX = this.all.homeRightX; theHomeY = this.all.homeRightY;
                }

                let intervalId = setInterval(() => {
                    if (ant.isDead) { this.isHome = false; }
                    if (this.isCleared) { ant.goingHome = false; }

                    ant.wayHomeX = (ant.x - theHomeX) < 0 ? 1 : -1;
                    ant.wayHomeY = (ant.y - theHomeY) < 0 ? 1 : -1;
                    this.x = ant.x;
                    this.y = ant.y; const discrepancy = 10;     ///*home.style.left && ant.y === home.style.top*/(homeX -10 /* + ant.randomX*/
                    if (ant.x > (theHomeX - discrepancy) && ant.x < (theHomeX + discrepancy) && ant.y > (theHomeY - discrepancy) && ant.y < (theHomeY + discrepancy)) {
                        console.log('before HOME', Food.foods.length);
                        const eaten = document.createElement('div'); eaten.innerHTML = 'EATEN'; eaten.className = 'popUp';
                        eaten.style.top = `${this.y}px`; eaten.style.left = `${this.x}px`;
                        document.body.appendChild(eaten);
                        setTimeout(() => eaten.remove(), this.all.intervalLength * this.all.lengthOfPopUp); this.isCleared = true;
                        Food.foods = Food.foods.filter(f => f !== this);
                        console.log('after HOME', Food.foods.length);
                        ant.goingHome = false;
                        clearInterval(intervalId);
                    }
                }, this.all.intervalLength);
            }
        });
    }
}