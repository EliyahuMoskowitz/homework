(function () {
    'use strict';

    class Student {
        constructor(firstName, lastName, age, grade) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.age = age;
            this.grade = grade;
        }
    }

    function createStudent(first, last, age, grade) {
        return new Student(first, last, age, grade);
    }
    const students = [createStudent('a', 'z', 1, 90), createStudent('b', 'y', 2, 80), createStudent('c', 'x', 3, 70), createStudent('d', 'w', 4, 65)];
    printStudents('firstLast'/*any value is default*/, ...students); printStudents('lastFirst', ...students);
    function printStudents(order, ...collegues) {
        collegues.forEach(c => {
            if (order === 'lastFirst') {
                console.log(c.lastName, c.firstName, c.age, c.grade, c);
            } else {
                console.log(c.firstName, c.lastName, c.age, c.grade, c);
            }
        });
    }

    let { firstName, lastName, ...rest } = students[1];
    let otherProps = [];
    for (let prop in rest) {
        if (rest.hasOwnProperty(prop)) {
            otherProps.push(rest[prop]);
        }
    }
    //console.log(otherProps);
    console.log(copyStudent(firstName, lastName, ...otherProps));

    function copyStudent(first, last, ...restProps) {
        return new Student(last, first, ...restProps);
    }

}());