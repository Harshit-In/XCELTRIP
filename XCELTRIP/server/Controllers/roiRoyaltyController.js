const { sendMonthlyRoyalty } = require("../functions/roi_royalty");

async function sendRoyalty(req, res) {
  try {
    await sendMonthlyRoyalty();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function sendRoi(req, res) {
  try {
    await sendMonthlyRoi();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
    sendRoi,
    sendRoyalty
}
