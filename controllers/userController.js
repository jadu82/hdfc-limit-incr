// controllers/userController.js
const User = require('../models/User');

exports.saveUserData = async (req, res) => {
  try {
    const { name, mobileNumber, panNumber, dob, uniqueid } = req.body;
    let user = await User.findOne({ uniqueid });

    if (user) {
      // Existing user: append new entry
      user.entries.push({ name, mobileNumber, panNumber, dob });
    } else {
      // New user document
      user = new User({
        uniqueid,
        entries: [{ name, mobileNumber, panNumber, dob }]
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User Data Submitted Successfully!"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while submitting user data"
    });
  }
};
