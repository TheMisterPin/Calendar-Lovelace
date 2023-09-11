import { populateCalendar } from '../components/calendar.js'
import { CalendarEvent } from './newEventHandler.js'

const currentDate: Date = new Date()
const labelDropdown: HTMLSelectElement | null = document.querySelector('#eventLabel')
const labels = ['Work', 'Home', 'Hobby']

if (labelDropdown) {
	labels.forEach(label => {
		const option = document.createElement('option')
		option.value = label.toLowerCase() 
		option.textContent = label
		labelDropdown.appendChild(option)
	})
}

const checkboxesContainer = document.querySelector('.checkboxes')

labels.forEach(label => {
	const checkboxWrapper = document.createElement('div')
	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.value = label.toLowerCase() 
	checkbox.id = `label-${label.toLowerCase()}`
    
	const labelElement = document.createElement('label')
	labelElement.htmlFor = `label-${label.toLowerCase()}`
	labelElement.textContent = label

	checkboxWrapper.appendChild(checkbox)
	checkboxWrapper.appendChild(labelElement)
	checkboxesContainer?.appendChild(checkboxWrapper)
})

checkboxesContainer?.addEventListener('change', () => {
	filterEventsByLabel()
})

export function filterEventsByLabel() {
	const checkedLabels: string[] = []
	const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]')
    
	checkboxes.forEach(checkbox => {
		const cb = checkbox as HTMLInputElement
		if (cb.checked) {
			checkedLabels.push(cb.value)
		}
	})

	const allEvents = JSON.parse(localStorage.getItem('events') || '[]')
	let filteredEvents

	if (checkedLabels.length === 0) {
		filteredEvents = allEvents
	} else {
		filteredEvents = allEvents.filter((event: CalendarEvent) => checkedLabels.includes(event.label))
	}

	populateCalendar(currentDate, filteredEvents)
}

	

export function populateUpcomingEvents() {
	const upcomingEventsList: HTMLElement | null = document.querySelector('.upcoming-events-list')
	if (!upcomingEventsList) return


	upcomingEventsList.innerHTML = ''


	const allEvents: CalendarEvent[] = JSON.parse(localStorage.getItem('events') || '[]')


	allEvents.sort((a, b) => {
		const dateA = new Date(a.date)
		const dateB = new Date(b.date)
		return dateA.getTime() - dateB.getTime()
	})


	const groupedEvents: { [key: string]: CalendarEvent[] } = {}
	allEvents.forEach(event => {
		if (!groupedEvents[event.date]) {
			groupedEvents[event.date] = []
		}
		groupedEvents[event.date].push(event)
	})

	
	for (const date in groupedEvents) {
		const dateItem = document.createElement('li')
		dateItem.classList.add('date-item')
		dateItem.textContent = date 

		const eventsForDate = groupedEvents[date]
		const eventsList = document.createElement('ul')
		eventsList.classList.add('events-for-date')

		eventsForDate.forEach(event => {
			const eventItem = document.createElement('li')
			eventItem.textContent = event.title  
			eventsList.appendChild(eventItem)
		})

		dateItem.appendChild(eventsList)
		upcomingEventsList.appendChild(dateItem)
	}
}



