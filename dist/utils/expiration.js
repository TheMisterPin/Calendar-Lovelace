export function eventsExpired() {
    // 14/5/2023 04:47
    // 1694087355249
    const currentDate = new Date();
    const allEvents = document.querySelectorAll('.day__events-list li');
    allEvents.forEach((event) => {
        const eventDateStr = event.dataset.eventDate;
        if (eventDateStr) {
            const eventDate = new Date(eventDateStr);
            console.log(eventDate);
            if (eventDate.getTime() <= currentDate.getTime()) {
                event.classList.add('expired-event');
            }
            else {
                event.classList.remove('expired-event');
            }
        }
    });
}
export function getEventExpiration() {
    const allEvents = document.querySelectorAll('.day__events-list li');
    let nextEventToExpire = null;
    let nearExpirationTime = Infinity;
    const currentDate = new Date();
    for (const event of allEvents) {
        const eventDateStr = event.dataset.eventDate;
        if (eventDateStr) {
            const eventDate = new Date(eventDateStr);
            if (eventDate > currentDate) {
                const timeUntilExpiration = eventDate.getTime() - currentDate.getTime();
                if (timeUntilExpiration < nearExpirationTime) {
                    nearExpirationTime = timeUntilExpiration;
                    nextEventToExpire = event;
                }
                setTimeout(() => {
                    event.classList.add('expired-event');
                }, timeUntilExpiration);
            }
        }
    }
    if (nextEventToExpire) {
        console.log('Next event to expire', nextEventToExpire.textContent);
    }
    else {
        console.log('No events close to expiring');
    }
}
