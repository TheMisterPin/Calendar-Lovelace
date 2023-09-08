document.getElementById('labelFilter').addEventListener('change', (e) => {
    const selectedLabel = e.target.value;
    const name = selectedLabel;
    const newLabel = {
        name: name,
    };
    return newLabel;
});
let currentDate = new Date;
export function applyLabelFilter() {
}
