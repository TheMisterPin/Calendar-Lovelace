import { formatDate } from "./formatDate.js";
export function getDayEvents(eventsArray, day, currentDate) {
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const currentDay = day;
    const fullDate = formatDate(`${currentMonth} ${currentDay}, ${currentYear}`);
    return eventsArray.filter((event) => event.date === fullDate);
}
export function renderDayEvents(dayEvents, eventsContainer, dayContainer) {
    const eventsToRender = [...dayEvents];
    if (dayEvents.length > 3) {
        eventsToRender.splice(3);
    }
    eventsToRender.forEach((event) => {
        const eventNameEl = document.createElement('li');
        eventNameEl.classList.add('event', event.label);
        eventNameEl.innerText = `${event.time} ${event.title}`;
        eventsContainer.appendChild(eventNameEl);
    });
    if (dayEvents.length > 3) {
        const viewDayEventsBtn = document.createElement('button');
        viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`;
        viewDayEventsBtn.classList.add('view_more_btn', 'btn');
        viewDayEventsBtn.dataset.bsToggle = "popover";
        viewDayEventsBtn.dataset.bsTitle = "Popover Title";
        viewDayEventsBtn.dataset.bsContent = "And here's some amazing content. It's very engaging. Right?";
        viewDayEventsBtn.dataset.bsPlacement = "left";
        /* Add Offset */
        dayContainer.appendChild(viewDayEventsBtn);
        setTimeout(() => {
            const popoverTriggerEl = document.querySelector('[data-bs-toggle="popover"]:not(.trigger)');
            popoverTriggerEl === null || popoverTriggerEl === void 0 ? void 0 : popoverTriggerEl.classList.add('trigger');
            const popover = new bootstrap.Popover(popoverTriggerEl, {
                html: true
            });
            popoverTriggerEl === null || popoverTriggerEl === void 0 ? void 0 : popoverTriggerEl.addEventListener('show.bs.popover', () => renderDayEventsPopover(dayEvents, popover));
        }, 2000); // Test changing the timeout with async await with promise
    }
}
function renderDayEventsPopover(dayEvents, popover) {
    let popoverTemplate = "<ul>templateInner</ul>";
    let popoverTemplateInner = "";
    dayEvents.forEach(event => {
        popoverTemplateInner += `<li class="event ${event.label}">${event.time} ${event.title}</li>`;
    });
    popoverTemplate = popoverTemplate.replace('templateInner', popoverTemplateInner);
    popover.setContent({
        '.popover-header': dayEvents[0].date,
        '.popover-body': popoverTemplate
    });
}
