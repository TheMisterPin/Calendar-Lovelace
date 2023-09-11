import { formatDate } from './formatDate.js'
import { populateCalendar } from '../components/calendar.js'
import { uuidv4 } from './uuidv4.js'
import { validateDateInput, validateTimeInput, validateTitleInput, validateEventLabel, validateEndDateInput } from './validation.js'

const newEventDateInput: HTMLInputElement = document.querySelector('#newEventDate')!
const newEventTitleInput : HTMLInputElement= document.querySelector('#newEventTitle')!
const newEventTxtInput: HTMLInputElement = document.querySelector('#newEventText')! 
const newEventTimeInput: HTMLInputElement = document.querySelector('#newEventTime')!
const newEventReminder: HTMLInputElement = document.querySelector('#newEventReminder')!
const newEventEndDateInput: HTMLInputElement = document.querySelector('#newEventEndDate')!
const labelSelector: HTMLSelectElement = document.querySelector('#eventLabel')!
const saveBtn: HTMLButtonElement = document.querySelector('#saveBtn')!
const dateError: HTMLDivElement = document.createElement('div')!
const endDateError: HTMLDivElement = document.createElement('div')!
const timeError:HTMLDivElement = document.createElement('div')!
const titleError: HTMLDivElement = document.createElement('div')!
const labelError: HTMLDivElement = document.createElement('div')!

const today = new Date().toISOString().slice(0, 10)
newEventDateInput.value=(today)

const currentTime = new Date().toISOString().slice(11,16)
newEventTimeInput.value=(currentTime)

newEventDateInput.parentElement?.append(dateError)
newEventEndDateInput.parentElement?.append(endDateError)
newEventTimeInput.parentElement?.append(timeError)
newEventTitleInput.parentElement?.append(titleError)
labelSelector.parentElement?.append(labelError)

export interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    txt: string;
    time: string;
    label: string;
    milliseconds: number; 
    endDate?: string; 
    reminder?: string;
    timeToReminder?: number;
    expired: boolean
}

function saveEventToLocalStorage(event: CalendarEvent): void {
    const localEvents = JSON.parse(localStorage.getItem('events') || '[]')
    localEvents.push(event)
    localStorage.setItem('events', JSON.stringify(localEvents))
}

newEventDateInput.addEventListener('blur', () => {
	validateDateInput(newEventDateInput, dateError)
})

newEventEndDateInput.addEventListener('blur', () => {
	validateEndDateInput(newEventEndDateInput, endDateError, newEventDateInput)
})

newEventTimeInput.addEventListener('blur', () => {
	validateTimeInput(newEventTimeInput, timeError)
})

newEventTitleInput.addEventListener('blur', () => {
	validateTitleInput(newEventTitleInput, titleError)
})

labelSelector.addEventListener('blur', () => {
	validateEventLabel(labelSelector, labelError)
})

newEventDateInput.addEventListener('focus', () => {
	dateError.textContent = ''
	newEventDateInput.classList.remove('is-invalid')
	dateError.classList.remove('error-message')
})

newEventEndDateInput.addEventListener('focus', () => {
	endDateError.textContent = ''
	newEventEndDateInput.classList.remove('is-invalid')
	endDateError.classList.remove('error-message')
})

newEventTimeInput.addEventListener('focus', () => {
	timeError.textContent = ''
	newEventTimeInput.classList.remove('is-invalid')
	timeError.classList.remove('error-message')
})

newEventTitleInput.addEventListener('focus', () => {
	titleError.textContent = ''
	newEventTitleInput.classList.remove('is-invalid')
	titleError.classList.remove('error-message')
})

labelSelector.addEventListener('focus', () => {
	labelError.textContent = ''
	labelSelector.classList.remove('is-invalid')
	labelError.classList.remove('error-message')
})

const currentDate: Date = new Date()
saveBtn.addEventListener('click', () => {
	if (validateDateInput(newEventDateInput, dateError) && validateTitleInput(newEventTitleInput, titleError) && validateEventLabel(labelSelector, labelError) && validateTimeInput(newEventTimeInput, timeError) && validateEndDateInput(newEventEndDateInput,endDateError,newEventDateInput)) {
		const newEvent = newEventHandler()
		saveEventToLocalStorage(newEvent)
		populateCalendar(currentDate)
		const modalElement = document.getElementById('staticBackdrop')!
		const modal = bootstrap.Modal.getInstance(modalElement)!
		modal.hide()
	}
}) 

export function newEventHandler(): CalendarEvent {
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
    const timeToReminder = getTimeToReminder(miliseconds, reminder)
    let expired = false

	if (hasEndDateCheckbox.checked) {
		const newEventEndDateInput: HTMLInputElement = document.querySelector('#newEventEndDate')!
		endDate = newEventEndDateInput.value
	}

    const newEvent: CalendarEvent = {
        id,
        title,
        date,
        time,
        txt,
        label,
        endDate,
        reminder,
        miliseconds,
        timeToReminder,
        expired
    }

	return newEvent
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

function getTimeToReminder(miliseconds:number, reminder:string){
    const reminderAnticipationInMiliseconds = parseInt(reminder)*60000
    return miliseconds - reminderAnticipationInMiliseconds
}