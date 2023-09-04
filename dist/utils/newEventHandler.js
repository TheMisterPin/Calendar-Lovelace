const newEventDateInput = document.querySelector('#newEventDate');
const newEventTitleInput = document.querySelector('#newEventTitle');
const newEventTxtInput = document.querySelector('#newEventText');
export function newEventHandler() {
    const newEventTitle = newEventTitleInput.value;
    const newEventTxt = newEventTxtInput.value;
    const newEventDate = newEventDateInput.value;
    return {
        newEventTitle,
        newEventDate,
        newEventTxt,
    };
}
