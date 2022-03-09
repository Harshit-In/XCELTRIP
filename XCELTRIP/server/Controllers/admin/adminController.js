const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../../models/user");

async function signup(req, res) {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res.status(400).json({ message: "user already registered" });

    const { email, password, conform_password } = req.body;
    if (password !== conform_password) {
      return res.status(400).json({
        message: "Enter same password",
      });
    }
    const hash = await bcrypt.hash(password, 10);
    const _admin = new Admin({
      email,
      hash_password: hash,
    });

    _admin.save((error, data) => {
      if (error) {
        console.log("Error from: adminController >> signup", error.message);
        return res.status(400).json({
          message: "Somthing went wrong",
          error: error.message,
        });
      }
      if (data) {
        // sendMobileOtp(contact, message)
        return res.status(200).json({
          message: "user created successfully",
          data: data,
        });
      }
    });
  } catch (error) {
    console.log("Error from userController >> signup: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function signin(req, res) {
  try {
    Admin.findOne({ email: req.body.email }).then(async (admin, error) => {
      if (error) return res.status(400).json({ error });
      if (admin) {
        let isValid = bcrypt.compareSync(
          req.body.password,
          admin.hash_password
        );
        if (isValid) {
          const { _id, email } = admin;
          const token = jwt.sign(
            { _id: admin._id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          return res.status(200).json({
            token,
            admin: {
              _id,
              email,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalide username and password",
          });
        }
      } else {
        return res.status(400).json({
          message: "Incorrect credentials, user not found.",
        });
      }
    });
  } catch (error) {
    console.log("Error from adminController >> signin: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function userInfo(req, res) {
  const User = require("../../models/user");
  try {
    const { member_id, startDate, endDate } = req.body;
    if (member_id) {
      User.findOne({ member_id: member_id }).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          const directChild = await User.find({ sponsor_id: member_id }).sort({
            createdAt: -1,
          });
          return res.status(200).json({ data, directChild });
        }
      });
    } else {
      User.find({}).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          return res.status(200).json({ data });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> signin ",
      error: error.message,
    });
  }
}

async function getIncomeHistory(req, res) {
  const History = require("../../models/History");
  try {
    const { member_id } = req.body;
    if (member_id) {
      History.find(req.body).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          return res.status(200).json({ data });
        }
      });
    } else {
      History.find({}).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          return res.status(200).json({ data });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> signin ",
      error: error.message,
    });
  }
}

async function getFundTransferHistory(req, res) {
  const fundHistory = require("../../models/fundTransfer");
  try {
    const { from, to } = req.body;
    if (from || to) {
      fundHistory.find(req.body).then(async (data, error) => {
        if (error) return res.status(400).json({ error: error });
        if (data) {
          return res.status(200).json({ data });
        }
      });
    } else {
      fundHistory.find({}).then(async (data, error) => {
        if (error) return res.status(400).json({ error: error });
        if (data) {
          return res.status(200).json({ data });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> signin ",
      error: error.message,
    });
  }
}

async function getDashboardData(req, res) {
  const UserModal = require("../../models/user");
  const HistoryModal = require("../../models/History");
  const levelWiseMemberCount = await UserModal.aggregate([
    {
      $group: {
        _id: { level: "$level" },
        memberLevel: { $first: "$level" },
        membersCount: { $sum: 1 },
      },
    },
  ]);
  const membersCount = await UserModal.aggregate([
    {
      $group: {
        _id: { level: "$status" },
        memberStatus: { $first: "$status" },
        membersCount: { $sum: 1 },
      },
    },
  ]);
  const totalInvestment = await UserModal.aggregate([
    {
      $group: {
        _id: null,
        totalInvestment: { $sum: "$investment" },
      },
    },
  ]);

  const totalWidthdrawl = await UserModal.aggregate([
    { $match: { income_type: "widthdrawl" } },
    {
      $group: {
        _id: null,
        totalWidthdrawl: { $sum: "$amount" },
      },
    },
  ]);
  return res.status(200).json({
    levelWiseMemberCount,
    membersCount,
    totalInvestment,
    totalWidthdrawl,
  });
}

async function generateDailyCashback() {
  try {
    const CashbackHistory = require("../../models/cashback");
    const cashback_date = new Date();
    cashback_date.setUTCHours(0, 0, 0, 0);
    const isCashbackSentToday =
      (await CashbackHistory.find({
        cashback_date: { $eq: cashback_date },
      }).count()) > 0;
    if (isCashbackSentToday) {
      console.log(
        `Can't send cashback more than once in a day. date ${cashback_date}`
      );
    } else {
      const Cashback = require("../../models/chackback");
      const User = require("../../models/user");
      const chackback = await Cashback.find({ paidMonth: { $lt: 18 } });
      const incomeType = "chackback";
      let a = chackback.map(async(data) => {
        await Cashback.updateOne(
          { member_id: member_id },
          {
            $set: {
              paidMonth: data.paidMonth + 1,
            },
          }
        )
          .then(async () => {
            await User.updateOne(
              { member_id: member_id },
              {
                $set: {
                  cashback_wallet:
                    data.monthly_cashback + data.monthly_cashback,
                },
              }
            );
          })
          .then(async () => {
            await createIncomeHistory(
              user.member_id,
              user.monthly_cashback,
              incomeType
            );
          });
      });
      Promise.all(a).then(async (d) => {
        console.log(`Cashback generated successfully.`);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  signup,
  signin,
  userInfo,
  getIncomeHistory,
  getFundTransferHistory,
  getDashboardData,
  generateDailyCashback
};
