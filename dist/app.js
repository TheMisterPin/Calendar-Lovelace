import { populateCalendar } from './components/calendar.js';
import { loadLabelsFromLocalStorage, setupNavigationListeners } from './utils/eventListners.js';
import { initializeModalLogic } from './components/modal.js';
import { eventsExpired } from './utils/expiration.js';
let currentDate = new Date();
document.addEventListener("DOMContentLoaded", () => {
    eventsExpired();
    populateCalendar(currentDate);
    setupNavigationListeners(currentDate, populateCalendar);
    initializeModalLogic();
    loadLabelsFromLocalStorage();
});
