import { formatDate } from "./formatDate.js"
import { Event } from "./newEventHandler.js"

export function getDayEvents(eventsArray: Event[], day:number, currentDate:Date){
    const currentMonth = currentDate.getMonth()+1
    const currentYear = currentDate.getFullYear()
    const currentDay = day
      
    const fullDate = formatDate(`${currentMonth} ${currentDay}, ${currentYear}`)  
    return eventsArray.filter((event:Event) => event.date === fullDate)
}

export function renderDayEvents(dayEvents:Event[], eventsContainer:HTMLElement, dayContainer:HTMLElement){ 
  const eventsToRender = dayEvents.length > 3 ? dayEvents.toSpliced(3) : dayEvents
  eventsToRender.forEach((event:Event)=>{   // Add event interface
    const eventNameEl = document.createElement('p')
    eventNameEl.classList.add('event', event.label)
    eventNameEl.innerText = `${event.time} ${event.title}`
    eventsContainer.appendChild(eventNameEl)
  })
  if(dayEvents.length > 3){
    const viewDayEventsBtn = document.createElement('button')
    viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`
    viewDayEventsBtn.classList.add('view_more_btn')
    viewDayEventsBtn.addEventListener('click', ()=> console.log('More Events Here'))
    dayContainer.appendChild(viewDayEventsBtn)
}
}