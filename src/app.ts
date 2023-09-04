import { populateCalendar } from './components/calendar.js';
import { newEventHandler } from './utils/newEventHandler.js';


populateCalendar();

const newEventBtn = document.querySelector('#saveBtn')!;

newEventBtn.addEventListener('click', () =>{
const eventObject = newEventHandler();
});

