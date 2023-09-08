"use strict";
class DropDown {
    constructor(buttonId, dropdownId) {
        this.open = false;
        this.buttonElement = document.getElementById(buttonId);
        this.dropdownElement = document.getElementById(dropdownId);
        this.initialize();
    }
    initialize() {
        this.buttonElement.addEventListener('click', this.toggleDropdown.bind(this));
    }
    toggleDropdown() {
        this.open = !this.open;
        if (this.open) {
            this.dropdownElement.classList.remove('hidden');
        }
        else {
            this.dropdownElement.classList.add('hidden');
        }
    }
}
// This ensures that the DOM is fully loaded before the DropDown is initialized.
window.onload = () => {
    new DropDown('menu-button', 'dropdown-menu');
};
