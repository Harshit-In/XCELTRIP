const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    pin_prise: { type: Number, default:0},
    coin_wallet: { type: Number, default:0},
    level: { type: Number, default:0}
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
