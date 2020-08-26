(function () {
    'use strict';
    window.app = window.app || {};

    window.app.counter = (function () {
        let number = 0;

        return {
            increment: () => ++number,
            getNumber: () => number
        };
    }());
}());

