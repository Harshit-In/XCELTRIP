const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    member_id: { type: String, unique: true },
    member_name: { type: String },
    sponsor_id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash_password: { type: String, required: true },
    coin_wallet: { type: Number, default:0},
    income_wallet: { type: Number, default:0},
    level: { type: Number, default:0},
    status: { type: Number, default: 0},
    direct_coin: { type: Number, default: 0 },
    total_coin: { type: Number, default: 0},
    direct_members: { type: Number, default: 0 },
    total_members: { type: Number, default: 0 },
    activation_date: {  type: Date, default:(new Date()).toISOString() }


  },
  { timestamps: true, collection: "user" }
);

// userSchema.virtual('password')
//   .set(function (password) {
//     this.hash_password = bcrypt.hashSync(password, 10)
//   })

// userSchema.methods = {
//   authenticate: async function (password) {
//     return this.hash_password === password;
//   },
// };
module.exports = mongoose.model("User", userSchema);
