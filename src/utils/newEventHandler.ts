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
    miliseconds: number; 
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
    const miliseconds = getEventTimeArray(date, time)

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
        reminder,
        miliseconds
    }

    return newEvent;
}

function getEventTimeArray(date:string, time:string):number{
    const dateArray = date.split('/')
    const day = dateArray[0]
    const month = dateArray[1]
    const year = dateArray[2]

    const timeArray = time.split(':')
    const hours = timeArray[0]
    const mins = timeArray[1]

    const timeString = `${month},${day},${year},${hours}:${mins}`

    const eventDate = new Date(timeString)
    return eventDate.getTime()
}