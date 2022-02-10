const { findparent, UpdateAllParent } = require("../functions/function");
const user = require("../models/user");
const { updateUserInfo } = require("./userController");

function creacteTopup(req, res) {
  const User = require("../models/user");
  try {
    const { member_id, amount } = req.body;
    User.findOne({ member_id: member_id }).then((error, user) => {
      if (error)
        return res.status(400).json({ message: "Somthing went wrong" });

      if (user) {
        if (amount / 100 != 0) {
          return res
            .status(400)
            .json({ message: "Please Enter a valid amount " });
        }
        if (user.pin_wallet >= amount) {
          User.updateOne(
            { member_id: user.member_id },
            {
              $set: {
                pin_wallet: parseInt(user.pin_wallet) - parseInt(amount),
                coin_wallet: parseInt(user.coin_wallet) + parseInt(amount),
                status: 1,
              },
            }
          );

          UpdateAllParent(member_id, 1, amount);
          referalCommition(sponser_id, user_lavel, pin_amount);
          createCashbackSchema(member_id, amount)
          activationHestory(pin_wallet, coin_wallet);
          
          return res.status(200).json({ message: "Topup successfully" });
        }
      }
    });
  } catch (error) {
    return res.status(400).json({ message: "Topup successfully" });
  }
}

async function referalCommition(sponser_id, user_lavel, pin_amount) {
  try {
    const User = require("../models/user");
    const percentage = [10, 15, 20, 25, 30];
    const sponser_per = percentage[user_lavel];
    const sponser_profite = pin_amount / sponser_per;
    const sponser = await User.findOne({ member_id: sponser_id });
    User.updateOne(
      { member_id: sponser_id },
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
    })

    cash.save((error, data) => {
    })
  } catch (error) {
    console.log("Error from: createCashbackSchema", error.message)
  }
}
