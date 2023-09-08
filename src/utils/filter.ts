import { populateCalendar } from "../components/calendar";
import { uuidv4 } from './uuidv4';

export interface Label {
    id: string;
    name: string;
    color?: string;

}
document.getElementById('labelFilter')!.addEventListener('change', (e) => {
    const selectedLabel = (e.target as HTMLSelectElement).value;
   const name = selectedLabel
   const id = uuidv4()

   const newLabel: Label = {
    


   }
});


export function populateLabelFilter() {
    const labels: Label[] = JSON.parse(localStorage.getItem('eventLabels') || '[]');
    const labelFilterDropdown = document.querySelector<HTMLSelectElement>('#labelFilter');

    labels.forEach((labelObj: Label) => {
        const option = document.createElement('option');
        option.value = labelObj.name;
        option.innerText = labelObj.name;
        option.style.color = labelObj.color;
        if (labelFilterDropdown) {
            labelFilterDropdown.appendChild(option);
        }
    });
}

let currentDate = new Date



export function applyLabelFilter() {

}


