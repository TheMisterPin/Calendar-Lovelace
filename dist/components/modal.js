export function initializeModalLogic() {
    setupCheckboxLogic('#hasEndDate', '#newEventEndDate');
    setupCheckboxLogic('#hasReminder', '#newEventReminder');
    const newEventBtn = document.querySelector('#saveBtn');
    newEventBtn.addEventListener('click', () => {
        clearFields();
    });
    const toastEl = new bootstrap.Toast(document.getElementById('eventToast'));
    toastEl.show();
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
    const eventLabelSelect = document.querySelector('#eventLabel');
    eventLabelSelect.addEventListener('change', (event) => {
        if (eventLabelSelect.value === 'addNew') {
            const newLabel = document.querySelector('#newLabelInput').value;
            const newLabelColor = document.querySelector('#newLabelColor').value;
        }
    });
}
function clearFields() {
    document.querySelector('#newEventTitle').value = '';
    document.querySelector('#newEventText').value = '';
    document.querySelector('#hasEndDate').checked = false;
    document.querySelector('#newEventEndDate').style.display = 'none';
    document.querySelector('#hasReminder').checked = false;
    document.querySelector('#newEventReminder').style.display = 'none';
    document.querySelector('#eventLabel').value = 'work';
}
function setupCheckboxLogic(checkboxSelector, inputSelector) {
    const checkbox = document.querySelector(checkboxSelector);
    const input = document.querySelector(inputSelector);
    if (checkbox && input) {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                input.style.display = 'block';
            }
            else {
                input.style.display = 'none';
                input.value = '';
            }
        });
    }
}
const eventLabelSelect = document.querySelector('#eventLabel');
eventLabelSelect.addEventListener('change', (event) => {
    if (eventLabelSelect.value === 'addNew') {
        $('#eventLabel').on('hidden.bs.popover', function () {
            const newLabel = document.querySelector('#newLabelInput').value;
            const newLabelColor = document.querySelector('#newLabelColor').value;
            if (newLabel) {
                saveNewLabelToLocalStorage(newLabel, newLabelColor);
                addNewLabelToDropdown(newLabel, newLabelColor);
            }
        });
    }
    function saveNewLabelToLocalStorage(label, color) {
        const labels = JSON.parse(localStorage.getItem('eventLabels') || '[]');
        labels.push({ name: label, color: color });
        localStorage.setItem('eventLabels', JSON.stringify(labels));
    }
    function addNewLabelToDropdown(label, color) {
        const eventLabelSelect = document.querySelector('#eventLabel');
        const option = document.createElement('option');
        option.value = label;
        option.textContent = label;
        option.style.color = color;
    }
});
