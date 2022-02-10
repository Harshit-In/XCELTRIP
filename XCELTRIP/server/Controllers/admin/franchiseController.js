const Franchise = require("../../models/franchise");
const Package = require("../../models/adminProduct");
const { unique_id } = require("../../functions/function");
const jwt = require("jsonwebtoken");

async function addFranchise(req, res) {
  const {
    franchise_name,
    wallet_amt,
    products,
    username,
    password,
    owner_name,
    products_qunt,
    state,
    city,
    pincode,
  } = req.body;
  /* const franchise = Franchise.findOne({ franchise_name: req.body.franchise_id ? req.body.franchise_name:''});
  if (franchise) {
    return res.status(200).json({ message: " This franchise already created" });
  } */

  const new_id = await unique_id();
  const _franchise = new Franchise({
    franchise_id: new_id,
    franchise_name,
    products,
    wallet_amt,
    products_qunt,
    username,
    password,
    state,
    city,
    pincode,
    owner_name,
  });
  _franchise.save((error, data) => {
    if (error) {
      console.log(error);
      return res.status(400).json({
        message: "Somthing went wrong",
        error: error.message,
      });
    }
    if (data) {
      return res.status(201).json({
        message: "Franchise successfully Created",
      });
    }
  });
}

async function getFranchise(req, res) {
  //const {state } = req.body;
  Franchise.find(req.body).exec((error, Franchise) => {
    if (error) return res.status(400).json({ error });
    if (Franchise) return res.status(200).json({ Franchise });
  });
}

async function deleteFranchise(req, res) {
  try {
    Franchise.findOneAndDelete({ _id: req.body.id }).then(
      (franchise, error) => {
        if (error) res.status(400).json({ message: error.message });
        res.status(200).json(franchise);
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function franchise_signin(req, res) {
  Franchise.findOne(req.body).exec(async (error, franchise) => {
    if (error) return res.status(400).json({ error });
    if (franchise) {
      if (franchise.password == req.body.password) {
        const { _id, franchise_id, franchise_name } = franchise;
        const token = jwt.sign(
          {
            _id: franchise._id,
            franchise_id: franchise.franchise_id,
            franchise_name: franchise.franchise_name,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        return res.status(200).json({
          token,
          franchise,
          /* franchise: {
              _id, franchise_id, franchise_name
          } */
        });
      } else {
        return res.status(400).json({
          message: "Invalide username and password",
        });
      }
    } else {
      return res.status(400).json({
        message: "Invalide username and password",
      });
    }
  });
}

async function change_password_franchise(req, res) {
  const Franchise = require("../../models/franchise");
  const { franchise_id, pass, confirm_pass } = req.body;
  if (pass == confirm_pass) {
    const chk = await Franchise.updateOne(
      { franchise_id: franchise_id },
      {
        $set: {
          password: confirm_pass,
        },
      }
    );
    if (chk.modifiedCount > 0) {
      res
        .status(200)
        .json({ message: "Franchise Password Successfully Updated" });
    } else {
      res.status(400).json({ message: "Franchise Id Do Not Match" });
    }
  } else {
    res.status(400).json({ message: "Password Do not Match" });
  }
}

async function updateFranchise(req, res) {
  const Franchise = require("../../models/franchise");
  try {
    const {
      franchise_id,
      franchise_name,
      username,
      password,
      state,
      city,
      pincode,
    } = req.body;
    Franchise.updateOne(
      { franchise_id: franchise_id },
      {
        $set: {
          franchise_name: franchise_name,
          products_qunt: products_qunt,
          wallet_amt: wallet_amt,
          owner_name: owner_name,
          username: username,
          password: password,
          state: state,
          city: city,
          pincode: pincode,
        },
      }
    );
    return res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    console.log("error from: change_password_franchise", error.message);
    return res.status(400).json({ message: "somthing went wrong" });
  }
}
// async function addFranchiseProduct(req, res) {
//     const { package_name, package_price, package_items, decription, createdBy} = req.body

//     let packagePictures = [];

//     if(req.files.length > 0){
//         packagePictures = req.files.map(file => {
//             return { img: file.filename }
//         })
//     }
//     const new_id = await unique_id();
//     const package = new Package({
//         package_id: new_id,
//         package_name,
//         slug: slugify(package_name),
//         package_price,
//         package_items,
//         decription,
//         packagePictures,
//         createdBy: req.user._id
//     });
//     package.save((error, package) => {
//         if(error) return res.status(200).json({error})
//         if(package){
//             res.status(201).json({ package })
//         }
//     })
// }

async function getFranchisePage(req, res) {
  const { per_page, page } = req.body;
  const totalData = await Franchise.count();
  Franchise.find({})
    .limit(per_page)
    .skip((page - 1) * per_page)
    .then((result) => {
      res.status(200).send({ data: result, totalData });
    })
    .catch((error) => {
      console.log("error from: getFranchisePage", error.message);
      res.status(400).send({ message: "somthing went wrong" });
    });
}

async function franchise_kyc(req, res) {
  try {
    const franchiseBankDetail = require("../../models/franchise");
    const { franchise_id } = req.body;
    console.log(franchise_id)
    
    const {
      aadhar_number,
      member_dob,
      account_no,
      bank_name,
      bank_city,
      bank_state,
      ifsc_code,
      branch_name,
      pan_no,
      kyc_status,
    } = req.body;

    const dd = await franchiseBankDetail.updateOne(
      { franchise_id: franchise_id },
      {
        $set: {
          aadhar_number: aadhar_number,
          member_dob: member_dob,
          account_no: account_no,
          bank_name: bank_name,
          bank_city: bank_city,
          bank_state: bank_state,
          ifsc_code: ifsc_code,
          branch_name: branch_name,
          pan_no: pan_no,
          kyc_status: 1,
        },
      }
    );
    console.log(dd)
    return res.status(200).json({
      message: "Bank Details Update successfully",
    });
  } catch (error) {
    console.log(
      "Error from: franchiseController >> franchise_kyc",
      error.message
    );
    return res.status(400).json({ message: "Somthing went Wrong" });
  }
}

async function franchiseWithdrawl(req, res) {
  try {
    const franchisePay = require("../../models/paytofranchise")
    const { franchise_id, amount } = req.body
    const franchise = await Franchise.findOne({ franchise_id: franchise_id, kyc_status: 1 });
    console.log(franchise)
    await Franchise.updateOne(
      { franchise_id: franchise_id },
      {
        $set: {
          wallet_amt: parseFloat(franchise.wallet_amt) - parseFloat(amount),
          withdrawl: parseFloat(franchise.withdrawl?franchise.withdrawl:0) + parseFloat(amount),
        },
      }
    );
    const fund = new franchisePay({
      franchise_id: franchise_id,
      franchise_name: franchise.franchise_name,
      payable_amount: parseInt(amount),
      date: (new Date()).toISOString(),
    });
    fund.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Somthing went wrong",
          error: error.message,
        });
      }
      if (data) {
        return res.status(200).json({
          data: data,
          message: "franchise fund substract successfully",
        });
      }
    });
  } catch (error) {
    console.log("Error frome: controller >> adduserwalletfund", error);
    return res.status(400).json({ error: error.message });
  }
}


async function getFranchiseWithdrawl(req, res) {
  try {
    const franchisePay = require("../../models/paytofranchise")
    const pay = await franchisePay.find(req.body);
    return res.status(200).json({ Data: pay });
  } catch (error) {
    console.log(
      "Error from: controller>> franchiseController >> getFranchiseWithdrawl",
      error.message
    );
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}


module.exports = {
  getFranchise,
  // addFranchiseProduct,
  addFranchise,
  franchise_signin,
  change_password_franchise,
  getFranchisePage,
  updateFranchise,
  deleteFranchise,
  franchise_kyc,
  franchiseWithdrawl,
  getFranchiseWithdrawl
};
