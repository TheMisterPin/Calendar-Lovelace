const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
export function newEventHandler() {
    const title = newEventTitleInput.value;
    const txt = newEventTxtInput.value;
    const date = newEventDateInput.value;
    const newEvent = {
        title,
        date,
        txt,
    };
    saveEventToLocalStorage(newEvent);
    return newEvent;
}
