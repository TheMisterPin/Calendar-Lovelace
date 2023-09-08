import { formatDate } from "./formatDate.js"
import { populateCalendar } from "../components/calendar.js";
import { uuidv4 } from "./uuidv4.js";
import { validateDateInput, validateTimeInput, validateTitleInput, validateEventLabel } from "./validation.js";

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;
const saveBtn: HTMLButtonElement = document.querySelector('#saveBtn')!;
const dateError: HTMLDivElement = document.createElement('div')!;
const timeError:HTMLDivElement = document.createElement('div')!;
const titleError: HTMLDivElement = document.createElement('div')!;
const labelError: HTMLDivElement = document.createElement('div')!;

const today = new Date().toISOString().slice(0, 10);
newEventDateInput.value=(today);

const currentTime = new Date().toISOString().slice(11,16)
newEventTimeInput.value=(currentTime);

newEventDateInput.parentElement?.append(dateError);
newEventTimeInput.parentElement?.append(timeError);
newEventTitleInput.parentElement?.append(titleError);
labelSelector.parentElement?.append(labelError);

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

export function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]')
    localEvents.push(event)
    localStorage.setItem('events', JSON.stringify(localEvents))
}

newEventDateInput.addEventListener('blur', () => {
    validateDateInput(newEventDateInput, dateError);
});

newEventTimeInput.addEventListener('blur', () => {
    validateTimeInput(newEventTimeInput, timeError)
})

newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput(newEventTitleInput, titleError);
});

labelSelector.addEventListener('blur', () => {
    validateEventLabel(labelSelector, labelError);
})

newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
});

newEventTimeInput.addEventListener('focus', () => {
    timeError.textContent = '';
    newEventTimeInput.classList.remove('is-invalid');
    timeError.classList.remove('error-message');
})

newEventTitleInput.addEventListener('focus', () => {
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    titleError.classList.remove('error-message');
});

labelSelector.addEventListener('focus', () => {
    labelError.textContent = '';
    labelSelector.classList.remove('is-invalid');
    labelError.classList.remove('error-message');
})

let currentDate: Date = new Date();
saveBtn.addEventListener('click', () => {
    if (validateDateInput(newEventDateInput, dateError) && validateTitleInput(newEventTitleInput, titleError) && validateEventLabel(labelSelector, labelError) && validateTimeInput(newEventTimeInput, timeError)) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
        populateCalendar(currentDate)
        const modalElement = document.getElementById('staticBackdrop')!;
        const modal = bootstrap.Modal.getInstance(modalElement)!;
        modal.hide()
    }
}); 

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

    return newEvent;
}