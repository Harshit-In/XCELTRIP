const mongoose = require("mongoose");

const withdrawlRequestSchema = new mongoose.Schema(
  {
    member_id: { type: String, required:true, unique: true },
    amount: { type: Number, required:true, default: 0 },
    wallet_type: { type: String, required:true, default: "" },
    is_approved: { type: Boolean, default: false },
  },
  { timestamps: true, collection: "withdrawlRequests" }
);

module.exports = mongoose.model("withdrawlRequests", withdrawlRequestSchema);
