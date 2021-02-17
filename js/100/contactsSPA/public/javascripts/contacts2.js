(function () {
    'use strict';

    // const host = 'localhost', port = 3000;
  
    function get(id) {
      return document.getElementById(id);
    }

    function css(element, property, value) {
      element.style[property] = value;
    }

    const addEdit = get('addEdit'), contactForm = get('contactForm'), firstInput = get('first'),
        lastInput = get('last'), emailInput = get('email'), phoneInput = get('phone'), contactsTable = get('contacts');//, tbody = get('tbody');
  
async function getContacts(){
  try{
        let ajax = await fetch(`/contacts/api`);
        let contacts = await ajax.json();
        console.log(contacts);

          setTable(contacts);

    }catch(err){
        console.error(err);
    }
}
getContacts();
    

    function setTable(contacts){
        contacts.forEach((c) => {   
            const newRow = contactsTable.insertRow();
            newRow.insertCell().innerText = c.first;
            newRow.insertCell().innerText = c.last;
            newRow.insertCell().innerText = c.email;
            newRow.insertCell().innerText = c.phone;

            // let deleteForm = document.createElement('form');
            // deleteForm.method = 'POST';
            // deleteForm.action = `/contacts/deleteContact`;
            let deleteButton = document.createElement('button');
            deleteButton.name = 'delete';
            deleteButton.value = c.id;   // ID like in a DB
            // deleteForm.appendChild(deleteButton);
            let td = document.createElement('td'); 
            // td.appendChild(deleteForm);
            td.appendChild(deleteButton);
            deleteButton.className = 'editDelete';
            deleteButton.innerText = 'Delete';

            deleteButton.addEventListener('click', () => {
              console.log('starting ajax post');
              try{
                  fetch(`/contacts/deleteContact`, 
                {
                    method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    // method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({delete: c.id}) // body data type must match "Content-Type" header
                  });
                console.log('finished ajax post');
                // tbody.innerHTML = '';
                window.location = window.location;
                // getContacts();
            }catch(err){
                console.error(err);
            }
            });

            let edit = document.createElement('button');
            edit.innerText = 'Edit';
            edit.className = 'editDelete';
            edit.addEventListener('click', () => {
              contactForm.action=`/contacts/editContact`;
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
      contactForm.action=`/contacts/addContact`;
    });
  
    function hideForm(form) {
      css(form, 'display', 'none');
    }
  
    contactForm.addEventListener('submit', () => {
      hideForm(contactForm);
    });
  
    get('cancel').addEventListener('click', () => hideForm(contactForm));
  }());