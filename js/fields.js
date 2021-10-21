"use strict";

const inputs = document.querySelectorAll('input.feedback__input');

export function correctFileds() {
    inputs.forEach(element => {
        element.addEventListener('focus', focusField);
        element.addEventListener('focusout', focusoutField);
    });
}

function focusField(event) {
    event.currentTarget.classList.add('active');
}

function focusoutField(event) {
    const target = event.currentTarget;

    if (!target.value) {
        target.classList.remove('active');
    }
    
}