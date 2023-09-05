import { populateCalendar } from './components/calendar.js';
import { newEventHandler } from './utils/newEventHandler.js';

document.addEventListener("DOMContentLoaded", () => {
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
}
populateCalendar()
    }
});



const newEventBtn = document.querySelector('#saveBtn')!;

newEventBtn.addEventListener('click', () =>{
const eventObject = newEventHandler();
});

