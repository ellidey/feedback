"use strict";

const inputs = document.querySelectorAll('input.feedback__input');

export function correctFileds() {
    inputs.forEach(element => {
        element.addEventListener('focus', focusField);
        element.addEventListener('focusout', focusoutField);
    });
}

function focusField(event) {
    const target = event.currentTarget;
    const icon = target.parentNode.querySelector('.feedback__icon');

    icon.classList.add('active');
    target.classList.add('active');
}

function focusoutField(event) {
    const target = event.currentTarget;
    const icon = target.parentNode.querySelector('.feedback__icon');

    icon.classList.remove('active');
    if (!target.value) {
        target.classList.remove('active');
    }
    
}