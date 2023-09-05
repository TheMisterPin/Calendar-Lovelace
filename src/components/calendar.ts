import { months } from '../utils/constants.js';
import { getDateInfo, DateInfo } from '../utils/dateInfo.js';
import { formatDate } from '../utils/formatDate.js';

let currentDate: Date = new Date();

export function populateCalendar(): void {
  const currentMonthInfo = months[currentDate.getMonth()];
  const daysDisplay: HTMLElement= document.querySelector(".calendarDisplay")!;
  const calendarElement = document.querySelector(".calendar") as HTMLElement;

  
  const { firstDay, lastDayOfWeek, monthLength, prevLastDay, formattedDate } = getDateInfo(currentDate);
  daysDisplay.innerHTML = ''

  

  // Previous month padding days
  for (let x = firstDay - 1; x > 0; x--) {
    const day: HTMLParagraphElement = document.createElement("p");
    day.innerText = `${prevLastDay - x + 1}`;
    day.classList.add(`paddingDay`);
    daysDisplay.appendChild(day);
  }

  // Get events
  const localEvents = JSON.parse(localStorage.getItem('events') || '[]')

  // Current month days
  for (let i = 1; i <= monthLength; i++) {
    const day:HTMLDivElement = document.createElement('div')
    day.classList.add('day')
    const dayNumber: HTMLParagraphElement = document.createElement("p");
    dayNumber.innerText = `${i}`;
    dayNumber.classList.add('day__number')
    day.appendChild(dayNumber)
    if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
      day.classList.add(`today`);
    }
    // Add events to days 
    if(localEvents){
      const currentMonth = currentDate.getMonth()+1
      const currentYear = currentDate.getFullYear()
      const currentDay = i
      
      const fullDate = formatDate(`${currentMonth} ${currentDay}, ${currentYear}`)  
      const dayEvents = localEvents.filter(event => event.date === fullDate)  // Add event interface
      console.log(dayEvents)
      if(dayEvents){
        const eventsToRender = dayEvents.length > 3 ? dayEvents.toSpliced(3) : dayEvents
        eventsToRender.forEach(event=>{   // Add event interface
          const eventNameEl = document.createElement('p')
          eventNameEl.classList.add('event')
          eventNameEl.innerText = `${event.time} ${event.title}`
          day.appendChild(eventNameEl)
        })
        if(dayEvents.length > 3){
          const viewDayEventsBtn = document.createElement('button')
          viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`
          viewDayEventsBtn.classList.add('view_more_btn')
          viewDayEventsBtn.addEventListener('click', ()=> console.log('More Events Here'))
          day.appendChild(viewDayEventsBtn)
      }
        
      }
    }
    
    
    daysDisplay.appendChild(day);
  }

  // Next month padding days
  for (let y = 1; y <= 7 - lastDayOfWeek; y++) {
    const day: HTMLParagraphElement = document.createElement("p");
    day.innerText = `${y}`;
    day.classList.add(`paddingDay`);
    daysDisplay.appendChild(day);
  }

  const monthHeader = document.querySelector(".calendarHeader h1") as HTMLElement;
  if (monthHeader) {
      monthHeader.innerHTML = currentMonthInfo.name;
  }
  
  const dateHeader = document.querySelector(".calendarHeader h5") as HTMLElement;
  if (dateHeader) {
      dateHeader.innerHTML = formattedDate;
  }

  if (calendarElement) {
    // calendarElement.style.backgroundImage = currentMonthInfo.background;
    calendarElement.style.backgroundSize = 'contain'; 
    calendarElement.style.backgroundRepeat = 'no-repeat'; 
    calendarElement.style.backgroundPosition = 'center center';
}
}


document.addEventListener("DOMContentLoaded", () => {

  const prevButton: HTMLElement | null = document.querySelector("#prev");
  const nextButton: HTMLElement | null = document.querySelector("#next");

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      populateCalendar();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      populateCalendar();
    });
  }
});