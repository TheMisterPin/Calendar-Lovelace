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
