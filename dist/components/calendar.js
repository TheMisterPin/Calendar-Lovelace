import { months } from '../utils/constants.js';
import { getDateInfo } from '../utils/dateInfo.js';
import { getDayEvents, renderDayEvents } from '../utils/renderEvents.js';
import { loadHolidays } from '../utils/holidays.js';
let currentDate = new Date();
export function clearCalendar() {
    const daysDisplay = document.querySelector(".calendarDisplay");
    daysDisplay.innerHTML = '';
}
export function updateMonthHeader(currentDate) {
    const currentMonthInfo = months[currentDate.getMonth()];
    const monthHeader = document.querySelector(".calendar__month-title");
    if (monthHeader) {
        monthHeader.innerHTML = `${currentMonthInfo.name} ${currentDate.getFullYear()}`;
    }
}
function populateDays(currentDate) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
    const daysDisplay = document.querySelector(".calendarDisplay");
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjusting for Monday start
    const adjustedLastDayOfWeek = lastDayOfWeek; // Since Sunday is the last day, no adjustment needed
    appendPaddingDays(adjustedFirstDay, prevLastDay, daysDisplay, true);
    appendCurrentMonthDays(localEvents, currentDate, monthLength, daysDisplay);
    appendPaddingDays(7 - adjustedLastDayOfWeek, 0, daysDisplay, false);
}
function appendPaddingDays(count, start, container, isPrevMonth) {
    let value = isPrevMonth ? (start - count + 1) : 1;
    for (let i = 0; i < count; i++) {
        const day = document.createElement("p");
        day.innerText = `${value++}`;
        day.classList.add('paddingDay');
        container.appendChild(day);
    }
}
function appendCurrentMonthDays(localEvents, currentDate, monthLength, container) {
    for (let i = 1; i <= monthLength; i++) {
        const day = document.createElement('div');
        day.classList.add('day');
        day.setAttribute('data-day-number', i.toString());
        day.addEventListener('click', (event) => {
            const clickedDay = event.currentTarget;
            console.log(clickedDay.getAttribute('data-day-number'));
        });
        const dayNumber = document.createElement("p");
        dayNumber.innerText = `${i}`;
        dayNumber.classList.add('day__number');
        const dayEventsEl = document.createElement('ul');
        dayEventsEl.classList.add('day__events-list');
        day.append(dayNumber, dayEventsEl);
        if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            dayNumber.classList.add('today');
        }
        if (localEvents) {
            const dayEvents = getDayEvents(localEvents, i, currentDate);
            if (dayEvents) {
                renderDayEvents(dayEvents, dayEventsEl, day);
            }
        }
        container.appendChild(day);
    }
}
async function loadHolidaysAsync(year) {
    try {
        const holidays = await loadHolidays(year);
        if (holidays) {
            processHolidays(holidays);
        }
    }
    catch (error) {
        console.error('Error fetching holidays:', error);
    }
}
function processHolidays(holidays) {
    for (const holiday of holidays) {
        const holidayDate = new Date(holiday.date);
        if (holidayDate.getFullYear() === currentDate.getFullYear() && holidayDate.getMonth() === currentDate.getMonth()) {
            const day = holidayDate.getDate() + 4;
            const dayHolidayEventsEl = document.querySelector(`.day:nth-child(${day}) .day__events-list`);
            if (dayHolidayEventsEl) {
                const holidayEvent = document.createElement('li');
                holidayEvent.classList.add('holiday');
                holidayEvent.textContent = holiday.name;
                dayHolidayEventsEl.prepend(holidayEvent);
            }
        }
    }
}
export function populateCalendar(currentDate) {
    clearCalendar();
    updateMonthHeader(currentDate);
    populateDays(currentDate);
    loadHolidaysAsync(currentDate.getFullYear());
}
