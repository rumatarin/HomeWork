'use strict';

let money, time;
let month = 30;
let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  income: [],
  savings: true
};

function start() {
  money = +prompt('Ваш буджет на месяц', '');
  time = prompt('Введите дату в формате YYYY-MM-DD', '');

  while(isNaN(money) || money == "" || money == null) {
    money = +prompt('Ваш буджет на месяц', '');
  }
}

function chooseExpenses() {
  for (let i = 0; i < 2; i++) {
    let a = prompt("Введите обязательную статью расходов в этом месяце", '');
    let b = prompt('Во сколько обойдется', '');
  
    if ((typeof(a)) === 'string' && (typeof(a)) != null && 
    (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
      console.log('done');
      appData.expenses[a] = b;
    } else {
      console.log('wrong data');
      i--;
    }
  }
}

function chooseOptExpenses() {
  for (let i = 0; i < 3; i++) {
    let a = prompt('Статья необязательных расходов?');

    if((typeof(a)) === 'string' && (typeof(a)) != null && 
    a != '' && a.length < 50) {
      appData.optionalExpenses[i + 1] = a;
    } else {
      i--;
    }
  }
}

function detectDayBudget() {
  let oneDayBudget = Math.floor(money / month);
  appData.oneDayBudget = oneDayBudget;
  alert(`Ваш бюджет на 1 день: ${oneDayBudget}`);
}

function detectLevel() {
  if (appData.oneDayBudget < 900 ) {
    console.log('Минимальный уровень достатка');
  } else if (appData.oneDayBudget > 900 && appData.oneDayBudget < 2000) {
    console.log('Средний уровень достатка');
  } else if (appData.oneDayBudget > 2000) {
    console.log('Высокий уровень достатка');
  } else {
    console.log('Данные введены неправильно');
  }
}


function checkSavings() {
  if (appData.savings == true) {
    let save = +prompt('Какова сумма накопления?');
    let percent = +prompt('Под какой процент?');

    appData.monthIncome = save/100/12*percent;
    alert(`Доход в месяц с вашего депозита: ${Math.floor(appData.monthIncome)}`);
  }
}


start();
chooseExpenses();
chooseOptExpenses();
detectDayBudget();
detectLevel();
checkSavings();

console.log(appData);