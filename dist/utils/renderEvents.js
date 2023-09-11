/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatDate } from "./formatDate.js";
export function getDay(day, currentDate) {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = day;
    return formatDate(`${currentMonth} ${currentDay}, ${currentYear}`);
}
export function getDayEvents(day) {
    let localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    return localEvents.filter((calendarEvent) => calendarEvent.date === day);
}
function renderEvent(calendarEvent, eventContainer) {
    const eventItemEl = document.createElement('li');
    eventItemEl.classList.add('event', calendarEvent.label);
    const eventNameEl = document.createElement('p');
    eventNameEl.innerText = `${calendarEvent.time} ${calendarEvent.title}`;
    eventItemEl.append(eventNameEl);
    if (calendarEvent.expired)
        eventItemEl.classList.add('expired-event');
    eventNameEl.addEventListener('click', handleEventClick);
    eventItemEl.dataset.eventId = calendarEvent.id;
    eventContainer.appendChild(eventItemEl);
}
export function renderDayEvents(dayEvents, eventsContainer, dayContainer, miliseconds) {
    const eventsToRender = [...dayEvents].sort((a, b) => {
        return a.miliseconds - b.miliseconds;
    });
    if (dayEvents.length > 3) {
        eventsToRender.splice(3);
    }
    eventsToRender.forEach((calendarEvent) => {
        renderEvent(calendarEvent, eventsContainer);
    });
    if (dayEvents.length > 3) {
        const viewDayEventsBtn = document.createElement('button');
        viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`;
        viewDayEventsBtn.classList.add('view_more_btn', 'btn');
        viewDayEventsBtn.dataset.type = "view-day-events-btn";
        viewDayEventsBtn.addEventListener('click', handleViewMoreClick);
        dayContainer.appendChild(viewDayEventsBtn);
    }
}
function deleteEvent(event) {
    const eventElList = document.querySelectorAll(`[data-event-id="${event.id}"]`);
    eventElList.forEach(eventEl => eventEl.remove());
    const eventsList = JSON.parse(localStorage.getItem('events'));
    const indexOfEvent = eventsList.findIndex(e => e.id === event.id);
    eventsList.splice(indexOfEvent, 1);
    localStorage.setItem('events', JSON.stringify(eventsList));
}
function handleViewMoreClick(event) {
    const eventTargetEl = event.target;
    const popoverEl = document.querySelector('#dayPopover');
    const dayEl = eventTargetEl.closest('[data-date]');
    const currentDay = dayEl.dataset.date;
    const dayEvents = getDayEvents(currentDay);
    if (!popoverEl)
        renderDayPopover(eventTargetEl, currentDay, dayEvents);
    else
        switchDayPopover(eventTargetEl, popoverEl, dayEvents);
}
function getShortDay(currentDate) {
    const dateArray = currentDate.split('/');
    const date = new Date(`${dateArray[1]}, ${dateArray[0]}, ${dateArray[2]}`).toString().split(' ');
    console.log(date);
    return `${date[0]} ${dateArray[0]}`;
}
function renderDayPopover(eventTargetEl, currentDay, dayEvents) {
    const templateEl = document.querySelector('#dayPopoverTemplate');
    const template = templateEl.content;
    const popoverTemplateEl = template.querySelector('#dayPopover');
    movePopover(eventTargetEl, popoverTemplateEl);
    const templateClone = document.importNode(template, true);
    const popoversContainer = document.querySelector('#popoversContainer');
    const orderedEvents = [...dayEvents].sort((a, b) => {
        return a.miliseconds - b.miliseconds;
    });
    const eventsListEl = templateClone.querySelector('#popoverEventsList');
    const dayPopoverTitle = templateClone.querySelector('#dayPopoverTitle');
    const shortNameDay = getShortDay(currentDay);
    dayPopoverTitle.textContent = shortNameDay;
    orderedEvents.forEach((calendarEvent) => {
        renderEvent(calendarEvent, eventsListEl);
    });
    popoversContainer.append(templateClone);
    const popoverEl = document.querySelector('#dayPopover');
    const popoverCloseBtn = popoverEl.querySelector('#popoverCloseBtn');
    popoverCloseBtn === null || popoverCloseBtn === void 0 ? void 0 : popoverCloseBtn.addEventListener('click', closePopover);
}
function switchDayPopover(eventTargetEl, popoverEl, dayEvents) {
    movePopover(eventTargetEl, popoverEl);
}
function handleEventClick(event) {
    const eventTargetEl = event.target;
    const popoverEl = document.querySelector('#eventPopover');
    const currentEvent = getEventDetails(eventTargetEl);
    if (!popoverEl)
        renderEventPopover(event, eventTargetEl, currentEvent);
    else
        switchEventPopover(eventTargetEl, popoverEl, currentEvent);
}
function switchEventPopover(eventTargetEl, popoverEl, currentEvent) {
    updateEventPopoverDetails(currentEvent, popoverEl);
    movePopover(eventTargetEl, popoverEl);
}
function renderEventPopover(event, eventTargetEl, currentEvent) {
    const templateEl = document.querySelector('#eventPopoverTemplate');
    const template = templateEl.content;
    const popoverTemplateEl = template.querySelector('#eventPopover');
    updateEventPopoverDetails(currentEvent, popoverTemplateEl);
    const templateClone = document.importNode(template, true);
    const popoversContainer = document.querySelector('#popoversContainer');
    popoversContainer.append(templateClone);
    const popoverEl = document.querySelector('#eventPopover');
    movePopover(eventTargetEl, popoverEl);
    popoverEl.classList.remove('is-hidden');
    const popoverCloseBtn = popoverEl.querySelector('#popoverCloseBtn');
    popoverCloseBtn === null || popoverCloseBtn === void 0 ? void 0 : popoverCloseBtn.addEventListener('click', closePopover);
    const popoverDeleteBtn = popoverEl === null || popoverEl === void 0 ? void 0 : popoverEl.querySelector('#deleteEventBtn');
    popoverDeleteBtn === null || popoverDeleteBtn === void 0 ? void 0 : popoverDeleteBtn.addEventListener('click', () => deleteEvent(currentEvent));
}
function removeLabel(element) {
    const labelsArray = ['home', 'work', 'hobby'];
    labelsArray.forEach(label => {
        if (element.classList.contains(label))
            element.classList.remove(label);
    });
}
function updateEventPopoverDetails(currentEvent, popoverEl) {
    var _a;
    const eventPopoverTitle = popoverEl.querySelector('#eventPopoverTitle');
    eventPopoverTitle.textContent = currentEvent.title;
    removeLabel(eventPopoverTitle);
    eventPopoverTitle.classList.add(currentEvent.label);
    popoverEl.querySelector('#popoverDate').textContent = `Date: ${currentEvent.date}`;
    popoverEl.querySelector('#popoverTime').textContent = `Time: ${currentEvent.time}`;
    if (currentEvent.txt)
        popoverEl.querySelector('#popoverDetails').textContent = `Details: ${currentEvent.txt}`;
    if (currentEvent.label)
        popoverEl.querySelector('#popoverLabel').textContent = `Label: ${currentEvent.label}`;
    if (currentEvent.reminder)
        popoverEl.querySelector('#popoverReminder').textContent = `Reminder: ${currentEvent.reminder}`;
    const oldPopoverDeleteBtn = popoverEl.querySelector('#deleteEventBtn');
    const popoverDeleteBtn = oldPopoverDeleteBtn.cloneNode(true);
    (_a = oldPopoverDeleteBtn === null || oldPopoverDeleteBtn === void 0 ? void 0 : oldPopoverDeleteBtn.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(popoverDeleteBtn, oldPopoverDeleteBtn);
    popoverDeleteBtn === null || popoverDeleteBtn === void 0 ? void 0 : popoverDeleteBtn.removeEventListener('click', () => deleteEvent(currentEvent));
    popoverDeleteBtn === null || popoverDeleteBtn === void 0 ? void 0 : popoverDeleteBtn.addEventListener('click', () => deleteEvent(currentEvent));
}
function movePopover(eventTargetEl, popoverEl) {
    const dayEl = eventTargetEl.closest('[data-date]');
    if (dayEl) {
        const targetPositionDetails = eventTargetEl.getBoundingClientRect();
        const popoverDetails = popoverEl.getBoundingClientRect();
        const dayElDetails = dayEl === null || dayEl === void 0 ? void 0 : dayEl.getBoundingClientRect();
        popoverEl.style.position = "absolute";
        if (eventTargetEl.dataset.type === "view-day-events-btn") {
            popoverEl.style.top = `${dayElDetails.top - popoverDetails.height / 2 + window.scrollY}px`;
            popoverEl.style.left = `${dayElDetails.left + window.scrollX}px`;
        }
        else {
            const viewPortHorizontalCenter = window.innerWidth / 2;
            const popoverLeft = dayElDetails.left < viewPortHorizontalCenter ?
                dayElDetails.left + popoverDetails.width :
                dayElDetails.left - popoverDetails.width;
            popoverEl.style.top = `${targetPositionDetails.top - popoverDetails.height / 2 + window.scrollY}px`;
            popoverEl.style.left = `${popoverLeft + window.scrollX}px`;
        }
    }
    else {
    }
}
function getEventDetails(trigger) {
    const eventEl = trigger.closest('[data-event-id]');
    const eventId = eventEl.dataset.eventId;
    console.log(eventEl);
    let localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const currentEvent = localEvents === null || localEvents === void 0 ? void 0 : localEvents.find((localEvent) => localEvent.id === eventId);
    console.log(eventId);
    console.log(localEvents);
    return currentEvent;
}
function closePopover(event) {
    const eventTargetEl = event.target;
    const popoverEl = eventTargetEl.closest('[data-type="popover"]');
    popoverEl.remove();
}
