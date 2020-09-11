(function () {
    'use strict';

    const pre = $('pre').addClass('content');
    const input = $('input');
    const loading = $('<span>Loading.......<span>')
        .addClass('load')
        .appendTo(document.body).hide();

    $('button').click(() => {
        pre.text('');
        loading.show();

        const fileName = $('input').val();

        // const request = new XMLHttpRequest();
        // request.open('GET', fileName);
        // request.send();
        // request.onload = () => {
        //     if (request.status < 400) {
        //         pre.text(request.responseText);
        //     } else {
        //         msgBox(`Sorry! you got a ${request.status} which means that ${fileName} is ${request.statusText}`);
        //     }
        //     loading.hide();
        // };
        // request.onerror = () => {
        //     msgBox('Can not load local resource for security reasons, sorry!'); loading.hide();
        // };

        fetch(fileName)
            .then(response => response.status < 400 ? response.text() :
                msgBox(`Sorry! you got a ${response.status} which means that ${fileName} is ${response.statusText}`))
            .then(fileText => pre.text(fileText))
            .catch(errorMessage => msgBox(errorMessage))
            .finally(() => loading.hide());
        input.val('');
    });

    function msgBox(msg) {
        const messageBox = $('<div><div>');
        const span = $('<span><span>');
        span.text(msg)
            .addClass('msg')
            .appendTo(messageBox);
        const modal = $('<div><div>').addClass('modal').appendTo(document.body);
        const buttons = $('<div><div>').addClass('buttons');
        const okButton = $('<button>')
            .text('ok')
            .appendTo(buttons);
        messageBox.append(buttons)
            .addClass('msgBox')
            .appendTo(document.body);

        okButton.click(() => {
            messageBox.remove();
            modal.remove();
        });
    }
}());
