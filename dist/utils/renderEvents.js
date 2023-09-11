/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatDate } from "./formatDate.js";
export function getDay(day, currentDate) {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = day;
    return formatDate(`${currentMonth} ${currentDay}, ${currentYear}`);
}
export function getDayEvents(day, localEvents = JSON.parse(localStorage.getItem('events'))) {
    return localEvents.filter((calendarEvent) => calendarEvent.date === day);
}
function renderEvent(calendarEvent, eventContainer) {
    const eventItemEl = document.createElement('li');
    eventItemEl.classList.add('event', calendarEvent.label);
    const eventNameEl = document.createElement('p');
    eventNameEl.innerText = `${calendarEvent.time} ${calendarEvent.title}`;
    eventItemEl.append(eventNameEl);
    if (calendarEvent.expired)
        eventItemEl.classList.add('is-expired');
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
    const eventPopover = document.querySelector('#eventPopover');
    eventPopover === null || eventPopover === void 0 ? void 0 : eventPopover.remove();
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
        switchDayPopover(eventTargetEl, popoverEl, dayEvents, currentDay);
}
function getShortDay(currentDate) {
    const dateArray = currentDate.split('/');
    const date = new Date(`${dateArray[1]}, ${dateArray[0]}, ${dateArray[2]}`).toString().split(' ');
    return `${date[0]} ${dateArray[0]}`;
}
function renderDayPopover(eventTargetEl, currentDay, dayEvents) {
    const eventPopover = document.querySelector('#eventPopover');
    if (eventPopover)
        eventPopover.remove();
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
    popoversContainer.append(templateClone);
    orderedEvents.forEach((calendarEvent) => {
        renderEvent(calendarEvent, eventsListEl);
    });
    const popoverEl = document.querySelector('#dayPopover');
    popoverEl.classList.remove('is-hidden');
    const popoverCloseBtn = popoverEl.querySelector('#popoverCloseBtn');
    popoverCloseBtn === null || popoverCloseBtn === void 0 ? void 0 : popoverCloseBtn.addEventListener('click', closePopover);
}
function switchDayPopover(eventTargetEl, popoverEl, dayEvents, currentDay) {
    updateDayPopover(popoverEl, currentDay, dayEvents);
    movePopover(eventTargetEl, popoverEl);
}
function updateDayPopover(popoverEl, currentDay, dayEvents) {
    const orderedEvents = [...dayEvents].sort((a, b) => {
        return a.miliseconds - b.miliseconds;
    });
    const eventsListEl = popoverEl.querySelector('#popoverEventsList');
    const dayPopoverTitle = popoverEl.querySelector('#dayPopoverTitle');
    eventsListEl.innerHTML = "";
    const shortNameDay = getShortDay(currentDay);
    dayPopoverTitle.textContent = shortNameDay;
    orderedEvents.forEach((calendarEvent) => {
        renderEvent(calendarEvent, eventsListEl);
    });
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
    const dayPopover = document.querySelector('#dayPopover');
    const thisDayPopover = eventTargetEl.closest('#dayPopover');
    if (dayPopover && !thisDayPopover)
        dayPopover.remove();
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
    const oldDeleteEventModal = document.querySelector('#deleteEventModal');
    const deleteEventModal = oldDeleteEventModal.cloneNode(true);
    (_a = oldDeleteEventModal === null || oldDeleteEventModal === void 0 ? void 0 : oldDeleteEventModal.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(deleteEventModal, oldDeleteEventModal);
    deleteEventModal.addEventListener('show.bs.modal', () => {
        var _a;
        (_a = document.querySelector('#modalEventDeleteBtn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => deleteEvent(currentEvent));
    });
}
function movePopover(eventTargetEl, popoverEl) {
    const dayEl = eventTargetEl.closest('[data-date]');
    const targetPositionDetails = eventTargetEl.getBoundingClientRect();
    popoverEl.style.position = "absolute";
    const popoverDetails = popoverEl.getBoundingClientRect();
    if (dayEl) {
        const dayElDetails = dayEl === null || dayEl === void 0 ? void 0 : dayEl.getBoundingClientRect();
        if (eventTargetEl.dataset.type === "view-day-events-btn") {
            popoverEl.style.top = `${dayElDetails.top + window.scrollY}px`;
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
        const dayPopoverEl = document.querySelector('#dayPopover');
        const dayPopoverElDetails = dayPopoverEl === null || dayPopoverEl === void 0 ? void 0 : dayPopoverEl.getBoundingClientRect();
        const viewPortHorizontalCenter = window.innerWidth / 2;
        const popoverLeft = dayPopoverElDetails.left < viewPortHorizontalCenter ?
            dayPopoverElDetails.left + popoverDetails.width :
            dayPopoverElDetails.left - popoverDetails.width;
        popoverEl.style.top = `${targetPositionDetails.top - popoverDetails.height / 2 + window.scrollY}px`;
        popoverEl.style.left = `${popoverLeft + window.scrollX}px`;
    }
}
function getEventDetails(trigger) {
    const eventEl = trigger.closest('[data-event-id]');
    const eventId = eventEl.dataset.eventId;
    let localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    const currentEvent = localEvents === null || localEvents === void 0 ? void 0 : localEvents.find((localEvent) => localEvent.id === eventId);
    return currentEvent;
}
function closePopover(event) {
    const eventTargetEl = event.target;
    const popoverEl = eventTargetEl.closest('[data-type="popover"]');
    const eventPopoverEl = document.querySelector('#eventPopover');
    if (popoverEl.id === "dayPopover" && eventPopoverEl)
        eventPopoverEl.remove();
    popoverEl.remove();
}
