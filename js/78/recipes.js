(function () {
    'use strict';

    const dName = $('#d-name'), dIng = $('#d-ing');
    const results = $('#results');//.hide();
    const img = $('<img>');

    $('button').click(function () {
        showRecipe(this.id);
    });
    $('#clear').click(() => {
        dName.empty();
        dIng.empty();
        img.hide();
    });

    function showRecipe(find) {

        fetch('recipes.json')
            .then(r => {
                if (!r.ok) {
                    throw new Error(`Sorry! You got a ${r.status} which means ${r.statusText}`);
                }
                return r.json();
            })
            .then(r => {
                let name = r[find].name, ing = r[find].ingredients;
                dName.text(name);
                dIng.empty();
                ing.forEach((i, n) => {
                    let sep = n === ing.length - 1 ? '' : ',';
                    dIng.text(`${dIng.text()} ${i}${sep} `);
                });
                //results.show();
                img.prop('src', r[find].url).prop('alt', name).addClass('img').show().appendTo(results);
            })
            .catch(error => dName.text(error));
    }
}());