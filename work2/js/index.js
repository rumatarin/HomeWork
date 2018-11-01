'use strict';

let money = +prompt('Ваш буджет на месяц', ''),
  time = prompt('Введите дату в формате YYYY-MM-DD', '');

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: '',
  income: [],
  savings: false
};


for (let i = 0; i < 2; i++) {
  let a = prompt("Введите обязательную статью расходов в этом месяце", '');
  let b = prompt('Во сколько обойдется', '');

  if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
    console.log('done');
    appData.expenses[a] = b;
  } else {
    console.log('wrong data');
    i--;
  }
  
}

// let i = 0;
// while (i < 2) {
//   let a = prompt("Введите обязательную статью расходов в этом месяце", '');
//   let b = prompt('Во сколько обойдется', '');

//   if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
//     console.log('done');
//     appData.expenses[a] = b;
//   } else {
//     console.log('wrong data');
//     i--;
//   }
//   i++;
// }

// let i = 0;
// do {
//   let a = prompt("Введите обязательную статью расходов в этом месяце", '');
//   let b = prompt('Во сколько обойдется', '');

//   if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && a != '' && b != '' && a.length < 50) {
//     console.log('done');
//     appData.expenses[a] = b;
//   } else {
//     console.log('wrong data');
//     i--;
//   }
//   i++;
// } while (i < 2);


let month = 30;
let oneDayBudget = Math.floor(money / month);

appData.oneDayBudget = oneDayBudget;

alert(`Ваш бюджет на 1 день: ${oneDayBudget}`);

if (appData.oneDayBudget < 900 ) {
  console.log('Минимальный уровень достатка');
} else if (appData.oneDayBudget > 900 && appData.oneDayBudget < 2000) {
  console.log('Средний уровень достатка')
} else if (appData.oneDayBudget > 2000) {
  console.log('Высокий уровень достатка')
} else {
  console.log('Данные введены неправильно');
}