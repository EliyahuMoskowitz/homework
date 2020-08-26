(function () {
    'use strict';

    function createAccount(bal = 0) {
        return {
            balance: bal || 0,
            performTransaction: function (amount) {
                console.log(this.balance);
                this.balance += amount;
                console.log(this.balance);
            }
        };
    }
    const checking = createAccount(100);
    checking.performTransaction(25);
    const savings = createAccount(200);
    savings.performTransaction(-50);

    function transaction(amount, type) {
        //jshint -W040
        console.log(this.balance);
        this.balance += amount;
        console.log(this.balance, type);
    }
    transaction.call(checking, 15, 'deposit');
    transaction.call(savings, -10, 'withdrawal');

    transaction.apply(checking, [15, 'deposit']);
    transaction.apply(savings, [-10, 'withdrawal']);

    let checkTrans = transaction.bind(checking, -20, 'withdraw');
    checkTrans();
}());
