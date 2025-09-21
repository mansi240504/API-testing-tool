const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  url: { type: String, required: true },
  method: { type: String, required: true },
  headers: { type: Object },
  body: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
