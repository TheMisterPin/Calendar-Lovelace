import { formatDate } from "./formatDate.js"
import { populateCalendar } from "../components/calendar.js";
import { uuidv4 } from "./uuidv4.js";


const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;



export interface Event {
    id: string;
    title: string;
    date: string;
    txt: string;
    time: string;
    label: string;
    endDate?: string; 
    reminder?: string;
}

function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]')
    localEvents.push(event)
    localStorage.setItem('events', JSON.stringify(localEvents))
}


export function newEventHandler(): Event {
    const id = uuidv4()
    const title = newEventTitleInput.value;
    const date = formatDate(newEventDateInput.value);
    const time = newEventTimeInput.value;
    const txt = newEventTxtInput.value;    
    const label = labelSelector.value;
    const reminder = newEventReminder.value;
    const hasEndDateCheckbox: HTMLInputElement = document.querySelector('#hasEndDate')!;
    let endDate: string | undefined = undefined;

    if (hasEndDateCheckbox.checked) {
        const newEventEndDateInput: HTMLInputElement = document.querySelector('#newEventEndDate')!;
        endDate = newEventEndDateInput.value;
    }

    const newEvent: Event = {
        id,
        title,
        date,
        time,
        txt,
        label,
        endDate,
        reminder
    }

    saveEventToLocalStorage(newEvent);
    populateCalendar();
    
    const modalElement = document.getElementById('staticBackdrop')!;
    const modal = bootstrap.Modal.getInstance(modalElement)!;
    modal.hide()
    return newEvent;
}

