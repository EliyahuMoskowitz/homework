(function () {
    'use strict';

    const numbers = [2, 5, 7, 8, 10];
    const numbersDoubled = ourMap(numbers, num => num * 2);
    const strings = ['donald', 'mike', 'awesome', 'president'];
    const stringsUppercased = ourMap(strings, txt => txt.toUpperCase());

    function ourMap(array, callback) {
        let newArray = [];
        // for (let i = 0; i < array.length; i++) {
        //     newArray[i] = callback(array[i]);
        // }
        array.forEach(element => {
            newArray.push(callback(element));
        });
        return newArray;
    }

    console.log(numbers, numbersDoubled);
    console.log(strings, stringsUppercased);
}());
