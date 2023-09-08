import { populateCalendar } from "../components/calendar";
import { newEventHandler, saveEventToLocalStorage } from "./newEventHandler";
const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTimeInput = document.querySelector('#newEventTime');
const labelSelector = document.querySelector('#eventLabel');
const saveBtn = document.querySelector('#saveBtn');
const dateError = document.createElement('div');
const timeError = document.createElement('div');
const titleError = document.createElement('div');
const labelError = document.createElement('div');
function validateDateInput() {
    const dateValue = newEventDateInput.value;
    const currentDate = new Date();
    const selectedDate = new Date(dateValue);
    currentDate.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (!dateValue || selectedDate < currentDate) {
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
function validateTimeInput() {
    const timeValue = newEventTimeInput.value;
    if (!timeValue) {
        timeError.textContent = 'Please, enter a valid time.';
        newEventTimeInput.classList.add('is-invalid');
        timeError.classList.add('error-message');
        return false;
    }
    timeError.textContent = '';
    newEventTimeInput.classList.remove('is-invalid');
    timeError.classList.remove('error-message');
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
        labelError.textContent = 'Please, select a label.';
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
newEventTimeInput.addEventListener('blur', () => {
    validateTimeInput();
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
newEventTimeInput.addEventListener('focus', () => {
    timeError.textContent = '';
    newEventTimeInput.classList.remove('is-invalid');
    timeError.classList.remove('error-message');
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
let currentDate = new Date();
saveBtn.addEventListener('click', () => {
    if (validateDateInput() && validateTitleInput() && validateEventLabel() && validateTimeInput()) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
        populateCalendar(currentDate);
        const modalElement = document.getElementById('staticBackdrop');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
});
function validateEvents() {
}
