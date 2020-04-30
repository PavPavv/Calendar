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
const titleCalendarDate = document.querySelector('.month');


// Объект даты и его глобальные значения (день месяца, месяц, год)

// эти переменные всегда возвращает текущее значение даты, она не модифицируется никак в коде, это важно!
let date = new Date();
let globalYear = date.getFullYear();
let globalMonth = date.getMonth();
let globalDayWeek = date.getDay();
let currentMonthDay = date.getDate();
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
let monthsDecl = [
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

//  эти глобальные переменные модифицируются в коде и их именения видны другим функциям
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear(); // это значение переписывается при клике на предудущий/следующий месяц
let pickedYear;


table.cellSpacing = '0';


// ! Самый низкий уровень абстракции
// Текущий день по умолчанию в левом поле

function getToday() {
  let dayWeek = date.getDay() - 1;

  todayNum.innerHTML = day;
  todayMonth.innerHTML = monthsDecl[month];
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

function datePicker(month, year = globalYear) {
  let tds = document.querySelectorAll('td');

  for (let i = 0; i < tds.length; i++) { // Навешиваем прослушку событий на все td
    tds[i].addEventListener('click', function(event) {
      for (let i = 0; i < tds.length; i++) {  //  убираем дубли якоря выбранного дня, мы можем выбрать, по уловию, только 1 день
        if (tds[i].classList.contains('picked-date')) {
          tds[i].classList.remove('picked-date')
        }
      }

      let target = event.target; // кликнутый элемент
      target.classList.add('picked', 'picked-date'); //  помечеам его, отмечаем с помощью класса 'picked'и выделяем с помощью класса 'picked-date'

      let neededTr = target.parentNode; //  находим его родителя, т.е. tr
      let trList = neededTr.childNodes; //  чтобы найти все tr только за неделю
      for (let j = 0; j < trList.length; j++) { //  чтобы узнать индекс дня недели
        if (trList[j].classList.contains('picked')) {
          todayDayWeek.innerHTML = days[j]; //  и вывести его на странице
          trList[j].classList.remove('picked'); // убираем уникальную метку за собой или она перестанет быть уникальтной и начнется каша
        }
      }

      if (tds[i].classList.contains('picked-date') && tds[i].classList.contains('not-actual')) { // проверяем, если кликнутый день не входит в этот месяц, то показываем предыдущий месяц
        todayTitle.innerHTML = 'Вы выбрали:'; //  заполняем оставшиеся значения
        todayNum.innerHTML = target.innerHTML;
        todayMonth.innerHTML = monthsDecl[month - 1];
      } else {
        todayTitle.innerHTML = 'Вы выбрали:'; //  заполняем оставшиеся значения
        todayNum.innerHTML = target.innerHTML;
        todayMonth.innerHTML = monthsDecl[month];
      }
      pickedYear = year;
    });
  }
}


//  Запоминаем выбранный день при изменении состояния (при клике вперед-назад)

function rememberPickedDay(firstMonthDay, m, y) {
  const staticNum = 1;
  let day = +todayNum.innerHTML;
  let monthFromArr = todayMonth.innerHTML;
  let monthNum;

  monthsDecl.forEach((item, i) => {
    if (monthFromArr === item) {
      monthNum = i;
    }
  });

  let tds = document.querySelectorAll('td')
  if (pickedYear === y && monthNum === month) {

    for (let i = firstMonthDay; i < tds.length; i++) {
      let numDay = tds[i].innerHTML;
      if (numDay == day) {
        tds[i].classList.add('picked-date');
      }
    }
  } else {
    for (let i = firstMonthDay; i < tds.length; i++) {
      tds[i].classList.remove('picked-date');
    }
  }
}


// Находим и заполняем последние дни предыдущего месяца

function lastDaysOfPrevMonth(firstCurMonthDay, month = globalMonth, year = globalYear) {
  let tds = document.querySelectorAll('td');
  let prevDays = new Date(year, month, 0).getDate();
  let prevMonthLastDays = prevDays - (firstCurMonthDay - 1);

  for (let i = 0; i < tds.length; i++) {
    if (tds[i].classList.contains('not-actual')) {
      tds[i].classList.remove('not-actual')
    }

    if (i < firstCurMonthDay) {
      tds[i].classList.add('not-actual');
      tds[i].innerHTML = prevMonthLastDays;
      prevMonthLastDays++;
    }
  }
}

function firstDaysOfNextMonth(month = globalMonth, year = globalYear) {
  let tds = document.querySelectorAll('td');
  let days = new Date(year, month, 0).getDate();
  //let prevMonthLastDays = prevDays - (firstCurMonthDay - 1);

  console.log('days : ' + days);
  console.log('globalMonth : ' + globalMonth);
  console.log('month : ' + (month));
  // for (let i = 0; i < tds.length; i++) {
  //   if (tds[i].classList.contains('not-actual')) {
  //     tds[i].classList.remove('not-actual')
  //   }
  //
  //   if (i < firstCurMonthDay) {
  //     tds[i].classList.add('not-actual');
  //     tds[i].innerHTML = prevMonthLastDays;
  //     prevMonthLastDays++;
  //   }
  // }
}


// !! Средний уровень абстракции
// По умолчанию заполняем календарь днями текущего месяца

function fillCalendar() {
  let month = date.getMonth() + 1;
  let monthDays = new Date(globalYear, month, 0).getDate();
  let currentFirstDay = new Date(globalYear, month - 1, 1).getDay();

  titleCalendarDate.innerHTML = months[month - 1] + ' ' + globalYear;

  createDays(currentFirstDay - 1, monthDays); //  Вызываем вспомогательную функцию для создания tr и td в них
  alwaysTodayOn(currentFirstDay); //  Функция для выделения текущего дня
  lastDaysOfPrevMonth(currentFirstDay - 1);
  firstDaysOfNextMonth();
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

  if (prevFirstDay === 0) { //  Конвертирует нумерацию анлг дней (вс - 0) в рус (пн - 0)
    prevFirstDay = 6;
  } else {
    prevFirstDay--;
  }

  clearTable(tds);

  let dayCounter = 1;
  let actualMonthDays = prevMonthDays + (prevFirstDay - 1);

  for(let i = prevFirstDay; i < tds.length; i++) {    //  Выводим только дни текущего месяца, начиная с номера первого дня месяца
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

  datePicker(month, year);  // запускаем работу datePicker
  rememberPickedDay(prevFirstDay, month, year);
  lastDaysOfPrevMonth(prevFirstDay, month, year);
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

  if (nextFirstDay === 0) { // Конвертирует нумерацию анлг дней (вс - 0, пн - 1...) в рус (пн - 0, вт - 1...)
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

  for(let i = nextFirstDay; i < tds.length; i++) {  //  Выводим только дни текущего месяца, начиная с номера первого дня месяца
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
  lastDaysOfPrevMonth(nextFirstDay, month, year);
});
