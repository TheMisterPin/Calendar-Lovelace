import { populateCalendar } from '../components/calendar.js';
const currentDate = new Date();
const labelDropdown = document.querySelector('#eventLabel');
const labels = ['Work', 'Home', 'Hobby'];
if (labelDropdown) {
    labels.forEach(label => {
        const option = document.createElement('option');
        option.value = label.toLowerCase();
        option.textContent = label;
        labelDropdown.appendChild(option);
    });
}
const checkboxesContainer = document.querySelector('.checkboxes');
labels.forEach(label => {
    const checkboxWrapper = document.createElement('div');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = label.toLowerCase();
    checkbox.id = `label-${label.toLowerCase()}`;
    const labelElement = document.createElement('label');
    labelElement.htmlFor = `label-${label.toLowerCase()}`;
    labelElement.textContent = label;
    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(labelElement);
    checkboxesContainer === null || checkboxesContainer === void 0 ? void 0 : checkboxesContainer.appendChild(checkboxWrapper);
});
checkboxesContainer === null || checkboxesContainer === void 0 ? void 0 : checkboxesContainer.addEventListener('change', () => {
    filterEventsByLabel();
});
export function filterEventsByLabel() {
    const checkedLabels = [];
    const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const cb = checkbox;
        if (cb.checked) {
            checkedLabels.push(cb.value);
        }
    });
    const allEvents = JSON.parse(localStorage.getItem('events') || '[]');
    let filteredEvents;
    if (checkedLabels.length === 0) {
        filteredEvents = allEvents;
    }
    else {
        filteredEvents = allEvents.filter((event) => checkedLabels.includes(event.label));
    }
    populateCalendar(currentDate, filteredEvents);
}
export function populateUpcomingEvents() {
    const upcomingEventsList = document.querySelector('.upcoming-events-list');
    if (!upcomingEventsList)
        return;
    // Clear the list
    upcomingEventsList.innerHTML = '';
    // Fetch events from local storage
    const allEvents = JSON.parse(localStorage.getItem('events') || '[]');
    // Sort events by date
    allEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
    });
    // Group events by date
    const groupedEvents = {};
    allEvents.forEach(event => {
        if (!groupedEvents[event.date]) {
            groupedEvents[event.date] = [];
        }
        groupedEvents[event.date].push(event);
    });
    // Populate the upcoming events list
    for (const date in groupedEvents) {
        const dateItem = document.createElement('li');
        dateItem.classList.add('date-item');
        dateItem.textContent = date; // Display the date
        const eventsForDate = groupedEvents[date];
        const eventsList = document.createElement('ul');
        eventsList.classList.add('events-for-date');
        eventsForDate.forEach(event => {
            const eventItem = document.createElement('li');
            eventItem.textContent = event.title; // Display the event title
            eventsList.appendChild(eventItem);
        });
        dateItem.appendChild(eventsList);
        upcomingEventsList.appendChild(dateItem);
    }
}
