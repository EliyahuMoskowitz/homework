(function () {
    'use strict';

    class Vehicle {
        constructor(color = 'unkown color') {
            this.color = color;
        }
        go(speed = 0) {
            this.speed = speed;
            return `The ${this.color} one is going at ${this.speed}`;
        }
        print() {
            console.log(`${this.color} : ${this.speed}`);
        }
    }

    class Plane extends Vehicle {
        constructor(color) {
            super(color);
        }
        go(speed) {
            super.go(speed);
            return `The ${this.color} Plane is FLYING at ${this.speed} MPH`;
        }
    }

    const p1 = new Plane('Blue and White');
    console.log(p1.go(500));
    p1.print();
    const p2 = new Plane();
    console.log(p2.go(200));
    p2.print();
    const v1 = new Vehicle('Gray');
    console.log(v1.go(25));
    v1.print();
    const v2 = new Vehicle('Red');
    console.log(v2.go(35));
    v2.print();

}());