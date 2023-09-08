
import { populateCalendar} from './components/calendar.js'
import { loadLabelsFromLocalStorage, setupNavigationListeners, setupMouseWheelNavigation } from './utils/eventListners.js'
import { initializeModalLogic } from './components/modal.js'


const currentDate: Date = new Date()


document.addEventListener('DOMContentLoaded', () => {
    
	populateCalendar(currentDate)
	setupNavigationListeners(currentDate, populateCalendar)
	initializeModalLogic()
	loadLabelsFromLocalStorage()
	setupMouseWheelNavigation(currentDate, populateCalendar)
    



})















