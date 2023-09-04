const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
const newEventTimeInput = document.querySelector('#newEventTime');
const labelSelector = document.querySelector('#eventLabel');
function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
export function newEventHandler() {
    const title = newEventTitleInput.value;
    const date = newEventDateInput.value;
    const time = newEventTimeInput.value;
    const txt = newEventTxtInput.value;
    const label = labelSelector.value;
    const newEvent = {
        title,
        date,
        time,
        txt,
        label,
    };
    saveEventToLocalStorage(newEvent);
    return newEvent;
}
