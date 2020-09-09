(function ($) {
    'use strict';

    const body = $('body');

    const link = $('<link>');
    link.prop('href', '64.css');
    link.prop('rel', 'stylesheet');
    body.append(link);

    const name = $('<input>');
    const labName = $('<label>Name<label>');
    labName.append(name);
    const address = $('<input>');
    const adrName = $('<label>Address<label>');
    adrName.append(address);
    const ch = $('<input>');
    ch.prop('type', 'checkbox');
    const b = $('<button>');
    b.text('Display');
    b.prop('disabled', true);
    ch.click(() => {
        if (ch.prop('checked')) {
            b.prop('disabled', false);
        } else {
            b.prop('disabled', true);
        }
    });

    const form = $('<form><form/>')
        .append(labName)
        .append(adrName)
        .append(ch)
        .append(b)
        .submit(event => display(event))
        .appendTo(body);

    function display(e) {
        e.preventDefault();
        if (ch.prop("checked")) {       //need either 'disabled' or this if check - not both
            const nameDiv = $('<div><div/>');
            const addressDiv = $('<div><div/>');
            nameDiv.text(name.val());
            addressDiv.text(address.val());
            form[0].reset();
            body.prepend(nameDiv);
            body.append(addressDiv);
        }
    }




    //this is for jQuery interaction with DOM. Above is jQuery creating the entire DOM

    // const form = $('#form')
    //     .submit(event => display(event));

    // const body = $('body');

    // const button = $('button')
    //     .prop('disabled', true);

    // const ch = $('#checkbox');
    // ch.click(() => {
    //     if (ch.prop("checked")) {
    //         button.prop('disabled', false);
    //     } else {
    //         button.prop('disabled', true);
    //     }
    // });

    // function display(e) {
    //     e.preventDefault();
    //     if (ch.prop("checked")) {       //need either 'disabled' or this if check - not both
    //         const div = $('<div><div/>');
    //         const div2 = $('<div><div/>');
    //         div.text($('#name').val());
    //         div2.text($('#address').val());
    //         form[0].reset();
    //         body.prepend(div);
    //         body.append(div2);
    //     }
    // }
}(jQuery));