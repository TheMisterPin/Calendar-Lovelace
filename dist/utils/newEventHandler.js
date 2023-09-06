import { formatDate } from "./formatDate.js";
import { populateCalendar } from "../components/calendar.js";
const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
const newEventTimeInput = document.querySelector('#newEventTime');
const newEventReminder = document.querySelector('#newEventReminder');
const labelSelector = document.querySelector('#eventLabel');
const saveBtn = document.querySelector('#saveBtn');
const dateError = document.querySelector('#date-error');
const titleError = document.querySelector('#title-error');
function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
function validateDateInput() {
    const dateValue = newEventDateInput.value;
    if (!dateValue) {
        dateError.textContent = 'Please enter a valid date.';
        newEventDateInput.classList.add('is-invalid');
        return false;
    }
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    return true;
}
function validateTitleInput() {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        titleError.textContent = 'Please enter a title.';
        newEventTitleInput.classList.add('is-invalid');
        return false;
    }
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    return true;
}
newEventDateInput.addEventListener('blur', () => {
    validateDateInput();
});
newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput();
});
newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
});
newEventTitleInput.addEventListener('focus', () => {
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
});
saveBtn.addEventListener('click', () => {
    if (validateDateInput() && validateTitleInput()) {
        newEventHandler();
        const modalElement = document.getElementById('staticBackdrop');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
});
export function newEventHandler() {
    const title = newEventTitleInput.value;
    const date = formatDate(newEventDateInput.value);
    const time = newEventTimeInput.value;
    const txt = newEventTxtInput.value;
    const label = labelSelector.value;
    const reminder = newEventReminder.value;
    const hasEndDateCheckbox = document.querySelector('#hasEndDate');
    let endDate = undefined;
    if (hasEndDateCheckbox.checked) {
        const newEventEndDateInput = document.querySelector('#newEventEndDate');
        endDate = newEventEndDateInput.value;
    }
    const newEvent = {
        title,
        date,
        time,
        txt,
        label,
        endDate,
        reminder,
    };
    saveEventToLocalStorage(newEvent);
    populateCalendar();
    return newEvent;
}
