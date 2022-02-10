const mongoose = require("mongoose");

const withdrwal_requestSchema = new mongoose.Schema(
  {
    member_id :{ type: String, },
    member_name:{ type: String, },
    total_amt : { type: Number, default: 0},
    admin_per : { type: Number, default: 0},
    admin_amt : { type: Number,  default: 0},
    tds_per : { type: Number, default: 0},
    tds_amt : { type: Number,  default: 0},
    net_amt : { type: Number, default: 0},
    request_date:{ type: String, trim: true},
    req_status : { type: String,  default: '0'},
    pay_date:{ type: String },
    request_ref :{ type: String },
    remark :{ type: String },
    responce :{ type: String, required: true, trim: true},
    orderid :{ type: String,  trim: true},
    message :{ type: String, required: true, trim: true},
    client_id :{ type: String, required: true, trim: true},
    bank_name :{ type: String, required: true, trim: true},
    holder_f_name :{ type: String, required: true, trim: true},
    holder_l_name :{ type: String, required: true, trim: true},
    account_no : { type: Number, required: true, default: 0},
    ifsc_code :{ type: String, required: true, trim: true},
    pan_no :{ type: String },
    
  },
  { timestamps: true, collection: "withdrwal_request" }
);




module.exports = mongoose.model("withdrwal_request", withdrwal_requestSchema);




