import { populateCalendar } from "../components/calendar";
document.getElementById('labelFilter').addEventListener('change', (e) => {
    const selectedLabel = e.target.value;
    const label = selectedLabel;
    populateCalendar(currentDate);
});
export function populateLabelFilter() {
    const labels = JSON.parse(localStorage.getItem('eventLabels') || '[]');
    const labelFilterDropdown = document.querySelector('#labelFilter');
    labels.forEach((labelObj) => {
        const option = document.createElement('option');
        option.value = labelObj.name;
        option.innerText = labelObj.name;
        option.style.color = labelObj.color;
        if (labelFilterDropdown) {
            labelFilterDropdown.appendChild(option);
        }
    });
}
let currentDate = new Date;
export function applyLabelFilter() {
}
