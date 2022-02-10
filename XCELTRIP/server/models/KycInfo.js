const mongoose = require("mongoose");

const KycInfoSchema = new mongoose.Schema(
  {
    member_id: { type: String },
    member_photo: { type: String, required: true },
    aadhar_number: { type: Number, required: true, default: 0 },
    front_aadhar_photo: { type: String, required: true },
    back_aadhar_photo:{ type: String, required: true } ,
    passbook_photo: { type: String, required: true },
    pan_number: { type: String, default: 0 },
    pan_photo: { type: String, },
    kycStates: { type: Number, default: 0 },
  },
  { timestamps: true, collection: "KycInfo" }
);

module.exports = mongoose.model("KycInfo", KycInfoSchema);
