const { sendMonthlyRoyalty, sendMonthlyROI } = require("../functions/roi_royalty");

async function sendRoyalty(req, res) {
  try {
    await sendMonthlyRoyalty();
    return res.status(200).json({message:"ROI has been sent successfully."});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function sendRoi(req, res) {
  try {
    await sendMonthlyROI();
    return res.status(200).json({message:"Royalty has been sent successfully."});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
    sendRoi,
    sendRoyalty
}
