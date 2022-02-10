const mongoose = require("mongoose");

const cashbackSchema = new mongoose.Schema(
    {
        member_id: { type: String },
        cashback_date: { type: Date, unique: true },
        duration: { type: Number, default: 18 },
        paidMonth: {  type: Number, default: 0 },
        amount: {  type: Number, default: 0 },
    },
    { timestamps: true, collection: "cashback" }
);

module.exports = mongoose.model("cashback", cashbackSchema);
