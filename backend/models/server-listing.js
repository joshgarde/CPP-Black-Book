'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serverListingSchema = new Schema({
  id: { type: Schema.ObjectId },
  name: { type: String },
  invite: { type: String, minLength: 10, maxLength: 10 }
}));

module.exports = mongoose.model('ServerListing', serverListingSchema);
