import { months, days } from '../utils/constants.js';
import { getDateInfo, DateInfo } from '../utils/dateInfo.js';

let currentDate: Date = new Date();

export function populateCalendar(): void {
  const currentMonthInfo = months[currentDate.getMonth()];
  const daysDisplay: HTMLElement= document.querySelector(".calendarDisplay")!;
  const calendarElement = document.querySelector(".calendar") as HTMLElement;

  
  const { firstDay, lastDayOfWeek, monthLength, prevLastDay, formattedDate } = getDateInfo(currentDate);
  daysDisplay.innerHTML = ''


  // Previous month padding days
  for (let x = firstDay - 1; x > 0; x--) {
    const day: HTMLLIElement = document.createElement("li");
    day.innerText = `${prevLastDay - x + 1}`;
    day.classList.add(`paddingDay`);
    daysDisplay.appendChild(day);
  }

  // Current month days
  for (let i = 1; i <= monthLength; i++) {
    const day: HTMLLIElement = document.createElement("li");
    if (i === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()) {
      day.classList.add(`today`);
    }
    day.innerText = `${i}`;
    daysDisplay.appendChild(day);
  }

  // Next month padding days
  for (let y = 1; y <= 7 - lastDayOfWeek; y++) {
    const day: HTMLLIElement = document.createElement("li");
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
    console.log(`Setting background to: ${currentMonthInfo.background}`);
    calendarElement.style.backgroundImage = currentMonthInfo.background;
    calendarElement.style.backgroundSize = 'contain'; 
    calendarElement.style.backgroundRepeat = 'no-repeat'; 
    calendarElement.style.backgroundPosition = 'center center';
}
}


document.addEventListener("DOMContentLoaded", () => {
  populateCalendar();

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