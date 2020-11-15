(function () {
  'use strict';

  function get(id) {
    return document.getElementById(id);
  }

  function css(element, property, value) {
    element.style[property] = value;
  }

  const contacts = [];
  const contactForm = get('contactForm');
  const firstInput = get('first');
  const lastInput = get('last');
  const emailInput = get('email');
  const phoneInput = get('phone');

  get('add').addEventListener('click', () => {
    css(contactForm, 'display', 'block');
  });

  function hideAddContactForm() {
    contactForm.reset();
    css(contactForm, 'display', 'none');
  }

  contactForm.addEventListener('submit', e => {
    e.preventDefault();

    const contactsTable = get('contacts');

    if (!contacts.length) {
      contactsTable.deleteRow(1);
    }

    const newContact = {
      first: firstInput.value,
      last: lastInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    contacts.push(newContact);

    /*firstInput.value = '';
    lastInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';*/
    //contactForm.reset();

    const newRow = contactsTable.insertRow();
    const firstCell = newRow.insertCell();
    const lastCell = newRow.insertCell();
    const emailCell = newRow.insertCell();
    const phoneCell = newRow.insertCell();

    firstCell.innerHTML = newContact.first;
    lastCell.innerHTML = newContact.last;
    emailCell.innerHTML = newContact.email;
    phoneCell.innerHTML = newContact.phone;

    let deleteButton = document.createElement('button');
    newRow.appendChild(deleteButton);
    css(deleteButton, 'width', 'fitContent');
    css(deleteButton, 'hieght', '20px');
    css(deleteButton, 'color', 'green');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', () => {
      newRow.remove();
      contacts.pop(newRow);   //will pop the end index(not the best-need the one)
      if (!contacts.length) {
        let unLoadRow = contactsTable.insertRow();
        let unLoadCell = unLoadRow.insertCell();
        unLoadCell.setAttribute('colspan', '4');
        unLoadCell.innerHTML = 'no contacts loaded';
        css(unLoadCell, 'textAlign', 'center');
      }
    });

    // setCss(contactForm, 'display', 'none');
    hideAddContactForm();
  });

  get('cancel').addEventListener('click', hideAddContactForm);
}());