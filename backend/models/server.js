'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverSchema = new Schema({
  name: { type: String, minLength: 1 },
  description: { type: String },
  inviteCode: { type: String, minLength: 7, maxLength: 12 }
});

module.exports = mongoose.model('Server', serverSchema);
