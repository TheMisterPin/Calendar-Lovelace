import { populateCalendar } from './components/calendar.js';
import { newEventHandler } from './utils/newEventHandler.js';
document.addEventListener("DOMContentLoaded", () => {
    const checkbox = document.querySelector('#hasEndDate');
    if (checkbox) {
        checkbox.addEventListener('change', toggleEndDateSelector);
        function toggleEndDateSelector() {
            const checkbox = document.querySelector('#hasEndDate');
            const endDateInput = document.querySelector('#newEventEndDate');
            if (checkbox && checkbox.checked) {
                endDateInput.style.display = 'block';
            }
            else {
                endDateInput.style.display = 'none';
                endDateInput.value = '';
            }
            document.querySelectorAll('[data-bs-toggle="popover"]')
                .forEach(popover => {
                new bootstrap.Popover(popover);
            });
        }
        populateCalendar();
    }
});
const newEventBtn = document.querySelector('#saveBtn');
newEventBtn.addEventListener('click', () => {
    const eventObject = newEventHandler();
});
