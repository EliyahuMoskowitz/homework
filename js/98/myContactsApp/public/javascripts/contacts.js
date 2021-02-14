(async function () {
    'use strict';
  
    function get(id) {
      return document.getElementById(id);
    }

    const addEdit = get('addEdit'), contactForm = get('contactForm'), firstInput = get('first'),
        lastInput = get('last'), emailInput = get('email'), phoneInput = get('phone');
  
    function css(element, property, value) {
      element.style[property] = value;
    }
  
    const contacts = [];   //  on server
    const contactsTable = get('contacts');
    try{
        let ajax = await fetch('http://localhost:3000/api/contacts');
        let getContacts = await ajax.json();
        console.log(contacts);
        getContacts.forEach(c => {
           contacts.push(c);
        });
        setTable();
    }catch(err){
        console.error(err);
    }

    function setTable(){
        contacts.forEach((c, index) => {    //really each should have an ID, like in DB
            const newRow = contactsTable.insertRow();
            newRow.insertCell().innerText = c.first;
            newRow.insertCell().innerText = c.last;
            newRow.insertCell().innerText = c.email;
            newRow.insertCell().innerText = c.phone;

            let deleteForm = document.createElement('form');
            deleteForm.method = 'POST';
            deleteForm.action = 'http://localhost:3000/api/deleteContact';
            let deleteButton = document.createElement('button');
            deleteButton.name = 'delete';
            // deleteButton.value = index;
            deleteButton.value = c.id;   // ID like in a DB
            deleteForm.appendChild(deleteButton);
            let td = document.createElement('td'); 
            td.appendChild(deleteForm);
            deleteButton.className = 'editDelete';
            deleteButton.innerText = 'Delete';

            let edit = document.createElement('button');
            edit.innerText = 'Edit';
            edit.className = 'editDelete';
            edit.addEventListener('click', () => {
              contactForm.action="http://localhost:3000/api/editContact"
              css(contactForm, 'display', 'block');
              firstInput.value = c.first;
              lastInput.value = c.last;
              emailInput.value = c.email;
              phoneInput.value = c.phone;
              addEdit.innerText = 'save';
              addEdit.name = 'edit';
              addEdit.value = c.id;
            });
            td.appendChild(edit);
            newRow.appendChild(td);
          });
    if (contacts.length) {
        contactsTable.deleteRow(1);
      }
}
  
    get('add').addEventListener('click', () => {
      css(contactForm, 'display', 'block');
      addEdit.innerText = 'add';
      addEdit.name = null;
      contactForm.action="http://localhost:3000/api/addContact";
    });
  
    function hideAddContactForm() {
      css(contactForm, 'display', 'none');
    }
  
    contactForm.addEventListener('submit', () => {
  
      hideAddContactForm();
    });
  
    get('cancel').addEventListener('click', hideAddContactForm);
  }());