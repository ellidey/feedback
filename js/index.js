"use strict";

import { setPattern } from './phone.js';
import { correctFileds } from './fields.js';
import { initDatePicker } from './datepicker.js';

window.addEventListener('load', (event) => {
    setPattern();
    correctFileds();
    initDatePicker();
});