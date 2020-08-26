window.myApp = window.myApp || {};
window.myApp.dayOfWeek = (function (utils) {
    'use strict';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Shabbos'];
    utils.getDayName = number => days[number - 1];
    utils.getDayNumber = name => days.findIndex(nameOfDay => nameOfDay.toUpperCase() === name.toUpperCase()) + 1;
    return utils;
}(window.myApp.dayOfWeek || {}));
