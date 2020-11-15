window.pcs = window.pcs || {};
window.pcs.messageBox = (function () {
  'use strict';

  const offset = 30;
  let leftOffset = -150;
  let topOffset = -75;
  const width = 300;
  const height = 150;
  let nextZindex = 1;

  const modalOverlay = document.createElement('div');
  modalOverlay.style.position = 'fixed';
  modalOverlay.style.width = '100%';
  modalOverlay.style.height = '100%';
  modalOverlay.style.left = '0';
  modalOverlay.style.top = '0';
  modalOverlay.style.backgroundColor = 'lightgray';
  modalOverlay.style.opacity = '.5';
  modalOverlay.style.display = 'none';
  document.body.appendChild(modalOverlay);

  let alarmTime = [];
  const alarmClock = document.querySelector('#alarmClock');
  function show(msg, modal = false, inputs = ['ok']/*, callback = undefined*/) {
    const messageBox = document.createElement('div');
    const span = document.createElement('span');
    span.innerHTML = msg;
    messageBox.appendChild(span);

    const inputsDiv = document.createElement('div');
    messageBox.appendChild(inputsDiv);
    alarmClock.append(messageBox);

    const inputValues = [];
    inputs.forEach(inputText => {
      //for (let i = 0; i < inputs.length; i++) {      
      const inp = document.createElement('input');
      inputValues.push(inp);
      inp.placeholder = inputText; // inputs[i];
      inputsDiv.appendChild(inp);
    });

    const set = document.createElement('button');
    set.innerHTML = 'Set Alarm';
    set.addEventListener('click', () => {
      let thisBoxArray = [];
      inputValues.forEach(i => {
        thisBoxArray.push(i.value);
      });
      alarmTime.push(thisBoxArray);
      alarmClock.removeChild(messageBox);
      modalOverlay.style.display = 'none';
    }
    );
    const cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel';
    cancel.addEventListener('click', () => {
      alarmClock.removeChild(messageBox);
      modalOverlay.style.display = 'none';
    });
    inputsDiv.appendChild(set); inputsDiv.appendChild(cancel);

    messageBox.addEventListener('click', () => {
      messageBox.style.zIndex = nextZindex++;
    });

    if (modal) {
      modalOverlay.style.display = 'block';
      modalOverlay.style.zIndex = nextZindex;
    }

    messageBox.className = 'messageBox';

    // probably should move this all to css file....
    messageBox.style.backgroundColor = 'lightblue';
    messageBox.style.padding = '1em';
    messageBox.style.paddingBottom = '38px';
    messageBox.style.boxSizing = 'border-box';
    messageBox.style.width = `${width}px`;
    messageBox.style.height = `${height}px`;
    messageBox.style.position = 'absolute';
    messageBox.style.top = '150px';
    messageBox.style.left = '50%';
    messageBox.style.marginLeft = `${leftOffset}px`;
    messageBox.style.marginTop = `${topOffset}px`;
    messageBox.style.border = '1px solid black';
    messageBox.style.zIndex = nextZindex++;

    span.style.overflow = 'auto';
    span.style.height = '100%';
    span.style.display = 'inline-block';
    // span.style.textAlign = 'center';
    // span.style.textAlign = 'center';

    inputsDiv.style.position = 'absolute';
    inputsDiv.style.bottom = '8px';
    inputsDiv.style.left = 0;
    inputsDiv.style.width = '100%';
    inputsDiv.style.height = '100px';
    inputsDiv.style.overflow = 'auto';
    inputsDiv.style.textAlign = 'center';
    $('div button').css('display', 'block');

    leftOffset += offset;
    topOffset += offset;

    if (parseFloat(getComputedStyle(messageBox).left) + leftOffset + width > window.innerWidth) {
      leftOffset -= window.innerWidth - width;
    }

    if (parseFloat(getComputedStyle(messageBox).top) + topOffset + height > window.innerHeight) {
      topOffset -= window.innerHeight - height;
    }
  }

  return {
    show: show,
    alarm: alarmTime
  };
}());