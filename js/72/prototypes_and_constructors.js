//(function () {
'use strict';

function Vehicle(color) {
    this.color = color || 'Unknown Color';
}
Vehicle.prototype.go = function (speed = 0) {
    this.speed = speed;
    console.log(`The ${this.color} Vehicle is now going at speed ${this.speed}`);
};

Vehicle.prototype.print = function () {
    console.log(`The ${this.color} Vehicle is moving at speed ${this.speed || 0}`);
};
const v1 = new Vehicle('Blue');
const v2 = new Vehicle();


function Plane(color) {
    this.color = color || 'Unknown Color';
}
// Plane.prototype = Vehicle.prototype; wrong: gets the other vehicles also to say Flying..
// Plane.prototype = new Vehicle();     works. Now other vehicle says going. But wasted color in prototype of plane
Plane.prototype = Object.create(Vehicle.prototype); //WORKS and also no extra unknown color in plane's prototype 
Plane.prototype.constructor = Plane;

Plane.prototype.go = function (speed = 0) {
    this.speed = speed;
    console.log(`The ${this.color} Vehicle is now FLYING at speed ${this.speed} MPH`);
};

const p1 = new Plane('Pink');
const p2 = new Plane();

p1.go(650);
p2.go(500);
v1.go(35);
v2.go();
p1.print();
v1.print();
p2.print();
v2.print();
//}());
