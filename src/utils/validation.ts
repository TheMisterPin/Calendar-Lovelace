import { populateCalendar } from "../components/calendar";
import { newEventHandler, saveEventToLocalStorage } from "./newEventHandler";

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!;
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!;
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!;
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!;
const saveBtn: HTMLButtonElement = document.querySelector('#saveBtn')!;
const dateError: HTMLDivElement = document.createElement('div')!;
const timeError:HTMLDivElement = document.createElement('div')!;
const titleError: HTMLDivElement = document.createElement('div')!;
const labelError: HTMLDivElement = document.createElement('div')!;


function validateDateInput(): boolean {
    const dateValue = newEventDateInput.value;
    const currentDate = new Date();
    const selectedDate = new Date(dateValue);

    currentDate.setHours(0,0,0,0)
    selectedDate.setHours(0,0,0,0)
    
    if (!dateValue || selectedDate < currentDate) {
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

function validateTimeInput(): boolean {
    const timeValue = newEventTimeInput.value;
    if (!timeValue) {
        timeError.textContent = 'Please, enter a valid time.';
        newEventTimeInput.classList.add('is-invalid');
        timeError.classList.add('error-message');
        return false;
    }
    timeError.textContent = '';
    newEventTimeInput.classList.remove('is-invalid');
    timeError.classList.remove('error-message');
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
        labelError.textContent = 'Please, select a label.';
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

newEventTimeInput.addEventListener('blur', () => {
    validateTimeInput()
})

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
    if (validateDateInput() && validateTitleInput() && validateEventLabel() && validateTimeInput()) {
        const newEvent = newEventHandler();
        saveEventToLocalStorage(newEvent);
        populateCalendar(currentDate)
        const modalElement = document.getElementById('staticBackdrop')!;
        const modal = bootstrap.Modal.getInstance(modalElement)!;
        modal.hide()
    }
});

function validateEvents() {

}