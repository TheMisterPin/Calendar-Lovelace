import { formatDate } from "./formatDate.js"


import { populateCalendar } from "../components/calendar.js";


const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')!; 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;



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

export function newEventHandler(): Event {
    const title = newEventTitleInput.value;
    const date = formatDate(newEventDateInput.value);
    const time = newEventTimeInput.value;
    const txt = newEventTxtInput.value;    
    const label = labelSelector.value;
    const reminder = newEventReminder.value;
    const saveBtn = document.querySelector('#saveBtn');
    const hasEndDateCheckbox: HTMLInputElement = document.querySelector('#hasEndDate')!;
    let endDate: string | undefined = undefined;

    if (hasEndDateCheckbox.checked) {
        const newEventEndDateInput: HTMLInputElement = document.querySelector('#newEventEndDate')!;
        endDate = newEventEndDateInput.value;
    }

    newEventDateInput.addEventListener('focusout', validateDateInput);
    newEventTitleInput.addEventListener('focusout', validateTitleInput);

function validateDateInput() {
    const dateValue = newEventDateInput.value;
    if (!dateValue) {
        showError(newEventDateInput, 'Date is required');
    } else {
        clearError(newEventDateInput);
        saveBtn?.setAttribute('enabled','')
    }
}

function validateTitleInput() {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        showError(newEventTitleInput, 'Title is required');
    } else {
        clearError(newEventTitleInput);
        saveBtn?.setAttribute('enabled','')
    }
}

function showError(inputElement: HTMLInputElement, errorMessage: string) {
    const errorContainer = inputElement.parentElement!.querySelector('.invalid-feedback');
    if (errorContainer) {
        errorContainer.textContent = errorMessage;
    }
    inputElement.classList.add('is-invalid');
}

function clearError(inputElement: HTMLInputElement) {
    const errorContainer = inputElement.parentElement!.querySelector('.invalid-feedback');
    if (errorContainer) {
        errorContainer.textContent = '';
    }
    inputElement.classList.remove('is-invalid');
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
    
    const modalElement = document.getElementById('staticBackdrop')!;
    const modal = bootstrap.Modal.getInstance(modalElement)!;
    modal.hide()
    return newEvent;
}

