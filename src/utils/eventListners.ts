export function setupNavigationListeners(currentDate: Date, callback: (date: Date) => void): void {
    const prevButton: HTMLElement= document.querySelector("#prev")!;
    const nextButton: HTMLElement  = document.querySelector("#next")!;

    if (prevButton) {
        prevButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            callback(currentDate);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            callback(currentDate);
        });
    }
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

    export function setupNavigationScroll(currentDate: Date, callback: (date: Date) => void): void {
    
    
        document.addEventListener("mouseup" , () => {console.log("mouseup");});
        //       currentDate.setMonth(currentDate.getMonth() - 1);
        // callback(currentDate);})
    
        document.addEventListener("mousedown" , () => {console.log("mouseup");});
        // {  currentDate.setMonth(currentDate.getMonth() + 1);
        //     callback(currentDate);})
    }
    