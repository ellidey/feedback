const datePicker = document.querySelector('.datepicker');
const datePickerBtnOpen = document.querySelector('.datepicker-open');
const datePickerPrev = document.querySelector('.datepicker__prev');
const datePickerNext = document.querySelector('.datepicker__next');
const datePickerCurrentYearPrev = document.querySelector('.datepicker__current-year-prev');
const datePickerCurrentYear = document.querySelector('.datepicker__current-year-content');
const datePickerCurrentYearNext = document.querySelector('.datepicker__current-year-next');
const datePickerCurrentMonth = document.querySelector('.datepicker__current-month');
const datePickerDays = document.querySelector('.datepicker__days');

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 
                'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 
                'Октябрь', 'Ноябрь', 'Декабрь']

const date = new Date();
const currentDate = {
    month: 0,
    year: date.getFullYear() - 7,
}

export function initDatePicker() {
    datePickerBtnOpen.addEventListener('focus', clickBtnOpen);
    document.addEventListener('click', clickDocument)
    datePickerNext.addEventListener('click', clickNext);
    datePickerPrev.addEventListener('click', clickPrev);
    datePickerCurrentYearPrev.addEventListener('click', clickPrevYear);
    datePickerCurrentYearNext.addEventListener('click', clickNextYear);

    datePickerCurrentMonth.innerHTML = months[currentDate.month];
    datePickerCurrentYear.innerHTML = currentDate.year;
    updateNumberDays();
}

function clickBtnOpen(event) {
    datePicker.classList.add('active');
    datePickerBtnOpen.classList.add('active');
}

function clickDocument(event) {
    let target = event.target;
    if(target != datePicker 
        && !datePicker.contains(target) 
        && target != datePickerBtnOpen) {
        closeDataPicker();
    }
}

function closeDataPicker() {
    datePicker.classList.remove('active');

    if (!datePickerBtnOpen.innerHTML) {
        datePickerBtnOpen.classList.remove('active');
    }
}

function clickNext(event) {
    let month = currentDate.month + 1;

    if (month > 11) {
        month = 0;
        nextYear();        
    }

    datePickerCurrentMonth.innerHTML = months[month];
    currentDate.month = month;
    updateNumberDays();
}

function clickPrev(event) {
    let month = currentDate.month - 1;

    if (month < 0) {
        month = 11;
        prevYear();
    }

    datePickerCurrentMonth.innerHTML = months[month];
    currentDate.month = month;
    updateNumberDays();
}

function clickPrevYear(event) {
    prevYear();
    updateNumberDays();
}

function clickNextYear(event) {
    nextYear();
    updateNumberDays();
}

function prevYear() {
    let year = currentDate.year - 1;

    if (year < 1700) {
        return;
    }

    datePickerCurrentYear.innerHTML = year;
    currentDate.year = year;
}

function nextYear() {
    let year = currentDate.year + 1;

    if (year > date.getFullYear()) {
        return;
    }

    datePickerCurrentYear.innerHTML = year;
    currentDate.year = year;
}

function updateNumberDays() {
    var count = new Date(currentDate.year, currentDate.month + 1, 0).getDate() + 1;

    datePickerDays.innerHTML = '';
    for (let i = 1; i < count; i++) {
        let day = document.createElement('div');
        day.innerHTML = i;
        day.classList.add('datapicker__day');
        datePickerDays.append(day);
        day.addEventListener('click', clickDay);
    }
}

function clickDay(event) {
    let target = event.currentTarget;
    document.querySelectorAll('.datapicker__day').forEach(element => {
        element.classList.remove('active');
    })
    target.classList.add('active');
    let day = +target.innerHTML;
    day = day > 9 ? day : '0' + day;
    let month = currentDate.month + 1;
    month = month > 9 ? month : '0' + month;
    let result = `${day}.${month}.${currentDate.year}`;
    datePickerBtnOpen.innerHTML = result;
    closeDataPicker();
}