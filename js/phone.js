"use strict";

const tellField = document.querySelector('#telephone');
const pattern = '+_ (___) ___-__-__';


export function setPattern() {
    tellField.addEventListener('focusout', focusoutNumber);
    tellField.addEventListener('change', changeNumber);
    tellField.addEventListener('input', inputNumber);
    tellField.addEventListener('keydown', keydownNumber)
}

function focusoutNumber(event) {
    let data = validateData(tellField.value);
    
    // hide mask
    if (data.length <= 0) {
        tellField.value = '';
    }
}

function changeNumber(event) {
    let data = tellField.value;
    data = validateData(data);
    data = devide(data, pattern);
    tellField.value = data;
}

function inputNumber(event) {
    let data = tellField.value;

    let pos = tellField.selectionStart;
    let last = data.indexOf('_');
    last = last > 0 ? last : data.length;

    // in middle string
    if (pos < last) {
        return;
    }

    data = validateData(data);
    data = devide(data, pattern);
    tellField.value = data;

    // move cursor
    let position = getCursorPosition(data);
    tellField.setSelectionRange(position, position);
}

function keydownNumber(event) {
    if  (event.keyCode !== 8) {
        return;
    }

    if (window.getSelection().toString()) {
        return;
    }

    let data = tellField.value;
    let pos = tellField.selectionStart;
    let last = data.indexOf('_');
    last = last > 0 ? last : data.length;

    // in middle string
    if (pos < last) {
        return;
    }

    data = validateData(data);
    data = data.substring(0, data.length - 1)
    data = devide(data, pattern);
    tellField.value = data;
}

function validateData(data) {
    let result = data.replace(/[^0-9]/g, '');

    // russian region
    if (result[0] == 8) {
        result = result.replace(8,7);
    } else if (result[0] == 9) {
        result = 7 + result;
    }

    return result;
}

function devide(data, mask) {
    let result = mask;
    
    for(let i = 0; i < data.length; i++) {
        result = result.replace('_', data[i]);
    }

    return result;
}

/**
 * Correct cursor position
 */
function getCursorPosition(data) {
    let position = data.indexOf('_');
    if (position > 0) {
        return position;
    }

    return data.length;
}