import { populateCalendar } from './components/calendar.js';
import { newEventHandler } from './utils/newEventHandler.js';

    const checkbox = document.querySelector<HTMLInputElement>('#hasEndDate');
    if (checkbox) {
        checkbox.addEventListener('change', toggleEndDateSelector);
        function toggleEndDateSelector() {
    const checkbox = document.querySelector<HTMLInputElement>('#hasEndDate');
    const endDateInput = document.querySelector<HTMLInputElement>('#newEventEndDate');

    if (checkbox && checkbox.checked) {
        endDateInput!.style.display = 'block';
    } else {
        endDateInput!.style.display = 'none';
        endDateInput!.value = '';
}

populateCalendar()
    }


    const reminderCheckbox = document.querySelector<HTMLInputElement>('#hasReminder');
if (reminderCheckbox) {
    reminderCheckbox.addEventListener('change', toggleEndDateSelector);
    function toggleEndDateSelector() {
const reminderCheckbox = document.querySelector<HTMLInputElement>('#hasReminder');
const newEventReminder = document.querySelector<HTMLInputElement>('#newEventReminder');

if (reminderCheckbox && reminderCheckbox.checked) {
    newEventReminder!.style.display = 'block';
} else {
    newEventReminder!.style.display = 'none';
    newEventReminder!.value = '';
}
}
populateCalendar()
}
};});




const newEventBtn = document.querySelector('#saveBtn')!;

newEventBtn.addEventListener('click', () =>{
const eventObject = newEventHandler();
})