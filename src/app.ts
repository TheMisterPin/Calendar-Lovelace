import { populateCalendar } from './components/calendar.js';
import { newEventHandler } from './utils/newEventHandler.js';


populateCalendar();

const newEventBtn = document.querySelector('#saveBtn')!;
const detailsEventBtn = document.querySelector("#detailsEventBtn")!

newEventBtn.addEventListener('click', () =>{
const eventObject = newEventHandler();
});

detailsEventBtn.addEventListener("click", () => {
    const detailsEventObject = newEventHandler()
})

