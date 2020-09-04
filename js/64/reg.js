(function () {
    'use strict';

    function create(elem) {
        return document.createElement(elem);
    }

    const button = create('button');
    button.addEventListener('click', event => display(event));
    button.innerHTML = 'Display';
    const name = create('input');
    const labelName = create('label');
    labelName.innerHTML = 'Name';
    labelName.appendChild(name);
    const address = create('input');
    const labelAddress = create('label');
    labelAddress.innerHTML = 'Address';
    labelAddress.appendChild(address);
    const checkbox = create('input');
    checkbox.setAttribute('type', 'checkbox');

    const form = create('form');
    form.appendChild(labelName);
    form.appendChild(labelAddress);
    form.appendChild(checkbox);
    form.appendChild(button);
    document.body.appendChild(form);

    function display(e) {
        e.preventDefault();
        if (checkbox.checked) {
            const div = create('div');
            const div2 = create('div');
            div.innerHTML = name.value;
            div2.innerHTML = address.value;
            form.reset();

            document.body.appendChild(div);
            document.body.appendChild(div2);
        }
    }

    let l = create('link');
    l.setAttribute('href', '64.css');
    l.setAttribute('rel', 'stylesheet');
    document.body.appendChild(l);
}());