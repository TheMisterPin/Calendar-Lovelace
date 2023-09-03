const months: string[] = [
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

let currentDate: Date = new Date();

interface DateInfo {
  firstDay: number;
  lastDayOfWeek: number;
  monthLength: number;
  prevLastDay: number;
}

function getDateInfo(date: Date): DateInfo {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDay: number = firstDayOfMonth.getDay() === 0 ? 7 : firstDayOfMonth.getDay();
  const lastDayOfWeek: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
  const prevLastDay: number = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  return {
    firstDay,
    lastDayOfWeek,
    monthLength,
    prevLastDay,
  };
}

function populateCalendar(): void {
  const daysDisplay: HTMLElement | null = document.querySelector(".calendarDisplay");
  if (!daysDisplay) return;

  const { firstDay, lastDayOfWeek, monthLength, prevLastDay } = getDateInfo(currentDate);
  
  daysDisplay.innerHTML = ''; // Clear the calendar

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

  const monthHeader: HTMLElement | null = document.querySelector(".calendarHeader h1");
  const dateHeader: HTMLElement | null = document.querySelector(".calendarHeader h3");
  if (monthHeader) monthHeader.innerHTML = months[currentDate.getMonth()];
  if (dateHeader) dateHeader.innerHTML = currentDate.toDateString();
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