const Cart = require("./cart");

module.exports = (req, res, next) => {
  
//     let ourCart = new Cart(req.session.cart?.items);
//     let cartItems = [];//ourCart.getItems();/*.items*/
//     for (const item in ourCart) {
//         if (Object.hasOwnProperty.call(ourCart, item)) {
//             const i = ourCart[item];
//             global.items.find(item => cartItems[item.id]);
//             if(cItems && cItems[i.id]){
//                 cartItems.push({item: i, quantity: cItems[i.id]});
//             }
//         }
//     }

//     res.render('layout', { title: 'Your Shopping Cart!!', partials: { content: 'cart' }, 
//             cartItems: cartItems, empty: !cartItems.length}); 


 // put global.items in DB and use production-quality memory store

    let cartItems = [];
    // let quantity = {};
    let cItems = new Cart(req.session.cart?.items).getItems();//.items
    let total = 0;
    for (const item in global.items) {
        if (Object.hasOwnProperty.call(global.items, item)) {
            const i = global.items[item];
            if(cItems[i.id]){
                let subtotal = cItems[i.id] * i.price;
                total += subtotal;
                cartItems.push({item: i, quantity: cItems[i.id], subtotal: subtotal.toFixed(2).toString().padEnd(2, '0')});
                // quantity[i.id] = cItems[i.id];
            }
        }
    }

    res.render('layout', { title: 'Your Shopping Cart!!', partials: { content: 'cart' }, 
    cartItems: cartItems, showTotal: cartItems.length, empty: !cartItems.length, total: total.toFixed(2).toString().padEnd(2, '0')});



    // cartItems.push(cItems ? global.items.find(({id}) => cItems[id]) : null);
    // if(req.session.cart){
    //     console.log(cartItems, cItems);
    // }
    // res.send('You have nothing in your Cart yet :( goShopping!');
    // next();

}; 