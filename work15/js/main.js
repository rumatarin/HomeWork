window.addEventListener('DOMContentLoaded', function () {
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
    if (tabContent[b].classList.contains('hide')) {
      tabContent[b].classList.remove('hide');
      tabContent[b].classList.add('show');
    }
  }

  info.addEventListener('click', function (e) {
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
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)));

    return {
      'total': t,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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

  // Mddal window

  let more = document.querySelector('.more');
  let overlay = document.querySelector('.overlay');
  let close = document.querySelector('.popup-close');
  let infoBox = document.querySelector('.info');

  more.addEventListener('click', function () {
    overlay.style.display = 'block';
    this.classList.add('more-splash');
    document.body.style.overflow = 'hidden';
  });

  close.addEventListener('click', function () {
    overlay.style.display = 'none';
    more.classList.remove('more-splash');
    document.body.style.overflow = 'auto';
  });

  infoBox.addEventListener('click', function (e) {
    let target = e.target;
    if (target && target.classList.contains('description-btn')) {
      overlay.style.display = 'block';
      this.classList.add('more-splash');
      document.body.style.overflow = 'hidden';
      console.log(this);
    }
  });

  // Form

  let message = {
    loading: 'Загрузка...',
    success: 'Спасибо, скоро мы с вами свяжемся!',
    failure: 'Что-то пошло не так...'
  }

  let form = document.querySelector('.main-form')[0];
  let contactsForm = document.getElementById('form');
  let input = document.getElementsByTagName('input');
  let statusMsg = document.createElement('div');

  statusMsg.classList.add('status');


  form.addEventListener('submit', postInfo);
  contactsForm.addEventListener('submit', postInfo);



  function postInfo(el) {
    el.addEventListener('submit', function (e) {
      e.preventDefault();
      el.appendChild(statusMsg);
      let formData = new FormData(el);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open('POST', 'server.php');
          request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

          let obj = {};
          formData.forEach(function (value, key) {
            obj[key] = value;
          });
          let json = JSON.stringify(obj);

          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4) {
              if (request.status == 200 && request.status < 300) {
                resolve();
              } else {
                reject();
              }
            }
          }

          request.send(data);
        });
      }

      function clearInput() {
        for (let i = 0; i < input.length; i++) {
          input[i].value = '';
        }
      }

      postData(formData)
        .then(() => statusMsg.innerHTML = message.loading)
        .then(() => statusMsg.innerHTML = message.success)
        .catch(() => statusMsg.innerHTML = message.failure)
        .then(clearInput);
    });
  }
  postInfo(form);
  postInfo(contactsForm);

  // Slider

  let slideIndex = 1;
  let slides = document.querySelectorAll('.slider-item');
  let prev = document.querySelector('.prev');
  let next = document.querySelector('.next');
  let dotsWrap = document.querySelector('.slider-dots');
  let dots = document.querySelectorAll('.dot');

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }

    slides.forEach((item) => item.style.display = 'none');
    dots.forEach((item) => item.classList.remove('dot-active'));

    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('dot-active');
  }

  function plusSlides(n) {
    showSlides(slideIndex += n);
  }

  function currentSlide(n) {
    showSlides(slideIndex = n);
  }

  prev.addEventListener('click', function () {
    plusSlides(-1);
  });

  next.addEventListener('click', function () {
    plusSlides(1);
  });

  dotsWrap.addEventListener('click', function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  });

  // Calculator

  let persons = document.querySelectorAll('.counter-block-input')[0];
  let restDays = document.querySelectorAll('.counter-block-input')[1];
  let place = document.getElementById('select');
  let totalValue = document.getElementById('total');
  let personsSum = 0;
  let daysSum = 0;
  let total = 0;

  totalValue.innerHTML = 0;

  persons.addEventListener('change', function () {
    personsSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  restDays.addEventListener('change', function () {
    daysSum = +this.value;
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      totalValue.innerHTML = total;
    }
  });

  place.addEventListener('change', function () {
    if (restDays.value == '' || persons.value == '') {
      totalValue.innerHTML = 0;
    } else {
      let a = total;
      totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
  });
});