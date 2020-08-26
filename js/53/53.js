'use strict';

var name = 'Eliyahu Moskowitz';
var email = 'elijahmoskowgmail.com';
var age = window.prompt('What is your age?', 120);
var myAge = '';
if (Number(age) === 24) {        //not sure why it wants me to use === but that actually won't work
    window.alert('WOW OMG!! I\'m also 24!!');   //now i know- it's diff type, want to convert yourself
    myAge = 'you are my age!!';
} else if (age > 120) {
    window.alert('no you are not ' + age + ', you must be ' + 120);
    age = 120;
} else if (age === null || age < 0 || age === '') {
    age = 0;
} else {
    if (window.confirm(`Are you really ${age}?`)) {
        window.alert(`you are ${age}!`);
    }
}

