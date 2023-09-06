var _a, _b, _c;
import { formatDate } from "./formatDate.js";
import { populateCalendar } from "../components/calendar.js";
import { uuidv4 } from "./uuidv4.js";
const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
const newEventTimeInput = document.querySelector('#newEventTime');
const newEventReminder = document.querySelector('#newEventReminder');
const labelSelector = document.querySelector('#eventLabel');
const saveBtn = document.querySelector('#saveBtn');
const dateError = document.createElement('div');
const titleError = document.createElement('div');
const labelError = document.createElement('div');
const today = new Date().toISOString().slice(0, 10);
newEventDateInput.value = (today);
const currentTime = new Date().toISOString().slice(11, 16);
newEventTimeInput.value = (currentTime);
(_a = newEventDateInput.parentElement) === null || _a === void 0 ? void 0 : _a.append(dateError);
(_b = newEventTitleInput.parentElement) === null || _b === void 0 ? void 0 : _b.append(titleError);
(_c = labelSelector.parentElement) === null || _c === void 0 ? void 0 : _c.append(labelError);
function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
function validateDateInput() {
    const dateValue = newEventDateInput.value;
    if (!dateValue) {
        dateError.textContent = 'Please, enter a valid date.';
        newEventDateInput.classList.add('is-invalid');
        dateError.classList.add('error-message');
        return false;
    }
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
    return true;
}
function validateTitleInput() {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        titleError.textContent = 'Please, enter an event title.';
        newEventTitleInput.classList.add('is-invalid');
        titleError.classList.add('error-message');
        return false;
    }
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    titleError.classList.remove('error-message');
    return true;
}
function validateEventLabel() {
    const eventValue = labelSelector.value;
    if (!eventValue) {
        labelError.textContent = ' Please, select a label.';
        labelSelector.classList.add('is-invalid');
        labelError.classList.add('error-message');
        return false;
    }
    labelError.textContent = '';
    labelSelector.classList.remove('is-invalid');
    labelError.classList.remove('error-message');
    return true;
}
newEventDateInput.addEventListener('blur', () => {
    validateDateInput();
});
newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput();
});
labelSelector.addEventListener('blur', () => {
    validateEventLabel();
});
newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
});
newEventTitleInput.addEventListener('focus', () => {
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    titleError.classList.remove('error-message');
});
labelSelector.addEventListener('focus', () => {
    labelError.textContent = '';
    labelSelector.classList.remove('is-invalid');
    labelError.classList.remove('error-message');
});
saveBtn.addEventListener('click', () => {
    if (validateDateInput() && validateTitleInput() && validateEventLabel()) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
        const modalElement = document.getElementById('staticBackdrop');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
});
export function newEventHandler() {
    const id = uuidv4();
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
        id,
        title,
        date,
        time,
        txt,
        label,
        endDate,
        reminder
    };
    populateCalendar();
    return newEvent;
}
