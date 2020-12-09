import $ from 'jquery';

const income = $('#income'), expenses = $('#expenses'), budgetDetails = $('#budgetDetails'), budget = $('#budget');
let diff;

export default class Budget {
    constructor(income, expenses) {
        this.income = income;
        this.expenses = expenses;
        this.show = false;
        this.calcBudget();
    }

    calcBudget() {
        budget.on('click', () => {
            diff = income.val() - expenses.val() < 0 ? 'loss' : 'profit';

            $('#profitLoss').html(`<div><p>Your Income is $${income.val() || 0}, and your Expenses are $${expenses.val() || 0}</p>
            Your net <span id="diff">${diff}</span> is $${income.val() - expenses.val()}</div>`).appendTo(budgetDetails);

            if (!this.show) { $('<button id="hideButton">Hide</button>').appendTo(budgetDetails).on('click', () => budgetDetails.hide()) }
            // budgetDetails.css('display', 'block');
            // budgetDetails.slidedown('slow');
            budgetDetails.show(); this.show = true;
        });
    }
}