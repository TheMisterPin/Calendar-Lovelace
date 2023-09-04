const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
export function saveEventToLocalStorage(event) {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}
export function newEventHandler() {
    const newEventTitle = newEventTitleInput.value;
    const newEventTxt = newEventTxtInput.value;
    const newEventDate = newEventDateInput.value;
    const newEvent = {
        newEventTitle,
        newEventDate,
        newEventTxt,
    };
    saveEventToLocalStorage(newEvent);
    return newEvent;
}
