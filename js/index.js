"use strict";

import { setPattern } from './phone.js';
import { correctFileds } from './fields.js';

window.addEventListener('load', (event) => {
    setPattern();
    correctFileds();
});