import { formatDate } from "./formatDate.js";
export function getDayEvents(eventsArray, day, currentDate) {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = day;
    const fullDate = formatDate(`${currentMonth} ${currentDay}, ${currentYear}`);
    return eventsArray.filter((event) => event.date === fullDate);
}
export function renderDayEvents(dayEvents, eventsContainer, dayContainer, miliseconds) {
    const eventsToRender = [...dayEvents].sort((a, b) => {
        return a.miliseconds - b.miliseconds;
    });
    if (dayEvents.length > 3) {
        eventsToRender.splice(3);
    }
    eventsToRender.forEach((event) => {
        const eventItemEl = document.createElement('li');
        eventItemEl.classList.add('event', event.label);
        const eventNameEl = document.createElement('p');
        eventNameEl.innerText = `${event.time} ${event.title}`;
        eventItemEl.append(eventNameEl);
        const deleteEventBtn = document.createElement('button');
        deleteEventBtn.dataset.type = 'deleteBtn';
        deleteEventBtn.classList.add('event__delete-btn');
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('fa', 'fa-solid', 'fa-delete-left');
        deleteEventBtn.append(deleteIcon);
        eventItemEl.append(deleteEventBtn);
        deleteEventBtn.addEventListener('click', () => deleteEvent(event, eventItemEl));
        if (event.expired)
            eventItemEl.classList.add('expired-event');
        eventItemEl.dataset.eventId = event.id;
        eventsContainer.appendChild(eventItemEl);
        const eventDetailsTemplateOutter = `<div class="eventDetails">innerTemplate</div>`;
        let eventDetailsInnerTemplate = `<p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Details: ${event.txt}</p>
        <p>Label: ${event.label}</p>`;
        if (event.endDate)
            eventDetailsInnerTemplate += `<p>endDate: ${event.endDate}</p>`;
        if (event.reminder)
            eventDetailsInnerTemplate += `<p>Reminder: ${event.reminder}</p>`;
        const eventDetailsTemplate = eventDetailsTemplateOutter.replace('innerTemplate', eventDetailsInnerTemplate);
        const eventDetailsPopover = new bootstrap.Popover(eventNameEl, {
            html: true,
            title: `<h3 class="event popover__title ${event.label}">${event.title}</h3>`,
            content: eventDetailsTemplate,
            customClass: "eventPopover",
            placement: "left",
            trigger: 'hover focus'
        });
    });
    if (dayEvents.length > 3) {
        const viewDayEventsBtn = document.createElement('button');
        viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`;
        viewDayEventsBtn.classList.add('view_more_btn', 'btn');
        viewDayEventsBtn.dataset.type = "view-day-events-btn";
        /* Add Offset */
        dayContainer.appendChild(viewDayEventsBtn);
        updatePopoverContent(dayEvents);
    }
}
function deleteEvent(event, eventEl) {
    eventEl.remove();
    const eventsList = JSON.parse(localStorage.getItem('events'));
    console.log(eventsList);
    const indexOfEvent = eventsList.findIndex(e => e.id === event.id);
    console.log(indexOfEvent);
    eventsList.splice(indexOfEvent, 1);
    localStorage.setItem('events', JSON.stringify(eventsList));
}
function updatePopoverContent(dayEvents) {
    setTimeout(() => {
        const popoverTriggerEl = document.querySelector('[data-type="view-day-events-btn"]:not([data-trigger="popover"])');
        popoverTriggerEl.dataset.trigger = 'popover';
        let popoverTemplate = "<ul>templateInner</ul>";
        let popoverTemplateInner = "";
        const orderedEvents = dayEvents.sort((a, b) => {
            return a.miliseconds - b.miliseconds;
        });
        orderedEvents.forEach(event => {
            const eventExpired = event.expired ? "expired-event" : "";
            popoverTemplateInner += `<li data-event-id="${event.id}" class="event ${event.label} ${eventExpired}">${event.time} ${event.title}</li>`;
        });
        popoverTemplate = popoverTemplate.replace('templateInner', popoverTemplateInner);
        const dayEventsPopover = new bootstrap.Popover(popoverTriggerEl, {
            html: true,
            title: `${dayEvents[0].date}`,
            content: popoverTemplate,
            placement: "left",
            customClass: "dayPopover"
        });
        popoverTriggerEl === null || popoverTriggerEl === void 0 ? void 0 : popoverTriggerEl.addEventListener('inserted.bs.popover', () => {
            setPopoverEventsIds(dayEvents);
            addClosePopoverBtn(popoverTriggerEl);
        });
    }, 500);
}
function addClosePopoverBtn(popoverTriggerEl) {
    const popoverHeader = document.querySelector('.popover-header');
    const popoverCloseBtn = document.createElement('button');
    popoverCloseBtn.textContent = "X";
    popoverHeader === null || popoverHeader === void 0 ? void 0 : popoverHeader.append(popoverCloseBtn);
    popoverCloseBtn.addEventListener('click', () => popoverTriggerEl.click());
}
function setPopoverEventsIds(dayEvents) {
    const popoverEventsElArray = document.querySelectorAll('.popover-body .event');
    dayEvents.forEach((event, index) => {
        popoverEventsElArray[index].dataset.eventId = event.id;
        addEventDetailsPopover(event);
    });
}
function addEventDetailsPopover(event) {
    const popoverTriggerEl = document.querySelector('.popover-body [data-event-id]:not([data-trigger="popover"])');
    popoverTriggerEl.dataset.trigger = 'popover';
    const eventDetailsTemplateOutter = `<div class="eventDetails">innerTemplate</div>`;
    let eventDetailsInnerTemplate = `<p>Date: ${event.date}</p>
        <p>Time: ${event.time}</p>
        <p>Details: ${event.txt}</p>
        <p>Label: ${event.label}</p>`;
    if (event.endDate)
        eventDetailsInnerTemplate += `<p>endDate: ${event.endDate}</p>`;
    if (event.reminder)
        eventDetailsInnerTemplate += `<p>Reminder: ${event.reminder}</p>`;
    const eventDetailsTemplate = eventDetailsTemplateOutter.replace('innerTemplate', eventDetailsInnerTemplate);
    const eventDetailsPopover = new bootstrap.Popover(popoverTriggerEl, {
        html: true,
        title: `<h3 class="event popover__title ${event.label}">${event.title}</h3>`,
        content: eventDetailsTemplate,
        customClass: "eventPopover",
        placement: "left",
        trigger: 'hover focus'
    });
}
