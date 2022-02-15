const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    email: { type: String },
    member_id: { type: String },
    income_type: { type: String},
    coin_wallet: { type: Number, default:0},
    income_wallet: { type: Number, default:0},
    level: { type: Number, default:0}
  },
  { timestamps: true, collection: "history" }
);

module.exports = mongoose.model("history", historySchema);
