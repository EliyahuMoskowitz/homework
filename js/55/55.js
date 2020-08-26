'use strict';
//1
function ourEvery(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (!callback(array[i])) {
            return false;
        }
    }
    return true;
}
let arr = ['A', 'B', 'C', 'D', 'F'];
console.log(ourEvery(arr, a => a === a.toUpperCase()));
console.log(ourEvery(arr, a => a === a.toLowerCase()));
console.log(arr.every(a => a === a.toLowerCase()));
console.log(arr.every(a => a === a.toUpperCase()));
//2
function ourSome(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return true;
        }
    }
    return false;
}
let arr2 = ['A', 'b', 'c', 'D', 'f'];
console.log(ourSome(arr2, a => a === a.toUpperCase()));
console.log(ourSome(arr2, a => a === a.toLowerCase()));
console.log(arr2.some(function (a) { return a === a.toLowerCase(); }));
console.log(arr2.some(a => a === a.toUpperCase()));

//3
function onlyIf(array, test, action) {
    for (let i = 0; i < array.length; i++) {
        if (test(array[i])) {
            action(array[i]);
        }
    }
}
const masechtaDafim = [54, 176, 110, 25, 100, 14, 120];
onlyIf(masechtaDafim, num => num >= 100, amount =>
    console.log(`WOW! This is a long masechta, ${amount} dafim long!`));

//4
masechtaDafim.filter(function (num) { return num >= 100; }).forEach(function (amount)
     { document.write(`WOW! This is a long masechta, ${amount} dafim long! `); });

