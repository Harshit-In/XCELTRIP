const mongoose = require("mongoose");

const cashback_historySchema = new mongoose.Schema(
    {
        cashback_date: { type: Date, unique: true },
        total_cashback_paid: { type: Number, default: 0 },
        total_members_count: { type: Number, default: 0 },
        all_members_id: [{ type: String }],
    },
    { timestamps: true, collection: "cashback_history" }
);

module.exports = mongoose.model("cashback_history", cashback_historySchema);
