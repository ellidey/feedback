
const form = document.querySelector('.feedback');
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const telephone = form.querySelector('#telephone');
const date = form.querySelector('#date');
const question = form.querySelector('#question');
const sendButton = form.querySelector('#sendform');


export function initSend() {
    sendButton.addEventListener('click', clickSendButton);
}

function clickSendButton(event) {
    if (validateForm()) {
        console.log('Отправляем сообщение');
    }
}

function validateForm() {
    let result = true;

    name.parentElement.classList.remove('error');
    if (!name.value) {
        sendErrorValidate(name, 'Вы не ввели имя'); 
        result = false;
    }

    email.parentElement.classList.remove('error');
    if (!email.value) {
        sendErrorValidate(email, 'Вы не ввели email'); 
        result = false;
    } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        sendErrorValidate(email, 'Неверный формат email'); 
        result = false;
    }

    telephone.parentElement.classList.remove('error');
    if (!telephone.value) {
        sendErrorValidate(telephone, 'Вы не ввели номер телефона'); 
        result = false;
    } else if (telephone.value.includes('_')) {
        sendErrorValidate(telephone, 'Номер телефона неполный'); 
        result = false;
    }

    date.parentElement.classList.remove('error');
    if (!date.innerHTML) {
        sendErrorValidate(date, 'Вы не ввели дату рождения'); 
        result = false;
    }

    question.parentElement.classList.remove('error');
    if (!question.value) {
        sendErrorValidate(question, 'Вы не ввели вопрос'); 
        result = false;
    }

    return result;
}

function sendErrorValidate(element, text) {
    let parent = element.parentElement;
    parent.classList.add('error');
    parent.querySelector('.feedback__error').innerHTML = text;
}