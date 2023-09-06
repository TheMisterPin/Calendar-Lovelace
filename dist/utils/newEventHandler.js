import { formatDate } from "./formatDate.js";
import { populateCalendar } from "../components/calendar.js";
const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
const newEventTimeInput = document.querySelector('#newEventTime');
const newEventReminder = document.querySelector('#newEventReminder');
const labelSelector = document.querySelector('#eventLabel');
function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
export function newEventHandler() {
    const title = newEventTitleInput.value;
    const date = formatDate(newEventDateInput.value);
    const time = newEventTimeInput.value;
    const txt = newEventTxtInput.value;
    const label = labelSelector.value;
    const reminder = newEventReminder.value;
    const saveBtn = document.querySelector('#saveBtn');
    const hasEndDateCheckbox = document.querySelector('#hasEndDate');
    let endDate = undefined;
    if (hasEndDateCheckbox.checked) {
        const newEventEndDateInput = document.querySelector('#newEventEndDate');
        endDate = newEventEndDateInput.value;
    }
    newEventDateInput.addEventListener('focusout', validateDateInput);
    newEventTitleInput.addEventListener('focusout', validateTitleInput);
    function validateDateInput() {
        const dateValue = newEventDateInput.value;
        if (!dateValue) {
            showError(newEventDateInput, 'Date is required');
        }
        else {
            clearError(newEventDateInput);
            saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.setAttribute('enabled', '');
        }
    }
    function validateTitleInput() {
        const titleValue = newEventTitleInput.value;
        if (!titleValue) {
            showError(newEventTitleInput, 'Title is required');
        }
        else {
            clearError(newEventTitleInput);
            saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.setAttribute('enabled', '');
        }
    }
    function showError(inputElement, errorMessage) {
        const errorContainer = inputElement.parentElement.querySelector('.invalid-feedback');
        if (errorContainer) {
            errorContainer.textContent = errorMessage;
        }
        inputElement.classList.add('is-invalid');
    }
    function clearError(inputElement) {
        const errorContainer = inputElement.parentElement.querySelector('.invalid-feedback');
        if (errorContainer) {
            errorContainer.textContent = '';
        }
        inputElement.classList.remove('is-invalid');
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
    const modalElement = document.getElementById('staticBackdrop');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    return newEvent;
}
