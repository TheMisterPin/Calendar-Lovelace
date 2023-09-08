import { populateCalendar } from '../components/calendar.js';
import { months } from '../utils/constants.js';
const miniCalendarBody = document.querySelector('.mini-calendar-body');
const miniCalendarMonthYear = document.querySelector('.mini-calendar-month-year');
const miniPrevBtn = document.querySelector('#miniPrev');
const miniNextBtn = document.querySelector('#miniNext');
let currentDate = new Date();
let miniCalendarDate = new Date(currentDate);
export function updateMiniCalendar(date) {
    if (miniCalendarMonthYear) {
        miniCalendarMonthYear.textContent = `${months[date.getMonth()].name} ${date.getFullYear()}`;
    }
    if (miniCalendarBody) {
        miniCalendarBody.replaceChildren();
    }
    const mainCalendarFirstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const startDay = (mainCalendarFirstDay.getDay() + 6) % 7;
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    const daysFromPrevMonth = startDay;
    const numRowsNeeded = Math.ceil((daysFromPrevMonth + daysInMonth) / 7);
    const daysToFillRows = numRowsNeeded * 7 - (daysFromPrevMonth + daysInMonth);
    for (let i = 1; i <= daysFromPrevMonth; i++) {
        const prevMonthDay = prevMonthLastDay.getDate() - (daysFromPrevMonth - i);
        const listItem = document.createElement('li');
        listItem.textContent = `${prevMonthDay}`;
        listItem.classList.add('mini-calendar-padding-day');
        miniCalendarBody.appendChild(listItem);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const day = i;
        const listItem = document.createElement('li');
        listItem.textContent = `${day}`;
        listItem.classList.add('mini-calendar-day');
        listItem.addEventListener('click', () => {
            currentDate = new Date(date.getFullYear(), date.getMonth(), day);
            populateCalendar(currentDate);
        });
        miniCalendarBody.appendChild(listItem);
    }
    for (let i = 1; i <= daysToFillRows; i++) {
        const listItem = document.createElement('li');
        listItem.textContent = `${i}`;
        listItem.classList.add('mini-calendar-padding-day');
        miniCalendarBody.appendChild(listItem);
    }
}
miniPrevBtn.addEventListener('click', () => {
    miniCalendarDate.setMonth(miniCalendarDate.getMonth() - 1);
    updateMiniCalendar(miniCalendarDate);
});
miniNextBtn.addEventListener('click', () => {
    miniCalendarDate.setMonth(miniCalendarDate.getMonth() + 1);
    updateMiniCalendar(miniCalendarDate);
});
updateMiniCalendar(miniCalendarDate);
