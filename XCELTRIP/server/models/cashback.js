const mongoose = require("mongoose");

const cashbackSchema = new mongoose.Schema(
    {
        member_id: { type: String },
        duration: { type: Number, default: 18 },
        plan_amount: {  type: Number, default: 0 },
        total_cashback: { type: Number, default:0},
        paidMonth: {  type: Number, default: 0 },
        total_cashback: {  type: Number, default: 0 },
        cashback_date: { type: Date, unique: true },

    },
    { timestamps: true, collection: "cashback" }
);

module.exports = mongoose.model("cashback", cashbackSchema);
