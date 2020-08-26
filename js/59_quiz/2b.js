(function () {
    'use strict';
    window.app = window.app || {};

    window.app.counterTools = (function () {
        let keepTrack = 0;
        return {
            create: function () {
                let number = 0;
                ++keepTrack;
                return {
                    // increment: function () { number++; },
                    increment: () => ++number,
                    getNumber: () => number,
                };
            },
            askTrack: () => keepTrack
        };
    }());
}());
