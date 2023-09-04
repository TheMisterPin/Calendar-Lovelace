const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!;

export function newEventHandler() {
    const newEventTitle = newEventTitleInput.value;
    const newEventTxt = newEventTxtInput.value;
    const newEventDate = newEventDateInput.value;
    
    return { 
        newEventTitle,
        newEventDate,
        newEventTxt,
    }}