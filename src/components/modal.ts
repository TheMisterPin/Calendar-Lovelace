import { newEventHandler } from '../utils/newEventHandler.js'

export function initializeModalLogic() {
	setupCheckboxLogic('#hasEndDate', '#newEventEndDate')
	setupCheckboxLogic('#hasReminder', '#newEventReminder')
	const newEventBtn = document.querySelector('#saveBtn')!
	newEventBtn.addEventListener('click', () => {
		clearFields(); newEventHandler()

	})

}



function clearFields() {
	document.querySelector<HTMLInputElement>('#newEventTitle')!.value = ''
	document.querySelector<HTMLInputElement>('#newEventText')!.value = ''
	document.querySelector<HTMLInputElement>('#hasEndDate')!.checked = false
	document.querySelector<HTMLInputElement>('#newEventEndDate')!.style.display = 'none'
	document.querySelector<HTMLInputElement>('#hasReminder')!.checked = false
	document.querySelector<HTMLInputElement>('#newEventReminder')!.style.display = 'none'
	document.querySelector<HTMLSelectElement>('#eventLabel')!.value = 'work'
}

function setupCheckboxLogic(checkboxSelector: string, inputSelector: string) {
	const checkbox = document.querySelector<HTMLInputElement>(checkboxSelector)
	const input = document.querySelector<HTMLInputElement>(inputSelector)

	if (checkbox && input) {
		checkbox.addEventListener('change', () => {
			if (checkbox.checked) {
				input.style.display = 'block'
			} else {
				input.style.display = 'none'
				input.value = ''
			}
		})
	}
}

