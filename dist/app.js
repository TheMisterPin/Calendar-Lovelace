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
            populateCalendar();
        }
        const reminderCheckbox = document.querySelector('#hasReminder');
        if (reminderCheckbox) {
            reminderCheckbox.addEventListener('change', toggleEndDateSelector);
            function toggleEndDateSelector() {
                const reminderCheckbox = document.querySelector('#hasReminder');
                const newEventReminder = document.querySelector('#newEventReminder');
                if (reminderCheckbox && reminderCheckbox.checked) {
                    newEventReminder.style.display = 'block';
                }
                else {
                    newEventReminder.style.display = 'none';
                    newEventReminder.value = '';
                }
            }
            populateCalendar();
        }
    }
    ;
    const newEventBtn = document.querySelector('#saveBtn');
    newEventBtn.addEventListener('click', () => {
        const eventObject = newEventHandler();
    });
});
