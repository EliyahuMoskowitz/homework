window.pcs = function (id) {
  'use strict';

  const theElem = get(id);

  function get(id) {
    return document.getElementById(id);
  }

  function setCss(element, property, value) {
    element.style[property] = value;
  }

  function getCss(element, property) {
    //return element.style[property];
    return getComputedStyle(element)[property];
  }

  // let keys = [], values = [];
  // function setData(key, value) {
  //   keys.push(key);
  //   values.push(value);
  // }

  // function getData(key) {
  //   return values[keys.findIndex(e => e === key)];
  // }

  function getColorPart() {
    return Math.floor(Math.random() * 256);
  }

  const colors = [];
  for (let i = 0; i < 10000; i++) {
    colors.push(`rgb(${getColorPart()}, ${getColorPart()}, ${getColorPart()})`);
  }

  return {
    /*setCss: (property, value) => setCss(theElem, property, value),
    getCss: property => getCss(theElem, property),*/
    css: function (property, value) {
      if (arguments.length < 2) { // get
        return getCss(theElem, property);
      }
      setCss(theElem, property, value);
      return this;
    },
    click: function (callback) {
      theElem.addEventListener('click', callback);
      return this;
    },
    hide: function () {
      setCss(theElem, 'display', 'none');
      return this;
    },
    show: function () {
      setCss(theElem, 'display', 'block');
      return this;
    },
    flash: function (time = 4000, speed = 1000) {
      let run = 0;
      let old = this.css('color');
      this.css('color', colors[run++]);
      let intervalId = setInterval(() => {
        this.css('color', colors[run++]);
      }, speed);
      setTimeout(() => {
        clearInterval(intervalId);
        this.css('color', old);
      }, time);
      return this;
    },
    data: function (key, value) {
      let a = theElem.data = theElem.data || {};

      if (arguments.length < 2) { // get
        //return getData(key);
        return a[key];
      }
      // setData(key, value);
      a[key] = value;
      return this;
    }
  };
};