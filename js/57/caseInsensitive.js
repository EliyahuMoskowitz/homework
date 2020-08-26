window.myApp = window.myApp || {};
window.myApp.dayOfWeek = (function (utils) {
    'use strict';
    utils.StringCaseInsenstitiveEquals = (stringOne, stringTwo) => stringOne.toUpperCase() === stringTwo.toUpperCase();
    return utils;
}(window.myApp.dayOfWeek || {}));
