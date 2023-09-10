import { populateCalendar } from './components/calendar.js';
import { setupNavigationListeners, setupMouseWheelNavigation } from './utils/eventListners.js';
import { initializeModalLogic } from './components/modal.js';
import { filterEventsByLabel, populateUpcomingEvents } from './utils/filter.js';
const currentDate = new Date();
document.addEventListener('DOMContentLoaded', () => {
    populateCalendar(currentDate);
    setupNavigationListeners(currentDate, populateCalendar);
    initializeModalLogic();
    setupMouseWheelNavigation(currentDate, populateCalendar);
    filterEventsByLabel();
    populateUpcomingEvents();
});
