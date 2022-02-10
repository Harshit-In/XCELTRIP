const mongoose = require("mongoose");

const ForgotOtpSchema = new mongoose.Schema(
  {
    member_id: { type: String },
    otp:{ type: Number, required: true, default: 0},
  },
  { timestamps: true, collection: "ForgotOtp" }
);

module.exports = mongoose.model("ForgotOtp", ForgotOtpSchema);
