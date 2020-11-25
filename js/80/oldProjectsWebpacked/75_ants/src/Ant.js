export default class Ant {
    // # experimental private so no one can change it - but makes jshint very unhappy
    // static #SIZE = 2;

    // js hint not ready for this experimental syntax yet- neither is webpack without babel
    //static SIZE = 2; static stepsMin = 15; static stepsMax = 35; static ants = []; static maxNoFood = 10000; // jshint ignore:line

    constructor(context, canvas, allValues, color = '#000000') {
        this.canvas = canvas;
        this.all = allValues;
        this.x = this.canvas.width / 2;  //homeX;
        this.y = this.canvas.height / 2; //homeY;
        this.color = color;
        this.context = context;
        this.draw();
        this.strength = 1;
        this.fighting = false;
        this.isDead = false;
        this.specific = false;
        this.counter = 0;
        this.specificX = Ant.getRandomNumber(-1, 1);
        this.specificY = Ant.getRandomNumber(-1, 1);
        this.steps = Ant.getRandomNumber(Ant.stepsMin, Ant.stepsMax);
        this.goingHome = false;
        this.wayHomeX = 0;
        this.wayHomeY = 0;
        this.randomX = 0;
        this.randomY = 0;
        this.noFood = 0;

        // static without using experimental syntax
        //static SIZE = 2; static stepsMin = 15; static stepsMax = 35; static ants = []; static maxNoFood = 10000;
        if (!Ant.SIZE) { Ant.SIZE = 2; } if (!Ant.stepsMin) { Ant.stepsMin = 15; } if (!Ant.stepsMax) { Ant.stepsMax = 35; }
        if (!Ant.maxNoFood) { Ant.maxNoFood = 10000; } if (!Ant.ants) { Ant.ants = []; }
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
            this.x += this.wayHomeX;
            this.y += this.wayHomeY;
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
        } else if (this.x > this.canvas.width - Ant.SIZE) {
            this.x = this.canvas.width - Ant.SIZE;
        }

        if (this.y < Ant.SIZE) {
            this.y = Ant.SIZE;
        } else if (this.y > this.canvas.height - Ant.SIZE) {
            this.y = this.canvas.height - Ant.SIZE;
        }

        this.draw();
        this.fight();

        if (++this.noFood >= Ant.maxNoFood) {
            Ant.ants = Ant.ants.filter(a => a !== this);
        }
    }

    static getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    fight() {
        Ant.ants.forEach(a => {
            if (a.x === this.x && a.y === this.y && a.color !== this.color && !this.fighting) {
                console.log('Ants before fight', Ant.ants.length);
                this.fighting = true;
                const fight = document.createElement('div'); fight.innerHTML = 'FIGHT'; fight.className = 'popUp';
                fight.style.top = `${this.y}px`; fight.style.left = `${this.x}px`;
                document.body.appendChild(fight);
                if (this.strength > a.strength) {
                    this.strength += a.strength; console.log('this Winner has', this.strength, 'strength'); //fight.innerHTML = `FIGHT! ${this.color} wins and ${a.color} dies!`;
                    Ant.ants = Ant.ants.filter(ant => ant !== a);
                    a.isDead = true;
                } else if (this.strength < a.strength) {
                    a.strength += this.strength; console.log('a Winner has', a.strength, 'strength'); //fight.innerHTML = `FIGHT! ${a.color} wins and ${this.color} dies!`;
                    Ant.ants = Ant.ants.filter(ant => ant !== this);
                    this.isDead = true;
                } else {
                    let random = Ant.getRandomNumber(0, 1), remove, winner;// ? this : a;
                    if (random) {
                        this.strength += a.strength; remove = a; winner = this;
                    } else { a.strength += this.strength; remove = this; winner = a; }
                    console.log('this Winner has', winner.strength, 'strength(was random)'); //fight.innerHTML = `FIGHT! ${winner.color} wins and ${remove.color} dies!`;
                    Ant.ants = Ant.ants.filter(ant => ant !== remove);
                    remove.isDead = true;
                }
                setTimeout(() => fight.remove(), this.all.intervalLength * this.all.lengthOfPopUp);
                this.fighting = false;
                console.log('Ants after fight', Ant.ants.length);
            }
        });
    }
}