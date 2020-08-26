(function () {
    'use strict';

    const dayOfWeek = (function () {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];

        return {
            getDayName: number => days[number - 1],
            getDayNumber: name => days.findIndex(nameOfDay => nameOfDay.toUpperCase() === name.toUpperCase()) + 1
        };
    }());
    console.log(dayOfWeek.getDayNumber('friday'), dayOfWeek.getDayName(7));

    const interestCalculator = (function () {
        let years = 0;
        let rate = 0;
        return {
            setRate: intRate => rate = intRate,  //if input will be whole number, we will need rate / 100
            setYears: amtYears => years = amtYears,
            calculateInterest: principle => '$' + principle * rate * years
        };
    }());
    interestCalculator.setRate(0.05);
    interestCalculator.setYears(15);
    console.log(interestCalculator.calculateInterest(50000));
}());