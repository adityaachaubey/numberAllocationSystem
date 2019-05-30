'use strict';
const mongoose = require('mongoose');
const numberCheckSchema = new mongoose.Schema({
  startNumber: {type: Number, default: 1111111111},
  endNumber: {type: Number, default: 9999999999},
  counter: {type: Number, default: 0},
  specialNumbersRequested: {type: Array, index: true},
});

const NumberCheck=mongoose.model('NumberCheck', numberCheckSchema);

module.exports = NumberCheck;
