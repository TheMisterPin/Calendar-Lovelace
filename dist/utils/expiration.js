export function eventsExpired() {
    console.log('eventsExpired function called');
    setInterval(() => {
        const currentDate = new Date();
        const allEvents = document.querySelectorAll('.day__events-list li');
        allEvents.forEach((event) => {
            console.log(allEvents);
            const eventDateStr = event.dataset.eventDate;
            if (eventDateStr) {
                const eventDate = new Date(eventDateStr);
                if (eventDate.getTime() <= currentDate.getTime()) {
                    event.classList.add('expired-event');
                }
                else {
                    event.classList.remove('expired-event');
                }
            }
        });
    }, 1000);
}
