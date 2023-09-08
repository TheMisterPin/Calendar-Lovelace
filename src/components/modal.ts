import { newEventHandler } from '../utils/newEventHandler.js';

export function initializeModalLogic() {
    setupCheckboxLogic('#hasEndDate', '#newEventEndDate');
    setupCheckboxLogic('#hasReminder', '#newEventReminder');
    const newEventBtn = document.querySelector('#saveBtn')!;
    newEventBtn.addEventListener('click', () => {  
      clearFields(); newEventHandler();
      
    });
    
    const eventLabelSelect = document.querySelector<HTMLSelectElement>('#eventLabel');
    eventLabelSelect!.addEventListener('change', (event) => {
        if (eventLabelSelect!.value === 'addNew') {
       

            
            const newLabel = document.querySelector<HTMLInputElement>('#newLabelInput')!.value;
            const newLabelColor = document.querySelector<HTMLInputElement>('#newLabelColor')!.value;
            
            
        }
    });
}
    
    

function clearFields() {
    document.querySelector<HTMLInputElement>('#newEventTitle')!.value = '';
    document.querySelector<HTMLInputElement>('#newEventText')!.value = '';
    document.querySelector<HTMLInputElement>('#hasEndDate')!.checked = false;
    document.querySelector<HTMLInputElement>('#newEventEndDate')!.style.display = 'none';
    document.querySelector<HTMLInputElement>('#hasReminder')!.checked = false;
    document.querySelector<HTMLInputElement>('#newEventReminder')!.style.display = 'none';
    document.querySelector<HTMLSelectElement>('#eventLabel')!.value = 'work';
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
const eventLabelSelect = document.querySelector<HTMLSelectElement>('#eventLabel');
    eventLabelSelect!.addEventListener('change', (event) => {
        if (eventLabelSelect!.value === 'addNew') {  
            $('#eventLabel').on('hidden.bs.popover', function () {
                const newLabel = document.querySelector<HTMLInputElement>('#newLabelInput')!.value;
                const newLabelColor = document.querySelector<HTMLInputElement>('#newLabelColor')!.value;
                
                if (newLabel) {
                    saveNewLabelToLocalStorage(newLabel, newLabelColor);
                  
                }
            });
        }

function saveNewLabelToLocalStorage(label: string, color: string) {
    const labels = JSON.parse(localStorage.getItem('eventLabels') || '[]');
    labels.push({ name: label, color: color });
    localStorage.setItem('eventLabels', JSON.stringify(labels));    
    addNewLabelToDropdown(label, color);
    
}

function addNewLabelToDropdown(label: string, color: string) {
    const eventLabelSelect = document.querySelector<HTMLSelectElement>('#eventLabel');
    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    option.style.color = color;
}})

