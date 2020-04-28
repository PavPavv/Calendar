'use strict';
//  Элементы DOM для работы с ними

const header = document.querySelector('.header');
const headerLinks = document.querySelectorAll('.header-link');
const calendar = document.querySelector('#calendar');
const section2 = document.querySelector('.section-2');
const table = document.querySelector('table');
const tbody = document.querySelector('tbody');
const todayTitle = document.querySelector('.calendar-today-title');
const todayNum = document.querySelector('.calendar-today-num');
const todayMonth = document.querySelector('.calendar-today-month');
const todayDayWeek = document.querySelector('.calendar-today-day');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');


// Объект даты и его глобальные значения (день месяца, месяц, год)

let date = new Date();
let globalYear = date.getFullYear();
let globalMonth = date.getMonth();
let globalDayWeek = date.getDay();
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
let days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];
let titleCalendarDate = document.querySelector('.month');
let currentMonthDay = date.getDate();
let pickedYear;


table.cellSpacing = '0';

// ! Самый низкий уровень абстракции
// Текущий день по умолчанию в левом поле

function getToday() {
  let dayWeek = date.getDay() - 1;
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


//  Очищаем таблицу от знчений по умолчанию

function clearTable(elem) {
  for(let i = 0; i < elem.length; i++) {  //  Очищаем таблицу
    elem[i].innerHTML = '';

    if (elem[i].classList.contains('currentDay')) { //  Убираем выделение текущего дня
      elem[i].classList.remove('currentDay');
    }
  }
}


//  Выделяем текущий день

function alwaysTodayOn(firstMonthDay) {
  let tds = document.querySelectorAll('td');
  for(let i = firstMonthDay; i < tds.length; i++) { // Выделяем сегордняшний день
    if (tds[i - 1] === tds[currentMonthDay]) {
      tds[i].classList.add('currentDay');
    }
  }
}


//  Запоминаем выбранный день при изменении состояния (при клике вперед-назад)

function rememberPickedDay(firstMonthDay, m, y) {
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
  let day = +todayNum.innerHTML;
  let monthFromArr = todayMonth.innerHTML;
  let monthNum;

  months.forEach((item, i) => {
    if (monthFromArr === item) {
      monthNum = i;
    }
  });

  console.log(monthNum);
  console.log('-------------------------------------------');
  let tds = document.querySelectorAll('td')
  if (pickedYear === y && monthNum === month) {
    console.log(pickedYear + ' - ' + y);
    console.log(monthNum + ' - ' + month);
    if (tds) {
      for (let i = firstMonthDay; i < tds.length; i++) {
        tds[day + 1].classList.add('picked-date1');
      }
    } else {
      for (let i = 0; i < tds.length; i++) {
        tds[i].classList.remove('picked-date1');
      }
    }
  }

  console.log(day);
  console.log(monthNum);
  console.log(month);
  console.log(y);
  console.log('________________________________________________');
}


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


// Показываем выбранный день в панели слева

function datePicker(month, year) {
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
  let tds = document.querySelectorAll('td');

  for (let i = 0; i < tds.length; i++) { // Навешиваем прослушку событий на все td
    tds[i].addEventListener('click', function(event) {
      for (let i = 0; i < tds.length; i++) {  //  убираем дубли якоря выбранного дня, мы можем выбрать, по уловию, только 1 день
        if (tds[i].classList.contains('picked-date')) {
          tds[i].classList.remove('picked-date')
        }
      }

      let target = event.target; // кликнутый элемент
      target.classList.add('picked'); //  помечеам его
      target.classList.add('picked-date');

      let neededTr = target.parentNode; //  находим его родителя, т.е. tr
      let trList = neededTr.childNodes; //  чтобы найти все tr только за неделю
      for (let j = 0; j < trList.length; j++) { //  чтобы узнать индекс дня недели
        if (trList[j].classList.contains('picked')) {
          todayDayWeek.innerHTML = days[j]; //  и вывести его на странице
          trList[j].classList.remove('picked'); // убираем уникальную метку за собой или она перестанет быть уникальтной и начнется каша
        }
      }
      todayTitle.innerHTML = 'Вы выбрали:'; //  заполняем оставшиеся значения
      todayNum.innerHTML = target.innerHTML;
      todayMonth.innerHTML = months[month];
      pickedYear = year;
    });
  }
}


// !! Средний уровень абстракции
// По умолчанию заполняем календарь днями текущего месяца

function fillCalendar() {
  let month = date.getMonth() + 1;
  let monthDays = new Date(year, month, 0).getDate();
  let currentFirstDay = new Date(year, month - 1, 1).getDay();

  titleCalendarDate.innerHTML = months[month - 1] + ' ' + year;

  createDays(currentFirstDay - 1, monthDays); //  Вызываем вспомогательную функцию для создания tr и td в них
  alwaysTodayOn(currentFirstDay); //  Функция для выделения текущего дня
}


// Анимация подгрузки элементов страницы и, по сути, главный метод, который запускает вместе с подгрузкой все остальные функции

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
    fillCalendar();
    getToday();
    datePicker(globalMonth);
  }, 1800)
});


//  Создание календаря за предудущий месяц по клику на стрелку назад

prevBtn.addEventListener('click', () => {
  let tds = document.querySelectorAll('td');
  let prevFirstDay = new Date(year, month - 1, 1).getDay();
  let prevMonthDays = new Date(year, month, 0).getDate();

  for (let i = 0; i < tds.length; i++) {
    if (tds[i].classList.contains('picked-date')) {
      tds[i].classList.remove('picked-date');
    }
  }

  //  Конвертирует нумерацию анлг дней (вс - 0) в рус (пн - 0)
  if (prevFirstDay === 0) {
    prevFirstDay = 6;
  } else {
    prevFirstDay--;
  }

  clearTable(tds);

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

  if (year === globalYear && month === globalMonth) { // Всегда выделяем текущий день после работы стрелок
    alwaysTodayOn(prevFirstDay);
  }
  datePicker(month, year);  // Подключаем работу datePicker
  rememberPickedDay(prevMonthDays, month, year);
});


//  Создание календаря на следующий месяц по клику на стрелку вперед

nextBtn.addEventListener('click', () => {
  let tds = document.querySelectorAll('td');
  let nextFirstDay = new Date(year, month + 1, 1).getDay();
  let nextMonthDays = new Date(year, month + 2, 0).getDate();

  for (let i = 0; i < tds.length; i++) {
    if (tds[i].classList.contains('picked-date')) {
      tds[i].classList.remove('picked-date')
    }
  }

  // Конвертирует нумерацию анлг дней (вс - 0, пн - 1...) в рус (пн - 0, вт - 1...)
  if (nextFirstDay === 0) {
    nextFirstDay = 6;
  } else {
    nextFirstDay--;
  }

  clearTable(tds);

  if (month === 11) {
    month = 0;
    year++;
  } else {
    month++;
  }

  titleCalendarDate.innerHTML = months[month] + ' ' + year;

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

  if (year === globalYear && month === globalMonth) { // Всегда выделяем текущий день после работы стрелок
    alwaysTodayOn(nextFirstDay);
  }
  datePicker(month, year);  // Подключаем работу datePicker
  rememberPickedDay(nextFirstDay, month, year);
});
