(async () => {
    'use strict';

    let isContacts, localTrue = JSON.parse(localStorage.isContacts || 'false'), contactsPlace = document.createElement('section'); 
    document.body.appendChild(contactsPlace); 

    let getContacts = document.getElementById('getContacts');
    // getContacts.innerText = 'Get Contacts';
    getContacts.addEventListener('click', loadContacts);

    if(localTrue){
        loadContacts();
        localTrue = false;
    }
    
    async function loadContacts () {

        if(!isContacts || localTrue){
        try{
                let ajax = await fetch('http://localhost:3000/api/contacts');
                let contacts = await ajax.json();
                console.log(contacts);
                contacts.forEach(c => {
                    let con = document.createElement('div');
                    con.className = 'contact';
                    con.innerText = c.name;
                    contactsPlace.appendChild(con);
                });
                isContacts = true;
                getContacts.innerText = 'Hide Contacts';
            }catch(err){
                console.error(err);
            }
        }else{
            getContacts.innerText = 'Get Contacts';
            contactsPlace.innerHTML = '';
            isContacts = false;
        }
        localStorage.isContacts = isContacts;
    }
    const form = document.getElementById('form'), submit = document.getElementById('submit'), input = document.getElementById('name');
    document.getElementById('newContact').addEventListener('click', () => {
        displayForm();
    });
    document.getElementById('deleteContact').addEventListener('click', () => {
        displayForm('delete');
    });
    form.addEventListener('submit', function () {
        this.style.display = 'none';
        // window.history.pushState(null, 'http://localhost:3000');
    });

    function displayForm( del ){
        form.style.display = 'block';
        submit.innerText = `${del ? 'Delete' : 'Add'} Contact`;
        del ? input.name = 'delete' : 'name';
    }

})();