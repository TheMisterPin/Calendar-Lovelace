import { newEventHandler } from './utils/newEventHandler.js';
import { populateCalendar} from './components/calendar.js';
import { loadLabelsFromLocalStorage, setupNavigationListeners, setupNavigationScroll } from './utils/eventListners.js';
import { initializeModalLogic } from './components/modal.js';
import { eventsExpired } from './utils/expiration.js';


let currentDate: Date = new Date();


document.addEventListener("DOMContentLoaded", () => {
    
     eventsExpired();
     populateCalendar(currentDate);
    setupNavigationListeners(currentDate, populateCalendar);
    initializeModalLogic();
    loadLabelsFromLocalStorage();
  setupNavigationScroll(currentDate, populateCalendar)


})















