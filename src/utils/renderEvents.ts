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
    const eventsToRender = [...dayEvents]
    if (dayEvents.length > 3){
        eventsToRender.splice(3)
    }
  eventsToRender.forEach((event:Event)=>{   
    const eventNameEl = document.createElement('li')
    eventNameEl.classList.add('event', event.label)
    eventNameEl.innerText = `${event.time} ${event.title}`
    eventsContainer.appendChild(eventNameEl)
  })
  if(dayEvents.length > 3){
    const viewDayEventsBtn = document.createElement('button')
    viewDayEventsBtn.textContent = `${dayEvents.length - 3} more`
    viewDayEventsBtn.classList.add('view_more_btn', 'btn')
    viewDayEventsBtn.dataset.bsToggle = "popover"
    viewDayEventsBtn.dataset.bsTitle = "Popover Title"
    viewDayEventsBtn.dataset.bsContent = "And here's some amazing content. It's very engaging. Right?"
    viewDayEventsBtn.dataset.bsPlacement = "left"
    /* Add Offset */  
    
    dayContainer.appendChild(viewDayEventsBtn)
    
    setTimeout(()=>{
        const popoverTriggerEl= document.querySelector('[data-bs-toggle="popover"]:not(.trigger)')
        popoverTriggerEl?.classList.add('trigger')
        const popover = new bootstrap.Popover(popoverTriggerEl, {
            html: true
        })
        

        popoverTriggerEl?.addEventListener('show.bs.popover', ()=> renderDayEventsPopover(dayEvents, popover))

    },2000)  // Test changing the timeout with async await with promise
}
}

function renderDayEventsPopover(dayEvents:Event[], popover){
    let popoverTemplate = "<ul>templateInner</ul>"
    let popoverTemplateInner = ""
    dayEvents.forEach(event => {
        popoverTemplateInner += `<li class="event ${event.label}">${event.time} ${event.title}</li>`
        
    })
    popoverTemplate = popoverTemplate.replace('templateInner', popoverTemplateInner)

    popover.setContent({
        '.popover-header':dayEvents[0].date,
        '.popover-body': popoverTemplate
    })

}