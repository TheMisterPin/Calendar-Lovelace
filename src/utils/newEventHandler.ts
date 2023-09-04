

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;


export interface Event {
    title: string;
    date: string;
    txt: string;
    time: string;
}
function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]');
    localEvents.push(event);
    localStorage.setItem('events', JSON.stringify(localEvents));
}


export function newEventHandler(): { title: string, date: string, txt: string, time: string} {
    const title = newEventTitleInput.value;
    const txt = newEventTxtInput.value;
    const date = newEventDateInput.value;
    const time = newEventTimeInput.value;
    
   const newEvent: Event = {
        title,
        date,
        txt,
        time,
    }
    saveEventToLocalStorage(newEvent);
return newEvent
}



