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
        lastInput = get('last'), emailInput = get('email'), phoneInput = get('phone'), contactsTable = get('contacts'), noCont = get('noCont');//, tbody = get('tbody');
  
    let localContacts = [];

async function getContacts(){
  try{
        let ajax = await fetch(`/contacts/api`);
        let contacts = await ajax.json();
        console.log(contacts);
        localContacts = contacts;
          
        setTable();
    }catch(err){
        console.error(err);
    }
}
getContacts();

function createNewRow(c){
  let newRow = contactsTable.insertRow();
  newRow.insertCell().innerText = c.first;
  newRow.insertCell().innerText = c.last;
  newRow.insertCell().innerText = c.email;
  newRow.insertCell().innerText = c.phone;
  return newRow;
}

    function setTable(){
        localContacts.forEach(c => {   
            let newRow = createNewRow(c);
            setButtons(c, newRow);
        });
    }
    function setButtons(c, newRow){
            let deleteButton = document.createElement('button');
            deleteButton.name = 'delete';
            deleteButton.value = c.id;   // ID like in a DB
            let td = document.createElement('td'); 
            td.appendChild(deleteButton);
            deleteButton.className = 'editDelete';
            deleteButton.innerText = 'Delete';

            deleteButton.addEventListener('click', async () => {
              console.log('starting ajax post');
              try{
                await fetch(`/contacts/deleteContact`, 
                {
                    // method: 'POST', // *GET, POST, PUT, DELETE, etc.
                    method: 'DELETE',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({delete: c.id}) // body data type must match "Content-Type" header
                  });
                console.log('finished ajax post');
                contactsTable.deleteRow(localContacts.findIndex(f => f.id === c.id) + 2);  // + 2 because the thead and hidden'no cantacts'
                localContacts = localContacts.filter(f => f.id !== c.id);
                // getContacts();
                checkNoRows(localContacts);
            }catch(err){
                console.error(err);
            }
            });

            let edit = document.createElement('button');
            edit.innerText = 'Edit';
            edit.className = 'editDelete';
            edit.addEventListener('click', () => {
              contactForm.action = `/contacts/editContact`;
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
    checkNoRows();
}

function checkNoRows(){
    if (localContacts.length) {
        // contactsTable.deleteRow(1);
        css(noCont, 'display', 'none');
      }else{
        css(noCont, 'display', 'block');
      }
}
  
    get('add').addEventListener('click', () => {
      css(contactForm, 'display', 'block');
      addEdit.innerText = 'add';
      addEdit.name = null;
      contactForm.action=`/contacts/addContact`;
      contactForm.reset();
    });
  
    function hideForm(form) {
      css(form, 'display', 'none');
    }
  
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        console.log('starting ajax post');
        let body = {
            [firstInput.name]: firstInput.value,
            [lastInput.name]: lastInput.value,
            [emailInput.name]: emailInput.value,
            [phoneInput.name]: phoneInput.value
            };
        if(addEdit.name !== 'null'){
            body[addEdit.name] =  addEdit.value;
            console.log(addEdit.name, 'addEdit.name');
        }

        try{
            let r = await fetch(contactForm.action, // only by add will we get back userId(might be string). By edit, it will be null
          {
              method: !body.edit ? 'PUT' : 'POST', //  POST edit, PUT add
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(body) // body data type must match "Content-Type" header
            });
          console.log('finished ajax post');
          let userId = !body.edit ? await r.json() : null;

          if(+userId){               // for add
            let newRow = createNewRow(body);
            body.id = userId;
            localContacts.push(body);
            console.log(body, userId);
            setButtons(body, newRow);
          }else{            // for edit
            let index = localContacts.findIndex(c => c.id === +body.edit);
            let row = contactsTable.rows[index + 2];
            let cells = row.cells;
            cells[0].innerText = body.first;
            cells[1].innerText = body.last;
            cells[2].innerText = body.email;
            cells[3].innerText = body.phone;
            console.log(row, cells);
            row.deleteCell(4);
            body.id = localContacts[index].id;
            localContacts[index] = body;
            // Object.assign(localContacts[index], body);
            setButtons(localContacts[index], row);
          }
        
      }catch(err){
          console.error(err, 'try catch error');
      }

        hideForm(contactForm);
    });
  
    get('cancel').addEventListener('click', () => hideForm(contactForm));
  }());