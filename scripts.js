'use strict';
//  Элементы DOM для работы с ними

const header = document.querySelector('.header');
const headerLinks = document.querySelectorAll('.header-link');
const calendar = document.querySelector('#calendar');
const section2 = document.querySelector('.section-2');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const todayNum = document.querySelector('.calendar-today-num');
const todayMonth = document.querySelector('.calendar-today-month');
const todayDayWeek = document.querySelector('.calendar-today-day');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


// Объект даты и его глобальные значения (день месяца, месяц, год)

let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
let titleCalendarDate = document.querySelector('.month');


table.cellSpacing = '0';


// Текущий день по умолчанию в левом поле

function getToday() {

  let dayWeek = date.getDay() - 1;
  let days = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье'
  ];
  let months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ];

  todayNum.innerHTML = day;
  todayMonth.innerHTML = months[month];
  todayDayWeek.innerHTML = days[dayWeek];
}
getToday();


//  Создаем 6 tr (шесть недель в нашем календаре)

function createDays(firstDay, days) {
  for (let i = 0; i < 6; i++) {
    let tr = document.createElement('tr');
    tbody.appendChild(tr);
  }

  let trs = document.querySelectorAll('tbody tr');  //  Создаем 42 td в 6 tr (42 дня за 1 раз отображается в нашем календаре)
  for (let i = 0; i < trs.length; i++) {
    for (let j = 0; j < 7; j++) {
      let td = document.createElement('td');
      td.setAttribute("align","center");
      trs[i].appendChild(td);
    }
  }

  let tds = document.querySelectorAll('td');
  let dayCounter = 1;

  for(let i = firstDay; i < tds.length; i++) {  //  Выводим только дни текущего месяца, начиная с номера первого дня месяца
      tds[i].innerHTML = dayCounter;
      dayCounter++;

      if (i > days + 1) {  //Все, что не в ходит в текущий месяц, очищаем значения
        tds[i].innerHTML = '';
      }
  }
}


// По умолчанию заполняем календарь днями текущего месяца

function fillCalendar() {
  let month = date.getMonth() + 1;
  let monthDays = new Date(year, month, 0).getDate();
  let currentMonthDay = date.getDate();
  let currentFirstDay = new Date(year, month - 1, 1).getDay();

  titleCalendarDate.innerHTML = months[month - 1] + ' ' + year;

  //  Вызываем вспомогательную функцию для создания tr и td в них
  createDays(currentFirstDay - 1, monthDays);

  let tds = document.querySelectorAll('td');
  for(let i = currentFirstDay; i < tds.length; i++) { // Выделяем сегордняшний день
      if (tds[i - 1] === tds[currentMonthDay]) {
        tds[i].classList.add('currentDay');
      }
  }
}

fillCalendar();


// Анимация подгрузки элементов страницы

document.addEventListener('DOMContentLoaded', function() {
  let time = 400;
  let timer = 1;
  for (let i = 0; i < headerLinks.length; i++) {
      setInterval(() => {
        headerLinks[i].style.color = '#ffffff';
      }, (time * timer));
      timer++;
  }
  clearInterval();

  setTimeout(() => {
    //calendar.style.opacity = '1';
    calendar.style.marginLeft = '0';
  }, 2000)

  setTimeout(() => {
    section2.style.opacity = '1';
  }, 7000)
});


//  Создание календаря за предудущий месяц по клику на стрелку назад

prevBtn.addEventListener('click', () => {
  let tds = document.querySelectorAll('td');
  let prevFirstDay = new Date(year, month - 1, 1).getDay();
  let prevMonthDays = new Date(year, month, 0).getDate();

  //  Конвертирует нумерацию анлг дней (вс - 0) в рус (пн - 0)
  if (prevFirstDay === 0) {
    prevFirstDay = 6;
  } else {
    prevFirstDay--;
  }

  //  Очищаем таблицу
  for(let i = 0; i < tds.length; i++) {
    tds[i].innerHTML = '';

    //  Убираем выделение текущего дня
    if (tds[i].classList.contains('currentDay')) {
      tds[i].classList.remove('currentDay');
    }
  }

  let dayCounter = 1;
  let actualMonthDays = prevMonthDays + (prevFirstDay - 1);
  //  Выводим только дни текущего месяца, начиная с номера первого дня месяца
  for(let i = prevFirstDay; i < tds.length; i++) {
      tds[i].innerHTML = dayCounter;
      dayCounter++;
      if (i > actualMonthDays) {  //Все, что не в ходит в текущий месяц, очищаем значения
        tds[i].innerHTML = '';
      }
  }

  if (month === 0) {
    month = 11;
    year--;
  } else {
    month--;
  }

  titleCalendarDate.innerHTML = months[month] + ' ' + year;
});


//  Создание календаря на следующий месяц по клику на стрелку вперед

nextBtn.addEventListener('click', () => {
  let tds = document.querySelectorAll('td');
  let nextFirstDay = new Date(year, month + 1, 1).getDay();
  let nextMonthDays = new Date(year, month + 2, 0).getDate();

  // Конвертирует нумерацию анлг дней (вс - 0, пн - 1...) в рус (пн - 0, вт - 1...)
  if (nextFirstDay === 0) {
    nextFirstDay = 6;
  } else {
    nextFirstDay--;
  }

  //  Очищаем таблицу
  for(let i = 0; i < tds.length; i++) {
    tds[i].innerHTML = '';

    //  Убираем выделение текущего дня
    if (tds[i].classList.contains('currentDay')) {
      tds[i].classList.remove('currentDay');
    }
  }

  if (month === 11) {
    month = 0;
    year++;
  } else {
    month++;
  }

  titleCalendarDate.innerHTML = months[month] + ' ' + year;

  // console.log('_____________________________________________________________');
  // console.log('nextFirstDay ' + nextFirstDay);
  // console.log('nextMonthDays ' + nextMonthDays);
  // console.log('next month ' + month);
  // console.log('next month name ' + months[month]);
  // console.log('------------------------------------------------------------');

  let dayCounter = 1;
  let actualMonthDays = nextMonthDays + (nextFirstDay - 1);
  //  Выводим только дни текущего месяца, начиная с номера первого дня месяца
  for(let i = nextFirstDay; i < tds.length; i++) {
      tds[i].innerHTML = dayCounter;
      dayCounter++;
      if (i > actualMonthDays) {  //Все, что не в ходит в текущий месяц, очищаем значения
        tds[i].innerHTML = '';
      }
  }

});
