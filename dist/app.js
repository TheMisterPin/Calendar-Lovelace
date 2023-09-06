import { populateCalendar } from './components/calendar.js';
import { setupNavigationListeners } from './utils/eventListners.js';
import { initializeModalLogic } from './components/modal.js';
let currentDate = new Date();
document.addEventListener("DOMContentLoaded", () => {
    populateCalendar(currentDate);
    setupNavigationListeners(currentDate, populateCalendar);
    initializeModalLogic();
});
