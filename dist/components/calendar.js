export const date = new Date();
export const daysDisplay = document.querySelector(".calendarDisplay");
export const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
export const monthLenght = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
export const firstDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
export const lastDayOfWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
export const nextDays = 7 - lastDayOfWeek;
export const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
export function populateCalendar() {
    if (daysDisplay) {
        // Clear previous days
        daysDisplay.innerHTML = '';
        // Previous month padding days
        for (let x = firstDay - 1; x > 0; x--) {
            const day = document.createElement("li");
            day.innerText = `${prevLastDay - x + 1}`;
            day.classList.add(`paddingDay`);
            daysDisplay.appendChild(day);
        }
        // Current month
        for (let i = 1; i <= monthLenght; i++) {
            const day = document.createElement("li");
            if (i === new Date().getDate() &&
                date.getMonth() === new Date().getMonth()) {
                day.classList.add(`today`);
            }
            day.innerText = `${i}`;
            daysDisplay.appendChild(day);
        }
        // Next month padding days
        for (let y = 1; y <= 7 - lastDayOfWeek; y++) { // Notice I changed the '<' to '<=' here
            const day = document.createElement("li");
            day.innerText = `${y}`;
            day.classList.add(`paddingDay`);
            daysDisplay.appendChild(day);
            document.querySelector("#prev").addEventListener("click", () => {
                daysDisplay.innerHTML = '';
                date.setMonth(date.getMonth() - 1);
                document.querySelector(".calendarHeader h1").innerHTML = months[date.getMonth()];
                document.querySelector(".calendarHeader h3").innerHTML = date.toDateString();
                populateCalendar();
            });
            document.querySelector("#next").addEventListener("click", () => {
                daysDisplay.innerHTML = '';
                date.setMonth(date.getMonth() + 1);
                document.querySelector(".calendarHeader h1").innerHTML = months[date.getMonth()];
                document.querySelector(".calendarHeader h3").innerHTML = date.toDateString();
                populateCalendar();
            });
        }
    }
}
