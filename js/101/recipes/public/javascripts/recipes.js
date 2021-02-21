(function () {
    'use strict';

    const dName = $('#d-name'), dIng = $('#d-ing'), dDir = $('#d-dir');
    const results = $('#results');//.hide();
    const img = $('<img>');
    const recipes = $('#recipes');
    let categories = {};

    fetch('/recipes')
            .then(r => {
                if (!r.ok) {
                    throw new Error(`Sorry! You got a ${r.status} which means ${r.statusText}`);
                }
                return r.json();
            })
            .then(r => {
               r.forEach(rec => {
                  let category = categories[rec.category] = categories[rec.category] || [];
                    category.push(rec);
               });
               for (const cat in categories) {
                   if (Object.hasOwnProperty.call(categories, cat)) {
                       let category = categories[cat];
                       let select = $(`<select id="theSelect">
                                            <option value=null >${cat}</option>
                                        </select>`).prependTo(recipes);
                       category.forEach(rec => {
                        let option = $(`<option value=${rec.id} >${rec.name}</option>`).appendTo(select);
                       });
                       select.on('blur', e => getRecipe(e.target.value));
                   }
               }
            })
            .catch(error => {dName.text(error); console.error(error)});


    // $('button').click(function () {
    //     showRecipe(this.id);
    // });
    $('#clear').click(() => {
        dName.empty();
        dIng.empty();
        dDir.empty();
        img.hide();
    });

    function getRecipe(id) {
        if(id !== 'null'){
        fetch(`/recipes/${id}`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(`Sorry! You got a ${r.status} which means ${r.statusText}`);
                }
                return r.json();
            })
            .then(rec => {
                let name = rec.name, ing = rec.ingredients?.split(','), dir = rec.directions?.split(',');
                dName.text(name);
                dIng.empty();
                ing ? ing.forEach((i, n) => {
                    let sep = n === ing.length - 1 ? '' : ',';
                    dIng.text(`${dIng.text()} ${i}${sep} `);
                }) : dIng.text('There are no ingredients to display for this recipe');
                dir ? dir.forEach((i, n) => {
                    let sep = n === ing.length - 1 ? '' : ',';
                    dDir.text(`${dIng.text()} ${i}${sep} `);
                }) : dDir.text('There are no directions to display for this recipe');
                //results.show();
                img.prop('src', rec.url).prop('alt', name).addClass('img').show().appendTo(results);
            })
            .catch(error => {dName.text(error); console.error(error)});
        }
    }
}());