import { newEventHandler } from '../utils/newEventHandler.js';

export function initializeModalLogic() {
    setupCheckboxLogic('#hasEndDate', '#newEventEndDate');
    setupCheckboxLogic('#hasReminder', '#newEventReminder');

    const newEventBtn = document.querySelector('#saveBtn')!;
    newEventBtn.addEventListener('click', () => {
        const eventObject = newEventHandler();
    });
}

function setupCheckboxLogic(checkboxSelector: string, inputSelector: string) {
    const checkbox = document.querySelector<HTMLInputElement>(checkboxSelector);
    const input = document.querySelector<HTMLInputElement>(inputSelector);

    if (checkbox && input) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                input.style.display = 'block';
            } else {
                input.style.display = 'none';
                input.value = '';
            }
        });
    }
}


