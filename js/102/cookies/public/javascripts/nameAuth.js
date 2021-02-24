(function (){
'use strict';

    const /*thankName*/mustAccept = document.getElementById('mustAccept'/*'thankName'*/), nameInput = document.getElementById('nameInput'),
             checked = document.getElementById('checked'), form  = document.getElementById('form');

    // nameInput.addEventListener('click', async function() {
    //     thankName.style.display = 'block';

    //     await fetch('/saveName', {method: 'POST', headers: {'content-type': 'application/json'}, 
    //             body: this.name });
    // });

    form.addEventListener('submit', e => {
        if(!checked.checked){
            e.preventDefault();
            mustAccept.style.display = 'block';
        }
    });


}());