export function nextMonth(currentDate: Date, callback: (date: Date) => void): void {
  currentDate.setMonth(currentDate.getMonth() + 1);
  callback(new Date(currentDate));
  triggerAnimation(); 
}

export function previousMonth(currentDate: Date, callback: (date: Date) => void): void {
  currentDate.setMonth(currentDate.getMonth() - 1);
  callback(new Date(currentDate));
  triggerAnimation(); 
}
  function triggerAnimation() {
    const calendarDays = document.querySelector<HTMLElement>('.calendar__days');

    if (calendarDays) {
      calendarDays.style.animation = 'flipV 1s linear';
    
      setTimeout(() => {
        calendarDays.style.animation = '';
      }, 500); 
    }}

export function setupNavigationListeners(currentDate: Date, callback: (date: Date) => void): void {
  const prevButton: HTMLElement = document.querySelector("#prev")!;
  const nextButton: HTMLElement = document.querySelector("#next")!;

  if (prevButton) {
      prevButton.addEventListener("click", () => previousMonth(currentDate, callback));
  }

  if (nextButton) {
      nextButton.addEventListener("click", () => nextMonth(currentDate, callback));
  }
}

export function setupMouseWheelNavigation(currentDate: Date, callback: (date: Date) => void): void {
  const calendarContainer = document.querySelector(".calendar__days")! as HTMLElement;

  calendarContainer.addEventListener("wheel", function (event) {
      // Prevent the default scroll behavior
      event.preventDefault();

      if (event.deltaY > 0) {
          // Scrolling down, go to next month
          nextMonth(currentDate, callback);
      } else if (event.deltaY < 0) {
          // Scrolling up, go to previous month
          previousMonth(currentDate, callback);
      }
  });
}

      export function loadLabelsFromLocalStorage() {
    const labels = JSON.parse(localStorage.getItem('eventLabels') || '[]');
    const eventLabelSelect = document.querySelector<HTMLSelectElement>('#eventLabel');
    labels.forEach((label: { name: string, color: string }) => {
        const option = document.createElement('option');
        option.value = label.name;
        option.textContent = label.name;
        option.style.color = label.color;
        eventLabelSelect!.appendChild(option);
    });}
