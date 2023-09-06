import { formatDate } from "./formatDate.js"
import { populateCalendar } from "../components/calendar.js";
import { uuidv4 } from "./uuidv4.js";


const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;
const saveBtn: HTMLButtonElement = document.querySelector('#saveBtn')!;
const dateError: HTMLDivElement = document.createElement('div')!;
const titleError: HTMLDivElement = document.createElement('div')!;
const labelError: HTMLDivElement = document.createElement('div')!;

const today = new Date().toISOString().slice(0, 10);
newEventDateInput.value=(today);

const currentTime = new Date().toISOString().slice(11,16)
newEventTimeInput.value=(currentTime);

newEventDateInput.parentElement?.append(dateError);
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

function saveEventToLocalStorage(event: Event): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]')
    localEvents.push(event)
    localStorage.setItem('events', JSON.stringify(localEvents))
}

function validateDateInput(): boolean {
    const dateValue = newEventDateInput.value;
    if (!dateValue) {
        dateError.textContent = 'Please, enter a valid date.';
        newEventDateInput.classList.add('is-invalid');
        dateError.classList.add('error-message');
        return false;
    }
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
    return true;
}

function validateTitleInput(): boolean {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        titleError.textContent = 'Please, enter an event title.';
        newEventTitleInput.classList.add('is-invalid');
        titleError.classList.add('error-message');
        return false;
    }
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    titleError.classList.remove('error-message');
    return true;
}

function validateEventLabel(): boolean {
    const eventValue = labelSelector.value;
    if (!eventValue) {
        labelError.textContent = ' Please, select a label.';
        labelSelector.classList.add('is-invalid');
        labelError.classList.add('error-message');
        return false;   
    }
    labelError.textContent = '';
    labelSelector.classList.remove('is-invalid');
    labelError.classList.remove('error-message');
    return true;
}

newEventDateInput.addEventListener('blur', () => {
    validateDateInput();
});

newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput();
});

labelSelector.addEventListener('blur', () => {
    validateEventLabel();
})

newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
});

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

saveBtn.addEventListener('click', () => {
    if (validateDateInput() && validateTitleInput() && validateEventLabel()) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
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

    populateCalendar();
    
    return newEvent;
}

