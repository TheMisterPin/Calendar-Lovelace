

import { months, days } from './constants.js'


export interface DateInfo {
    firstDay: number;
    lastDayOfWeek: number;
    monthLength: number;
    prevLastDay: number;
    formattedDate: string;
  }
  
  
function getOrdinalSuffix(num: number){
	if (num % 10 === 1 && num % 100 !== 11) {
		return 'st'
	} else if (num % 10 === 2 && num % 100 !== 12) {
		return 'nd'
	} else if (num % 10 === 3 && num % 100 !== 13) {
		return 'rd'
	} else {
		return 'th'
	}
}

function formatDateToStr(date: Date): string {
	const dayName = days[(date.getDay() + 6) % 7] 
	const monthName = months[date.getMonth()].name
	const dayOfMonth = date.getDate()
	return `${dayName}, ${monthName} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}.`
    
}

export function getDateInfo(date: Date): DateInfo {
	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
	const monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    
	// Adjusting for the week starting on Monday
	const firstDay: number = (firstDayOfMonth.getDay() + 6) % 7 + 1
	const lastDayOfWeek: number = (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() + 6) % 7 + 1
    
	const prevLastDay: number = new Date(date.getFullYear(), date.getMonth(), 0).getDate()
  
	const formattedDate: string = formatDateToStr(date)

	return {
		firstDay,
		lastDayOfWeek,
		monthLength,
		prevLastDay,
		formattedDate,
	}
}