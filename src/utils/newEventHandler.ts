

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!;


export interface Event {
    title: string;
    date: string;
    txt: string;
}
function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}


export function newEventHandler(): { title: string, date: string, txt: string } {
    const title = newEventTitleInput.value;
    const txt = newEventTxtInput.value;
    const date = newEventDateInput.value;
    
   const newEvent: Event = {
        title,
        date,
        txt,
    }
    saveEventToLocalStorage(newEvent);
return newEvent
}



