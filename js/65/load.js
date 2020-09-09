(function () {
    'use strict';

    $('button').click(() => {
        const loading = $('<span>Loading.......<span>');
        loading.addClass('load')
            .appendTo(document.body);

        const div = $('div').addClass('content');
        const input = $('input');

        setTimeout(() => {
            const fileName = $('input').val();

            // const request = new XMLHttpRequest();
            // request.open('GET', fileName);
            // request.send();
            // request.onload = () => {
            //     if (request.status < 400) {
            //         div.text(request.responseText);
            //     } else {
            //         msgBox(`Sorry! you got a ${request.status} which means that ${fileName} is ${request.statusText}`);
            //     }
            // };
            // request.onerror = () => {
            //     msgBox('Can not load local resource for security reasons, sorry!');
            // };

            fetch(fileName)
                .then(response => response.status < 400 ? response.text() :
                    msgBox(`Sorry! you got a ${response.status} which means that ${fileName} is ${response.statusText}`))
                .then(fileText => div.text(fileText))
                .catch(errorMessage => msgBox(errorMessage));
            loading.remove();
            input.val('');
        }, 1300);
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
