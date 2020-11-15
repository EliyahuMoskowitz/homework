(function () {
    'use strict';

    class Item {
        constructor(name, price, quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    class Order {
        constructor(name, address, items) {
            this.name = name;
            this.address = address;
            this.items = items;
        }

        get total() {
            let t = 0;
            if (this.items) { this.items.forEach(i => t += (i.price * i.quantity)); }
            return t;
        }

    }

    let ordersList = [];
    fetch('orders.json')
        .then(r => {
            let { ok, status: s, statusText: st } = r;
            if (!ok) {
                throw new Error(`Sorry! ${s} which means ${st}`);
            }
            return r.json();
        })
        .then(orders => {
            orders.forEach(/*o*/({ items, customer: name, address }) => {
                // console.log(orders, o);
                let itemsList = [];
                //o.items.forEach(i => itemsList.push(new Item(i.item, i.total / i.quantity, i.quantity)));
                //ordersList.push(new Order(o.customer, o.address, itemsList));
                items.forEach(/*i*/({ item, total, quantity: amount }) => itemsList.push(new Item(item, total / amount, amount)));
                ordersList.push(new Order(name, address, itemsList));
            });

            ordersList.forEach((order, orderIndex) => {

                let display = document.createElement('div');
                display.className = 'display';
                display.innerHTML = `Order #${orderIndex + 1}<section class="s1">Customer: ${order.name}</section>
                        <section class="s2">Address: ${order.address}</section><section class="s3">Items Purchased</section>`;
                order.items.forEach((item, itemIndex) => {
                    let mainItems = document.createElement('main'); mainItems.innerHTML = `Item ${itemIndex + 1}: 
                        <section class="m1">${item.name}</section> <section class="m2">Price: $${rightPad(item.price, '0', 2)}</section>
                        <section class="m3">Quantity: ${item.quantity} `;
                    display.appendChild(mainItems);
                });
                let orderTotal = document.createElement('aside');
                orderTotal.innerHTML = `</section> <section class="m4_total">TOTAL: $${rightPad(order.total, '0', 2)}</section>`;
                display.appendChild(orderTotal);

                document.body.appendChild(display);
            });


        }).catch(e => console.error(e));

    function rightPad(nidon, padder, amount) {
        let dec = JSON.stringify(nidon).split('.');
        if (!dec[1]) {
            dec[1] += '.00';
        } else if (dec[1].length < amount) {
            while (dec[1].length < amount) {
                dec[1] += padder;
            }
        }
        return `${dec[0]}.${dec[1]}`;
    }

}());