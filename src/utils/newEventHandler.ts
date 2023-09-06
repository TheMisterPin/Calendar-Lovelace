import { formatDate } from "./formatDate.js"

import { populateCalendar } from "../components/calendar.js";

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;
const saveBtn: HTMLButtonElement = document.querySelector('#saveBtn')!;
const dateError: HTMLDivElement = document.querySelector('#date-error')!;
const titleError: HTMLDivElement = document.querySelector('#title-error')!;

export interface Event {
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
        dateError.textContent = 'Please enter a valid date.';
        newEventDateInput.classList.add('is-invalid');
        return false;
    }
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    return true;
}

function validateTitleInput(): boolean {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        titleError.textContent = 'Please enter a title task.';
        newEventTitleInput.classList.add('is-invalid');
        return false;
    }
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    return true;
}

newEventDateInput.addEventListener('blur', () => {
    validateDateInput();
});

newEventTitleInput.addEventListener('blur', () => {
    validateTitleInput();
});

newEventDateInput.addEventListener('focus', () => {
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
});

newEventTitleInput.addEventListener('focus', () => {
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
});

saveBtn.addEventListener('click', () => {
    if (validateDateInput() && validateTitleInput()) {
        newEventHandler();
        const modalElement = document.getElementById('staticBackdrop')!;
        const modal = bootstrap.Modal.getInstance(modalElement)!;
        modal.hide()
    }
});

export function newEventHandler(): Event {
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
        title,
        date,
        time,
        txt,
        label,
        endDate,
        reminder,
    }

    saveEventToLocalStorage(newEvent);
    populateCalendar();
    
    return newEvent;
}

