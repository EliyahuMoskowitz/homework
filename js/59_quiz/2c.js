(function () {
    'use strict';

    //let countA = window.app.counter;
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();
    window.app.counter.increment();

    let countB1 = window.app.counterTools.create();
    let countB2 = window.app.counterTools.create();
    countB1.increment();
    countB1.increment();
    countB1.increment();
    countB1.increment();
    countB1.increment();

    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();
    countB2.increment();


    console.log(window.app.counter.getNumber());
    console.log(countB1.getNumber());
    console.log(countB2.getNumber());

    console.log(`We have created ${window.app.counterTools.askTrack()} counters with counterTools`);
}());
