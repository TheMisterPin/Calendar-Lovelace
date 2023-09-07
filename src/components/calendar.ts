import { months } from '../utils/constants.js';
import { getDateInfo } from '../utils/dateInfo.js';
import { getDayEvents, renderDayEvents } from '../utils/renderEvents.js';
import { loadHolidays, HolidayInfo } from '../utils/holidays.js';
import { eventsExpired } from '../utils/expiration.js';

let currentDate: Date = new Date();
export function clearCalendar(): void {
    const daysDisplay: HTMLElement = document.querySelector(".calendarDisplay")!;
    daysDisplay.innerHTML = '';
}

export function updateMonthHeader(currentDate: Date): void {
    const currentMonthInfo = months[currentDate.getMonth()];
    const monthHeader = document.querySelector(".calendarHeader h3") as HTMLElement;
    if (monthHeader) {
        monthHeader.innerHTML = `${currentMonthInfo.name} ${currentDate.getFullYear()}`;
    }
}

function populateDays(currentDate: Date): void {
  const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
  const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
  const daysDisplay: HTMLElement = document.querySelector(".calendarDisplay")!;

  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjusting for Monday start
  const adjustedLastDayOfWeek = lastDayOfWeek; // Since Sunday is the last day, no adjustment needed

  appendPaddingDays(adjustedFirstDay, prevLastDay, daysDisplay, true);
  appendCurrentMonthDays(localEvents, currentDate, monthLength, daysDisplay);
  appendPaddingDays(7 - adjustedLastDayOfWeek, 0, daysDisplay, false);
}

function appendPaddingDays(count: number, start: number, container: HTMLElement, isPrevMonth: boolean) {
  let value = isPrevMonth ? (start - count + 1) : 1;
  for (let i = 0; i < count; i++) {
      const day: HTMLParagraphElement = document.createElement("p");
      day.innerText = `${value++}`;
      day.classList.add('paddingDay');
      container.appendChild(day);
  }
}

function appendCurrentMonthDays(localEvents: any[], currentDate: Date, monthLength: number, container: HTMLElement) {
    for (let i = 1; i <= monthLength; i++) {
        const day: HTMLDivElement = document.createElement('div');
        day.classList.add('day');
        day.setAttribute('data-day-number', i.toString());
        day.addEventListener('click', (event) => {
            const clickedDay = event.currentTarget as HTMLElement;
            console.log(clickedDay.getAttribute('data-day-number'));
        });

        const dayNumber: HTMLParagraphElement = document.createElement("p");
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
  
async function loadHolidaysAsync(year: number): Promise<void> {
  try {
    const holidays = await loadHolidays(year);
    if (holidays) {
      processHolidays(holidays);
    }
  } catch (error) {
    console.error('Error fetching holidays:', error);
  }
}

function processHolidays(holidays: HolidayInfo[]): void {
  for (const holiday of holidays) {
    const holidayDate = new Date(holiday.date);
    if (holidayDate.getFullYear() === currentDate.getFullYear() && holidayDate.getMonth() === currentDate.getMonth()) {
      const day = holidayDate.getDate() + 4;
      const dayHolidayEventsEl = document.querySelector(`.day:nth-child(${day}) .day__events-list`);
      if (dayHolidayEventsEl) {
        const holidayEvent = document.createElement('li')
        holidayEvent.classList.add('holiday')
        holidayEvent.textContent = holiday.name
        dayHolidayEventsEl.prepend(holidayEvent)
      }
    }
  }
}

export function populateCalendar(currentDate: Date): void {
  clearCalendar();
  updateMonthHeader(currentDate);
  populateDays(currentDate);
  loadHolidaysAsync(currentDate.getFullYear());
  eventsExpired()
}

const miniCalendarBody = document.querySelector('.mini-calendar-body')!;
const miniCalendarMonthYear = document.querySelector('.mini-calendar-month-year');
const miniPrevBtn = document.getElementById('mini-prev');
const miniNextBtn = document.getElementById('mini-next');

let miniCalendarDate: Date = new Date(currentDate);

function updateMiniCalendar(date: Date): void {
  if (miniCalendarMonthYear) {
    miniCalendarMonthYear.textContent = `${months[date.getMonth()].name} ${date.getFullYear()}`;
  }
  if (miniCalendarBody) {
    miniCalendarBody.innerHTML = '';
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
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.textContent = `${prevMonthDay}`;
    listItem.classList.add('mini-calendar-padding-day');
    miniCalendarBody.appendChild(listItem);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const day: number = i;
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.textContent = `${day}`;
    listItem.classList.add('mini-calendar-day');
    
    listItem.addEventListener('click', () => {
      currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      populateCalendar(currentDate);
    });

    miniCalendarBody.appendChild(listItem);
  }

  for (let i = 1; i <= daysToFillRows; i++) {
    const listItem: HTMLLIElement = document.createElement('li');
    listItem.textContent = `${i}`;
    listItem.classList.add('mini-calendar-padding-day');
    miniCalendarBody.appendChild(listItem);
  }
}

  miniPrevBtn!.addEventListener('click', () => {
    miniCalendarDate.setMonth(miniCalendarDate.getMonth() - 1);
    updateMiniCalendar(miniCalendarDate);
  });

  miniNextBtn!.addEventListener('click', () => {
    miniCalendarDate.setMonth(miniCalendarDate.getMonth() + 1);
    updateMiniCalendar(miniCalendarDate);
  });


updateMiniCalendar(miniCalendarDate);