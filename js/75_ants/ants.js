(function () {
    'use strict';

    const canvas = document.getElementById('theCanvas'), intervalLength = 16.66,// home = document.getElementById('home');
        homeRightX = 1250, homeRightY = 170, homeRightRadius = 50,
        homeLeftX = 100, homeLeftY = 170, homeLeftRadius = 50, midCanvas = 675, lengthOfPopUp = 12;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Ant {
        // # experimental private so no one can change it - but makes jshint very unhappy
        // static #SIZE = 2;

        // js hint not ready for this experimental syntax yet
        static SIZE = 2; static stepsMin = 15; static stepsMax = 35; static ants = []; static maxNoFood = 10000; // jshint ignore:line

        constructor(context, color = '#000000') {
            this.x = canvas.width / 2;  //homeX;
            this.y = canvas.height / 2; //homeY;
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
                    setTimeout(() => fight.remove(), intervalLength * lengthOfPopUp);
                    this.fighting = false;
                    console.log('Ants after fight', Ant.ants.length);
                }
            });
        }
    }

    class Food {
        static SIZE = 8; static foods = []    //jshint ignore:line
        constructor(context, color = 'red') {
            this.context = context;
            this.color = color;
            this.x = Ant.getRandomNumber(150, canvas.width - 170);
            this.y = Ant.getRandomNumber(100, canvas.width - 250);
            this.isHome = false;
            this.isCleared = false;
            this.draw();
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
                    if (this.x < midCanvas) {
                        theHomeX = homeLeftX; theHomeY = homeLeftY;
                    } else {
                        theHomeX = homeRightX; theHomeY = homeRightY;
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
                            setTimeout(() => eaten.remove(), intervalLength * lengthOfPopUp); this.isCleared = true;
                            Food.foods = Food.foods.filter(f => f !== this);
                            console.log('after HOME', Food.foods.length);
                            ant.goingHome = false;
                            clearInterval(intervalId);
                        }
                    }, intervalLength);
                }
            });
        }
    }

    const context = canvas.getContext('2d');
    const initialAnts = 200, initialFood = 250;// let ants = [];
    for (let i = 0; i < initialAnts; i++) {
        Ant.ants.push(new Ant(context));
    }
    for (let i = 0; i < initialFood; i++) {
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

    const amountFood = document.getElementById('amountFood'), addFood = document.getElementById('addFood'), foodColor = document.getElementById('colorFood');
    addFood.addEventListener('click', () => {
        for (let i = 0; i < amountFood.value; i++) {
            Food.foods.push(new Food(context, foodColor.value));
        }
    });

/*if(Food.foods){*/document.getElementById('clearFood').addEventListener('click', () => { Food.foods.forEach(f => f.isCleared = true); Food.foods = []; });
/*if(Ant.ants){*/document.getElementById('clearAnts').addEventListener('click', () => {
        Ant.ants.forEach(ant => ant.isDead = true);
        Ant.ants = [];
    });

    function drawHome() {
        context.lineWidth = 7;
        context.beginPath();
        context.arc(homeRightX, homeRightY, homeRightRadius, 0, 2 * Math.PI, true);
        context.stroke();
        context.strokeStyle = 'blue';
        context.fillStyle = 'yellow';
        context.stroke();
        context.fill();
        context.beginPath();
        context.arc(homeLeftX, homeLeftY, homeLeftRadius, 0, 2 * Math.PI, true);

        context.fillStyle = 'purple';
        context.fillText('LEFT HOME', homeLeftX - 27, homeLeftY - 60);
        context.fillText('RIGHT HOME', homeRightX - 28, homeRightY - 60);
        context.stroke();
        context.strokeStyle = 'blue';
        context.fillStyle = 'yellow';
        context.stroke();
        context.fill();
    }


}());