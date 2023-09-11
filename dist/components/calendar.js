import { months } from '../utils/constants.js';
import { getDateInfo } from '../utils/dateInfo.js';
import { getDay, getDayEvents, renderDayEvents } from '../utils/renderEvents.js';
import { loadHolidays } from '../utils/holidays.js';
<<<<<<< HEAD
import { getEventExpiration } from '../utils/expiration.js';
import { updateMiniCalendar } from './minicalendar.js';
const currentDate = new Date();
=======
let currentDate = new Date();
>>>>>>> customPopovers
export function clearCalendar() {
    const daysDisplay = document.querySelector('.calendar__days');
    daysDisplay.innerHTML = '';
}
export function updateMonthHeader(currentDate) {
    const currentMonthInfo = months[currentDate.getMonth()];
    const monthHeader = document.querySelector('.calendar__month-title');
    if (monthHeader) {
        monthHeader.innerHTML = `${currentMonthInfo.name} ${currentDate.getFullYear()}`;
    }
}
<<<<<<< HEAD
function populateDays(currentDate, eventsToDisplay) {
    const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
    const daysDisplay = document.querySelector('.calendar__days');
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const adjustedLastDayOfWeek = lastDayOfWeek;
    appendPaddingDays(adjustedFirstDay, prevLastDay, daysDisplay, true);
    appendCurrentMonthDays(eventsToDisplay, currentDate, monthLength, daysDisplay);
=======
function updateExpiredEvents(eventsArray, currentMiliseconds) {
    eventsArray.forEach(event => {
        if (event.miliseconds < currentMiliseconds)
            event.expired = true;
    });
    localStorage.setItem('events', JSON.stringify(eventsArray));
    const eventExpirationDetails = getEventExpirationTimeout(eventsArray);
    eventExpirationDetails.nextEventsArray.forEach(toExpEvent => {
        setTimeout(() => {
            const eventEl = document.querySelector(`[data-event-id="${toExpEvent.id}"]`);
            eventEl === null || eventEl === void 0 ? void 0 : eventEl.classList.add('expired-event');
            updateExpiredEvents(eventsArray, currentMiliseconds);
        }, eventExpirationDetails.timeout);
    });
}
function addNotifications(eventsArray) {
    const eventNotificationDetails = getEventNotificationTimeout(eventsArray);
    console.log(eventNotificationDetails);
    eventNotificationDetails.nextEventsArray.forEach(toNotEvent => {
        setTimeout(() => {
            renderToast(toNotEvent);
            playNotificationSound('../media/sounds/notification_guitar.wav');
            addNotifications(eventsArray);
        }, eventNotificationDetails.timeout);
    });
}
function playNotificationSound(url) {
    console.log('init');
    const notificationSound = new Audio(url);
    notificationSound.play();
}
function renderToast(event) {
    const toastBodyEl = document.querySelector('#toastBody');
    toastBodyEl.textContent = `${event.reminder} minutes to ${event.title}`;
    const notificationToastEl = document.querySelector('#notificationToast');
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(notificationToastEl);
    toastBootstrap.show();
}
function getEventNotificationTimeout(eventsArray) {
    const currentMiliseconds = Date.now();
    const futureEventsArray = eventsArray.filter(localEvent => {
        return localEvent.timeToReminder > currentMiliseconds;
    });
    const nextTimeWithEvents = futureEventsArray.map(localEvent => {
        return localEvent.timeToReminder;
    }).sort()[0];
    const nextEventsArray = futureEventsArray.filter(localEvent => {
        return localEvent.timeToReminder === nextTimeWithEvents;
    });
    const timeout = nextTimeWithEvents - currentMiliseconds;
    return { timeout, nextEventsArray };
}
function getEventExpirationTimeout(eventsArray) {
    const currentMiliseconds = Date.now();
    const futureEventsArray = eventsArray.filter(localEvent => {
        return localEvent.miliseconds > currentMiliseconds;
    });
    const nextTimeWithEvents = futureEventsArray.map(localEvent => {
        return localEvent.miliseconds;
    }).sort()[0];
    const nextEventsArray = futureEventsArray.filter(localEvent => {
        return localEvent.miliseconds === nextTimeWithEvents;
    });
    const timeout = nextTimeWithEvents - currentMiliseconds;
    return { timeout, nextEventsArray };
}
function populateDays(currentDate) {
    let localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const currentMiliseconds = Date.now();
    updateExpiredEvents(localEvents, currentMiliseconds);
    addNotifications(localEvents);
    const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
    const daysDisplay = document.querySelector(".calendarDisplay");
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const adjustedLastDayOfWeek = lastDayOfWeek;
    appendPaddingDays(adjustedFirstDay, prevLastDay, daysDisplay, true);
    appendCurrentMonthDays(localEvents, currentDate, monthLength, daysDisplay, currentMiliseconds);
>>>>>>> customPopovers
    appendPaddingDays(7 - adjustedLastDayOfWeek, 0, daysDisplay, false);
}
function appendPaddingDays(count, start, container, isPrevMonth) {
    let value = isPrevMonth ? (start - count + 1) : 1;
    for (let i = 0; i < count; i++) {
        const day = document.createElement('p');
        day.innerText = `${value++}`;
        day.classList.add('paddingDay');
        container.appendChild(day);
    }
}
<<<<<<< HEAD
function appendCurrentMonthDays(eventsToDisplay, currentDate, monthLength, container) {
=======
function appendCurrentMonthDays(localEvents, currentDate, monthLength, container, currentMiliseconds) {
>>>>>>> customPopovers
    for (let i = 1; i <= monthLength; i++) {
        const currentDay = getDay(i, currentDate);
        const day = document.createElement('div');
        day.dataset.date = currentDay;
        day.classList.add('day');
        day.setAttribute('data-day-number', i.toString());
        day.addEventListener('click', (event) => {
            const clickedDay = event.currentTarget;
        });
        const dayNumber = document.createElement('p');
        dayNumber.innerText = `${i}`;
        dayNumber.classList.add('day__number');
        const dayEventsEl = document.createElement('ul');
        dayEventsEl.classList.add('day__events-list');
        day.append(dayNumber, dayEventsEl);
        if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            dayNumber.classList.add('today');
        }
<<<<<<< HEAD
        const dayEvents = getDayEvents(eventsToDisplay, i, currentDate);
        if (dayEvents) {
            const currentMiliseconds = Date.now();
            renderDayEvents(dayEvents, dayEventsEl, day, currentMiliseconds);
=======
        if (localEvents) {
            const dayEvents = getDayEvents(currentDay);
            if (dayEvents) {
                renderDayEvents(dayEvents, dayEventsEl, day, currentMiliseconds);
            }
>>>>>>> customPopovers
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
export function populateCalendar(currentDate, eventsToDisplay = JSON.parse(localStorage.getItem('events') || '[]')) {
    clearCalendar();
    updateMonthHeader(currentDate);
    populateDays(currentDate, eventsToDisplay);
    loadHolidaysAsync(currentDate.getFullYear());
}
const miniCalendarDate = new Date(currentDate);
updateMiniCalendar(miniCalendarDate);
