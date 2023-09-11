
import { populateCalendar} from './components/calendar.js'
import { setupNavigationListeners, setupMouseWheelNavigation } from './utils/eventListners.js'
import { initializeModalLogic } from './components/modal.js'
import { filterEventsByLabel, populateUpcomingEvents } from './utils/filter.js'

const currentDate: Date = new Date()


document.addEventListener('DOMContentLoaded', () => {
	setupNavigationListeners(currentDate, populateCalendar)
	initializeModalLogic()
	filterEventsByLabel()
	populateUpcomingEvents()
})
















