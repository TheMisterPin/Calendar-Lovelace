"use strict";
const months = [
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
let currentDate = new Date();
function getDateInfo(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const firstDay = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
    const lastDayOfWeek = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    return {
        firstDay,
        lastDayOfWeek,
        monthLength,
        prevLastDay,
    };
}
function populateCalendar() {
    const daysDisplay = document.querySelector(".calendarDisplay");
    if (!daysDisplay)
        return;
    const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
    daysDisplay.innerHTML = ''; // Clear the calendar
    // Previous month padding days
    for (let x = firstDay - 1; x > 0; x--) {
        const day = document.createElement("li");
        day.innerText = `${prevLastDay - x + 1}`;
        day.classList.add(`paddingDay`);
        daysDisplay.appendChild(day);
    }
    // Current month days
    for (let i = 1; i <= monthLength; i++) {
        const day = document.createElement("li");
        if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
            day.classList.add(`today`);
        }
        day.innerText = `${i}`;
        daysDisplay.appendChild(day);
    }
    // Next month padding days
    for (let y = 1; y <= 7 - lastDayOfWeek; y++) {
        const day = document.createElement("li");
        day.innerText = `${y}`;
        day.classList.add(`paddingDay`);
        daysDisplay.appendChild(day);
    }
    const monthHeader = document.querySelector(".calendarHeader h1");
    const dateHeader = document.querySelector(".calendarHeader h3");
    if (monthHeader)
        monthHeader.innerHTML = months[currentDate.getMonth()];
    if (dateHeader)
        dateHeader.innerHTML = currentDate.toDateString();
}
document.addEventListener("DOMContentLoaded", () => {
    populateCalendar();
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");
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
