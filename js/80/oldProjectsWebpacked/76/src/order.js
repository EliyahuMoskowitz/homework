export default class Order {
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