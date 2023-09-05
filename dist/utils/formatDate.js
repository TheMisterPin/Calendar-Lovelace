export function formatDate(date) {
    const dateObject = new Date(date);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return dateObject.toLocaleDateString(undefined, dateOptions);
}
