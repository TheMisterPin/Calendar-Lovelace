export function validateDateInput(newEventDateInput: HTMLInputElement, dateError: HTMLDivElement): boolean {
    const dateValue = newEventDateInput.value;
    const currentDate = new Date();
    const selectedDate = new Date(dateValue);

    currentDate.setHours(0,0,0,0)
    selectedDate.setHours(0,0,0,0)
    
    if (!dateValue || selectedDate < currentDate) {
        dateError.textContent = 'Please, enter a valid date.';
        newEventDateInput.classList.add('is-invalid');
        dateError.classList.add('error-message');
        return false;
    }
    dateError.textContent = '';
    newEventDateInput.classList.remove('is-invalid');
    dateError.classList.remove('error-message');
    return true;
}

export function validateTimeInput(newEventTimeInput: HTMLInputElement, timeError: HTMLDivElement): boolean {
    const timeValue = newEventTimeInput.value;
    if (!timeValue) {
        timeError.textContent = 'Please, enter a valid time.';
        newEventTimeInput.classList.add('is-invalid');
        timeError.classList.add('error-message');
        return false;
    }
    timeError.textContent = '';
    newEventTimeInput.classList.remove('is-invalid');
    timeError.classList.remove('error-message');
    return true;
}

export function validateTitleInput(newEventTitleInput: HTMLInputElement, titleError: HTMLDivElement): boolean {
    const titleValue = newEventTitleInput.value;
    if (!titleValue) {
        titleError.textContent = 'Please, enter an event title.';
        newEventTitleInput.classList.add('is-invalid');
        titleError.classList.add('error-message');
        return false;
    }
    titleError.textContent = '';
    newEventTitleInput.classList.remove('is-invalid');
    titleError.classList.remove('error-message');
    return true;
}

export function validateEventLabel(labelSelector: HTMLSelectElement, labelError: HTMLDivElement): boolean {
    const eventValue = labelSelector.value;
    if (!eventValue) {
        labelError.textContent = 'Please, select a label.';
        labelSelector.classList.add('is-invalid');
        labelError.classList.add('error-message');
        return false;   
    }
    labelError.textContent = '';
    labelSelector.classList.remove('is-invalid');
    labelError.classList.remove('error-message');
    return true;
}
