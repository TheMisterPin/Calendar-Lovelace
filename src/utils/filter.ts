import { populateCalendar } from "../components/calendar";
import { uuidv4 } from './uuidv4';

export interface Label {
    id?: string;
    name: string;
    color?: string;

}
document.getElementById('labelFilter')!.addEventListener('change', (e) => {
    const selectedLabel = (e.target as HTMLSelectElement).value;
   const name = selectedLabel
   const newLabel: Label = {
    name: name,
    
      }
      return newLabel
});


let currentDate = new Date



export function applyLabelFilter() {

}


