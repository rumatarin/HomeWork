'use strict';

let startBtn = document.getElementById('start');


let budgetValue = document.getElementsByClassName('budget-value')[0];
let dayBudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensValue = document.getElementsByClassName('expenses-value')[0];
let optExpensValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthSavingValue = document.getElementsByClassName('monthsavings-value')[0];
let yearSavingValue = document.getElementsByClassName('yearsavings-value')[0];

let expensesItems = document.getElementsByClassName('expenses-item');
let approveBtn = document.getElementsByTagName('button')[0];
let optApproveBtn = document.getElementsByTagName('button')[1];
let calcBtn = document.getElementsByTagName('button')[2];
let optExpensItem = document.querySelectorAll('.optionalexpenses-item');
let incomeInput = document.querySelector('.choose-income');
let savingsCheckbox = document.querySelector('#savings');
let sumValue = document.querySelector('.choose-sum');
let percentValue = document.querySelector('.choose-percent');
let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

let btns = document.querySelectorAll('.data button');




for (let i = 0; i < 3; i++) {
  btns[i].disabled = true;
  btns[i].style.backgroundImage = 'none';
}



let money, time;
let monthFull = 30;
let sum = 0;



startBtn.addEventListener('click', function() {
  time = prompt('Введите дату в формате YYYY-MM-DD', '');
  money = +prompt('Ваш буджет на месяц', '');

  while (isNaN(money) || money == "" || money == null) {
    money = +prompt('Ваш буджет на месяц', '');
  }

  appData.budget = money;
  appData.timeData = time;
  budgetValue.textContent = Math.floor(money);
  year.value = new Date(Date.parse(time)).getFullYear();
  month.value = new Date(Date.parse(time)).getMonth() + 1;
  day.value = new Date(Date.parse(time)).getDate();

  for (let i = 0; i < 3; i++) {
    btns[i].disabled = false;
    btns[i].style.backgroundImage = 'linear-gradient(336deg, #ffbd75, #ff964b), linear-gradient(#fff, #fff)';
  }

 
});

approveBtn.addEventListener('click', function() {
  

  for (let i = 0; i < expensesItems.length; i++) {
    let a = expensesItems[i].value;
    let b = expensesItems[++i].value;

    if ((typeof (a)) === 'string' && (typeof (a)) != null &&
      (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
      console.log('done');
      appData.expenses[a] = b;
      sum+= +b;
    } else {
      console.log('wrong data');
      i--;
    }
  }
  expensValue.textContent = sum;
  return sum;
});

optApproveBtn.addEventListener('click', function() {
  for (let i = 0; i < optExpensItem.length; i++) {
    let opt = optExpensItem[i].value;

    if ((typeof (opt)) === 'string' && (typeof (opt)) != null &&
      opt != '' && opt.length < 50) {
      appData.optionalExpenses[i] = opt;
    }
    optExpensValue.textContent += appData.optionalExpenses[i] + ', ';  
  }
});

calcBtn.addEventListener('click', function() {

  if (appData.budget != undefined || expensValue.value != undefined) {
    let oneDayBudget = Math.floor((appData.budget - sum) / monthFull);
    appData.oneDayBudget = oneDayBudget;
    dayBudgetValue.textContent = appData.oneDayBudget;

    if (appData.oneDayBudget < 900) {
      levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.oneDayBudget > 900 && appData.oneDayBudget < 2000) {
      levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.oneDayBudget > 2000) {
      levelValue.textContent = 'Высокий уровень достатка';
    } else {
      levelValue.textContent = 'Данные введены неправильно';
    }
  } else {
    dayBudgetValue.textContent = 'Произошла ошибка';
    setTimeout( () => {
      alert('Введите обязательные расходы!');
    }, 1000);
  }

  
});

incomeInput.addEventListener('input', function() {
  let items = incomeInput.value;
  appData.income = items.split(', ');
  incomeValue.textContent = appData.income;
});

savingsCheckbox.addEventListener('click', function () {
  if (appData.savings == true) {
    appData.savings = false;
  } else {
    appData.savings = true;
  }
});

sumValue.addEventListener('input', function() {
  if (appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthIncome = sum / 100 / 12 * percent;
    appData.yearIncome = sum / 100 * percent;

    monthSavingValue.textContent = Math.floor(appData.monthIncome);
    yearSavingValue.textContent = Math.floor(appData.yearIncome);
  }
});

percentValue.addEventListener('input', function() {
  if (appData.savings == true) {
    let sum = +sumValue.value;
    let percent = +percentValue.value;

    appData.monthIncome = sum / 100 / 12 * percent;
    appData.yearIncome = sum / 100 * percent;

    monthSavingValue.textContent = Math.floor(appData.monthIncome);
    yearSavingValue.textContent = Math.floor(appData.yearIncome);
  }
});

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: false,
};





// console.log(appData);
