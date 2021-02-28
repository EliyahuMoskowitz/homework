(function (){
'use strict';

    // const addOne = document.getElementById('addOne'), removeOne = document.getElementById('removeOne'), removeAll = document.getElementById('removeAll');
    const addRemove = document.getElementsByTagName('button'), inputAddOrRemove = document.getElementsByName('addOrRemove')[0];

    for (let i = 0; i < addRemove.length; i++) {
      addRemove[i].addEventListener('click', putAddRemove);
    }

    async function putAddRemove(){
        // let body;
        // switch(this.id){
        //     case 'addOne':
        //     body = 
        // }

        await fetch('/', {//http://localhost:3000
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: {         //body
                id: this.id,
                amount: inputAddOrRemove.value
            } 
        });
    }

})();