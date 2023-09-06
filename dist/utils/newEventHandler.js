import { formatDate } from "./formatDate.js";
import { populateCalendar } from "../components/calendar.js";
import { uuidv4 } from "./uuidv4.js";
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
    saveEventToLocalStorage(newEvent);
    populateCalendar();
    const modalElement = document.getElementById('staticBackdrop');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    return newEvent;
}
