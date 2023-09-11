var _a, _b, _c, _d, _e;
import { formatDate } from './formatDate.js';
import { populateCalendar } from '../components/calendar.js';
import { uuidv4 } from './uuidv4.js';
import { validateDateInput, validateTimeInput, validateTitleInput, validateEventLabel, validateEndDateInput } from './validation.js';
const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
const newEventTimeInput = document.querySelector('#newEventTime');
const newEventReminder = document.querySelector('#newEventReminder');
const newEventEndDateInput = document.querySelector('#newEventEndDate');
const labelSelector = document.querySelector('#eventLabel');
const saveBtn = document.querySelector('#saveBtn');
const dateError = document.createElement('div');
const endDateError = document.createElement('div');
const timeError = document.createElement('div');
const titleError = document.createElement('div');
const labelError = document.createElement('div');
const today = new Date().toISOString().slice(0, 10);
newEventDateInput.value = (today);
const currentTime = new Date().toISOString().slice(11, 16);
newEventTimeInput.value = (currentTime);
(_a = newEventDateInput.parentElement) === null || _a === void 0 ? void 0 : _a.append(dateError);
(_b = newEventEndDateInput.parentElement) === null || _b === void 0 ? void 0 : _b.append(endDateError);
(_c = newEventTimeInput.parentElement) === null || _c === void 0 ? void 0 : _c.append(timeError);
(_d = newEventTitleInput.parentElement) === null || _d === void 0 ? void 0 : _d.append(titleError);
(_e = labelSelector.parentElement) === null || _e === void 0 ? void 0 : _e.append(labelError);
export function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
newEventDateInput.addEventListener('blur', () => {
    validateDateInput(newEventDateInput, dateError);
});
newEventEndDateInput.addEventListener('blur', () => {
    validateEndDateInput(newEventEndDateInput, endDateError, newEventDateInput);
});
newEventTimeInput.addEventListener('blur', () => {
    validateTimeInput(newEventTimeInput, timeError);
});
newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput(newEventTitleInput, titleError);
});
labelSelector.addEventListener('blur', () => {
    validateEventLabel(labelSelector, labelError);
});
newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
});
newEventEndDateInput.addEventListener('focus', () => {
    endDateError.textContent = '';
    newEventEndDateInput.classList.remove('is-invalid');
    endDateError.classList.remove('error-message');
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
const currentDate = new Date();
saveBtn.addEventListener('click', () => {
    if (validateDateInput(newEventDateInput, dateError) && validateTitleInput(newEventTitleInput, titleError) && validateEventLabel(labelSelector, labelError) && validateTimeInput(newEventTimeInput, timeError) && validateEndDateInput(newEventEndDateInput, endDateError, newEventDateInput)) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
        populateCalendar(currentDate);
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
<<<<<<< HEAD
    const milliseconds = getEventTimeArray(date, time);
=======
    const miliseconds = getEventTimeArray(date, time);
    const timeToReminder = getTimeToReminder(miliseconds, reminder);
    let expired = false;
>>>>>>> customPopovers
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
        reminder,
<<<<<<< HEAD
        milliseconds: milliseconds
=======
        miliseconds,
        timeToReminder,
        expired
>>>>>>> customPopovers
    };
    return newEvent;
}
function getEventTimeArray(date, time) {
    const dateArray = date.split('/');
    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];
    const timeArray = time.split(':');
    const hours = timeArray[0];
    const mins = timeArray[1];
    const timeString = `${month},${day},${year},${hours}:${mins}`;
    const eventDate = new Date(timeString);
    return eventDate.getTime();
}
function getTimeToReminder(miliseconds, reminder) {
    const reminderAnticipationInMiliseconds = parseInt(reminder) * 60000;
    return miliseconds - reminderAnticipationInMiliseconds;
}
