const mongoose = require("mongoose");
const admin = new mongoose.Schema({
    admin_name: { type: String },
    owner_address: { type: String },
    email: { type: String },
    hash_password: { type: String, required: true },
    admin_wallet: { type: Number, default: 0.00},
    repurchase_wallet: { type: Number, default: 0.00},

}, {timestamps: true, collection:'Admin'})


module.exports = mongoose.model('Admin', admin);        

admin.methods = {
    authenticate: async function (password) {
        //return await bcrypt.compare(password, this.hash_password);
        return password == this.password;
    },
};


