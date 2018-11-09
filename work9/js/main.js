window.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // Tabs

  let tab = document.querySelectorAll('.info-header-tab');
  let info = document.querySelector('.info-header');
  let tabContent = document.querySelectorAll('.info-tabcontent');

  function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
      tabContent[i].classList.remove('show');
      tabContent[i].classList.add('hide');

    }
  }
  hideTabContent(1);

  function showTabContent(b) {
    if(tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function(e) {
    let target = e.target;
    if (target && target.classList.contains('info-header-tab')) {
      for (let i = 0; i < tab.length; i++) {
        if (target == tab[i]) {
          hideTabContent(0);
          showTabContent(i);
          break;
        }
      }
    }
  });

  // Timer

  let deadline = '2018-11-18';

  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t/1000) % 60);
    let minutes = Math.floor((t/1000/60) % 60);
    let hours = Math.floor((t/(1000*60*60)));

    return {
      'total' : t,
      'hours' : hours,
      'minutes' : minutes,
      'seconds' : seconds
    };
  }

  function setClock(id, endtime) {
    let timer = document.getElementById(id);
    let hours = timer.querySelector('.hours');
    let minutes = timer.querySelector('.minutes');
    let seconds = timer.querySelector('.seconds');
    let timeInterval = setInterval(updateClock, 1000);

    function updateClock() {
      let t = getTimeRemaining(endtime);
      hours.textContent = `${t.hours < 10 ? '0' : ''}${t.hours}`;
      minutes.textContent = `${t.minutes < 10 ? '0' : ''}${t.minutes}`;
      seconds.textContent = `${t.seconds < 10 ? '0' : ''}${t.seconds}`;

      if (t.total <= 0) {
        clearInterval(timeInterval);
        hours.textContent = `${t.hours < 10 ? '0' : ''}${0}`;
        minutes.textContent = `${t.minutes < 10 ? '0' : ''}${0}`;
        seconds.textContent = `${t.seconds < 10 ? '0' : ''}${0}`;
      }
    }
  }
  setClock('timer', deadline);
});