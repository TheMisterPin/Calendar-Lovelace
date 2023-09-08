export function nextMonth(currentDate, callback) {
    currentDate.setMonth(currentDate.getMonth() + 1);
    callback(new Date(currentDate));
    triggerAnimation(); // Trigger the animation
}
export function previousMonth(currentDate, callback) {
    currentDate.setMonth(currentDate.getMonth() - 1);
    callback(new Date(currentDate));
    triggerAnimation();
}
function triggerAnimation() {
    const calendarDays = document.querySelector('.calendar__days');
    if (calendarDays) {
        calendarDays.style.animation = 'flipV 1s linear';
        setTimeout(() => {
            calendarDays.style.animation = '';
        }, 1000);
    }
}
export function setupNavigationListeners(currentDate, callback) {
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
    if (prevButton) {
        prevButton.addEventListener("click", () => previousMonth(currentDate, callback));
    }
    if (nextButton) {
        nextButton.addEventListener("click", () => nextMonth(currentDate, callback));
    }
}
export function setupMouseWheelNavigation(currentDate, callback) {
    const calendarContainer = document.querySelector(".calendar__days");
    calendarContainer.addEventListener("wheel", function (event) {
        event.preventDefault();
        if (event.deltaY > 0) {
            nextMonth(currentDate, callback);
        }
        else if (event.deltaY < 0) {
            previousMonth(currentDate, callback);
        }
    });
}
export function loadLabelsFromLocalStorage() {
    const labels = JSON.parse(localStorage.getItem('eventLabels') || '[]');
    const eventLabelSelect = document.querySelector('#eventLabel');
    labels.forEach((label) => {
        const option = document.createElement('option');
        option.value = label.name;
        option.textContent = label.name;
        option.style.color = label.color;
        eventLabelSelect.appendChild(option);
    });
}
