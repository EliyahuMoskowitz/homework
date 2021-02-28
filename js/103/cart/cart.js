class Cart {
  // 2 - added param items to allow us to recreate cart from items stored in session
  constructor(items) {
    this.items = items || {};
  }

  addItem(id, count) {
    const c = this.items[id] || 0;
    this.items[id] = count + c;
  }

  removeItem(id, count) {
    if(count === 'all'){
      this.items = {};
      return;
    }

    const c = this.items[id] || 0;
    this.items[id] = c - count;
  }

  getItems() {
    return this.items;
  }


 // getSubtotal() {
  //   let subtotal = {};
  //   for (const key in this.items) {
  //     if (Object.hasOwnProperty.call(this.items, key)) {
  //       const count = this.items[key];
  //       let item = global.items.find(i => this.items[i.id]);
  //       subtotal[key] = count * item.price;
  //     }
  //   }
  //   return subtotal;
  // }
}

module.exports = Cart;