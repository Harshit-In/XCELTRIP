const {
  findparent,
  UpdateAllParent,
  createIncomeHistory,
} = require("../functions/function");
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
      if (user.coin_wallet >= amount) {
        await User.updateOne(
          { member_id: user.member_id },
          {
            $set: {
              coin_wallet: parseInt(user.coin_wallet) - parseInt(amount / 2),
              income_wallet:
                parseInt(user.income_wallet) + parseInt(amount / 2),
              activation_date: new Date().toISOString(),
              status: 1,
            },
          }
        );
        const incomeType = "Topup Income";
        await UpdateAllParent(member_id, 1, amount);
        await referalCommition(member_id, user.sponsor_id, amount);
        await createCashbackSchema(member_id, amount);
        await createIncomeHistory(user.member_id, amount, incomeType);
        return res.status(200).json({ message: "Topup successfully" });
      } else {
        return res
          .status(400)
          .json({ message: "Insufficient Account Balance" });
      }
    }
  } catch (error) {
    return res.status(400).json({ message: "Topup successfully" });
  }
}

async function referalCommition(member_id, pin_amount) {
  try {
    const User = require("../models/user");
    const user = await User.findOne({member_id: member_id})
    const getAllParent = await incomDistribute(member_id);
    const incomeType = "Incom from downline"
    console.log("getAllParent", getAllParent);
    getAllParent.map(async (data, index) => {
      const percentage = [5, 10, 15, 20, 25, 30];
      if (index == 0) {
        console.log(percentage[data.level]);
        const sponser_per = percentage[data.level];
        const sponser_profite = pin_amount / sponser_per;
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              income_wallet:
                parseInt(user.income_wallet) + parseInt(sponser_profite),
            },
          }
        );
        await createIncomeHistory(member_id, amount, incomeType)
      } else {
        console.log(
          percentage[data.level] - percentage[getAllParent[index - 1].level]
        );
        const sponser_per = percentage[data.level] - percentage[getAllParent[index - 1].level];
        const sponser_profite = pin_amount / sponser_per;
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              income_wallet:
                parseInt(user.income_wallet) + parseInt(sponser_profite),
            },
          }
        );
        await createIncomeHistory(member_id, amount, incomeType)

      }

    });
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
      if (error) {
        console.log(
          "error from: pinissueController >> createCashbackSchema",
          error.message
        );
      }
      if (data) {
        console.log("Cashback Schema create successfully");
      }
    });
  } catch (error) {
    console.log("Error from: createCashbackSchema", error.message);
  }
}

async function fundTransferUserToUser(req, res) {
  try {
    const User = require("../models/user");
    const { amount, user_id, downline_id } = req.body;
    const downline = await User.findOne({ member_id: downline_id });
    const user = await User.findOne({ member_id: user_id });
    findparent(downline_id).then(async (data) => {
      data.map(async (a) => {
        if (a.member_id == user_id) {
          await User.updateOne(
            { member_id: downline_id },
            {
              $set: {
                coin_wallet: Number(downline.coin_wallet) + Number(amount),
              },
            }
          );
          await User.updateOne(
            { member_id: user_id },
            {
              $set: {
                coin_wallet: Number(user.coin_wallet) - Number(amount),
              },
            }
          );
        }
      });
    });

    return res.status(200).json({ message: "Fund transfer successfully" });
  } catch (error) {
    console.log(
      "Error From: pinissueController  >> fundTransferUserToUser",
      error.message
    );
    return res.status(400).json({ message: "Somthing went Wrong" });
  }
}

async function incomDistribute(member_id) {
  const User = require("../models/user");
  try {
    const data = await User.aggregate([
      { $match: { member_id: member_id } },
      {
        $graphLookup: {
          from: "user",
          startWith: "$member_id",
          connectFromField: "sponsor_id",
          connectToField: "member_id",
          depthField: "ParentNo",
          as: "referal",
        },
      },
      {
        $project: {
          member_id: 1,
          sponsor_id: 1,
          "referal.level": 1,
          "referal.member_id": 1,
          "referal.ParentNo": 1,
        },
      },
    ]);

    if (data && data.length > 0) {
      console.log(data);
      // return data;

      const referalData = data[0].referal;
      referalData.sort((a, b) => {
        a.ParentNo > b.ParentNo ? 1 : -1;
      });
      let distinctData = [];
      let lastPaidLevel = null;
      for (num of referalData) {
        if (num.level > lastPaidLevel) {
          lastPaidLevel = num.level;
          distinctData.push(num);
        }
      }
      // console.log("distinctData: ", distinctData)
      return distinctData.filter((item) => item.ParentNo > 0);
    } else {
      // console.log("Hello")
      return [];
    }
  } catch (error) {
    //getDirectAndtotalmember
    console.log(
      "Error from functions >> function >> findparent: ",
      error.message
    );
  }
}
module.exports = {
  creacteTopup,
  referalCommition,
  fundTransferUserToUser,
};
