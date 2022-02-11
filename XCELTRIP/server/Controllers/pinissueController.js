const { findparent, UpdateAllParent } = require("../functions/function");
const { updateUserInfo } = require("./userController");

async function creacteTopup(req, res) {
  const User = require("../models/user");
  try {
    const { member_id, amount } = req.body;
    const user = await User.findOne({ member_id: member_id });
    if (user) {
      if (amount % 100 != 0) {
        return res
          .status(400)
          .json({ message: "Please Enter a valid amount " });
      }
      if (user.pin_wallet >= amount) {
       await User.updateOne(
          { member_id: user.member_id },
          {
            $set: {
              pin_wallet: parseInt(user.pin_wallet) - parseInt(amount),
              coin_wallet: parseInt(user.coin_wallet) + parseInt(amount),
              status: 1,
            },
          }
        )
        console.log(user.sponsor_id, user.level, amount)
        await UpdateAllParent(member_id, 1, amount);
        await referalCommition(user.sponsor_id, amount);
        await createCashbackSchema(member_id, amount);
        return res.status(200).json({ message: "Topup successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Insufficient Account Balance " });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Topup successfully" });
  }
}

async function referalCommition(sponsor_id, pin_amount) {
  try {
    console.log(sponsor_id, pin_amount)
    const User = require("../models/user");
    const percentage = [10, 15, 20, 25, 30];
    const sponser = await User.findOne({ member_id: sponsor_id });
    const sponser_per = (percentage[(sponser.level)-1]);
    const sponser_profite = pin_amount / sponser_per;

    await User.updateOne(
      { member_id: sponsor_id },
      {
        $set: {
          coin_wallet:
            parseInt(sponser.coin_wallet) + parseInt(sponser_profite),
        },
      }
    );
  } catch (error) {
    console.log("Error From referalCommition", error.message);
  }
}

async function createCashbackSchema(member_id, amount) {
  try {
    const Cashback = require("../models/cashback");
    const monthly_cashback = amount * 0.025;

    const cash = new Cashback({
      member_id: member_id,
      plan_amount: amount,
      total_cashback: monthly_cashback * 18,
      monthly_cashback: monthly_cashback,
      duration: 18,
    });

    cash.save((error, data) => {
      if(error){
        console.log("error from: pinissueController >> createCashbackSchema", error.message)
      }
      if(data){
        console.log("Cashback Schema create successfully", data)
      }
    });
  } catch (error) {
    console.log("Error from: createCashbackSchema", error.message);
  }
}

async function fundTransferUserToUser(req, res) {
  try {
    const User = require("../models/user");
    const { amount, member_id } = req.body;
    const user = await User.findOne({ member_id: member_id });
    await User.updateOne(
      { member_id: member_id },
      {
        $set: {
          pin_wallet: Number(user.pin_wallet) + Number(amount),
        },
      }
    );
    return res.status(200).json({ message: "Fund transfer successfully" });
  } catch (error) {
    console.log(
      "Error From: pinissueController  >> fundTransferUserToUser",
      error.message
    );
    return res.status(400).json({ message: "Somthing went Wrong" });
  }
}

module.exports = {
  creacteTopup,
  fundTransferUserToUser,
};
