"use strict";

const form = document.querySelector('.feedback');
const name = form.querySelector('#name');
const email = form.querySelector('#email');
const telephone = form.querySelector('#telephone');
const date = form.querySelector('#date');
const question = form.querySelector('#question');
const sendButton = form.querySelector('#sendform');

const message = form.querySelector('.feedback__message');

export function initSend() {
  sendButton.addEventListener('click', clickSendButton);
}

function clickSendButton(event) {
  if (validateForm()) {
    sendMail();
  }
}

function sendMail() {
  var data = {
    service_id: 'service_nw5a5fw',
    template_id: 'template_2kxlrae',
    user_id: 'user_130RpN0HwyxPk7Xho6lFC',
    template_params: {
      name: name.value,
      email: email.value,
      phone: telephone.value,
      date: date.innerHTML,
      question: question.value,
    },
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
  sendButton.disabled = true;
  sendButton.innerHTML = 'Идет отправка...';
  xhr.onload = () => {
    sendButton.disabled = false;
    sendButton.innerHTML = 'Отправить';
    sendMessage('Сообщение отправлено успешно!', 'success');
  }

  xhr.onerror = () => {
    sendButton.disabled = false;
    sendButton.innerHTML = 'Отправить';
    sendMessage('Не удалось отправить сообщение!', 'error');
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

function sendMessage(text, type) {
  message.innerHTML = text;
  message.classList.add(type);
  setTimeout(() => {
    message.innerHTML = '';
    message.classList.remove(type);
  }, 5000);
}

function sendErrorValidate(element, text) {
  let parent = element.parentElement;
  parent.classList.add('error');
  parent.querySelector('.feedback__error').innerHTML = text;
}