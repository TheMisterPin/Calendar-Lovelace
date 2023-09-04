import { months, days } from './constants.js';
function getOrdinalSuffix(num) {
    if (num % 10 === 1 && num % 100 !== 11) {
        return "st";
    }
    else if (num % 10 === 2 && num % 100 !== 12) {
        return "nd";
    }
    else if (num % 10 === 3 && num % 100 !== 13) {
        return "rd";
    }
    else {
        return "th";
    }
}
function formatDateToStr(date) {
    const dayName = days[(date.getDay() + 6) % 7];
    const monthName = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    return `${dayName}, ${monthName} ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)}.`;
}
export function getDateInfo(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    // Adjusting for the week starting on Monday
    const firstDay = (firstDayOfMonth.getDay() + 6) % 7 + 1;
    const lastDayOfWeek = (new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay() + 6) % 7 + 1;
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    const formattedDate = formatDateToStr(date);
    return {
        firstDay,
        lastDayOfWeek,
        monthLength,
        prevLastDay,
        formattedDate,
    };
}
