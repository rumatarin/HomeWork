'use strict';

let money = prompt('Ваш буджет на месяц', ''),
  time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: '',
  income: [],
  savings: false
};

let a1 = prompt("Введите обязательную статью расходов в этом месяце", ''),
  a2 = prompt('Во сколько обойдется', ''),
  a3 = prompt("Введите обязательную статью расходов в этом месяце", ''),
  a4 = prompt('Во сколько обойдется', '');



appData.expenses[a1] = a2;
appData.expenses[a3] = a4;


let month = 30,
  oneDayBudget = Math.floor( money / month );


alert(`Ваш бюджет на 1 день: ${oneDayBudget}`);