import { populateCalendar } from './components/calendar.js';
import { loadLabelsFromLocalStorage, setupNavigationListeners } from './utils/eventListners.js';
import { initializeModalLogic } from './components/modal.js';
let currentDate = new Date();
document.addEventListener("DOMContentLoaded", () => {
    populateCalendar(currentDate);
    setupNavigationListeners(currentDate, populateCalendar);
    initializeModalLogic();
    loadLabelsFromLocalStorage();
    // Temporary code for toast button 
    const toastTrigger = document.getElementById('liveToastBtn');
    const toastLiveExample = document.getElementById('notificationToast');
    if (toastTrigger) {
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
        toastTrigger.addEventListener('click', () => {
            toastBootstrap.show();
        });
    }
    // End of temporary code for toast button
});
