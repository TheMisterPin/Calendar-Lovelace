

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!;


export interface Event {
    newEventTitle: string;
    newEventDate: string;
    newEventTxt: string;
}
export function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}


export function newEventHandler(): { newEventTitle: string, newEventDate: string, newEventTxt: string } {
    const newEventTitle = newEventTitleInput.value;
    const newEventTxt = newEventTxtInput.value;
    const newEventDate = newEventDateInput.value;
    
   const newEvent: Event = {
        newEventTitle,
        newEventDate,
        newEventTxt,

 
    }
    saveEventToLocalStorage(newEvent);
return newEvent
}



