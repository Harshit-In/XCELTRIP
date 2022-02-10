const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");
const Product = require("../../models/adminProduct");
const slugify = require("slugify");
const Franchise = require("../../models/franchise");
const {
  unique_id,
  income_history,
  findparent,
} = require("../../functions/function");
const { findOne } = require("../../models/admin");
const weekly_generated_income = require("../../models/weekly_generated_income");
const user = require("../../models/user");
const cashback_history = require("../../models/cashback_history");
const test_weekly_generated_income = require("../../models/test_weekly_generated_income");
const MatrixPlanModel = require("../../models/matrixplane");
const buy_package = require("../../models/buy_package");
// const { getSponser, getNextId, getAdminUserName } = require('../functions/function');

async function signup(req, res) {
  try {
    Admin.findOne({ email: req.body.email }).exec((error, user) => {
      if (user)
        return res.status(400).json({
          message: "user already registered",
        });
      const { admin_name, email, password } = req.body;

      const _user = new Admin({
        admin_name,
        email,
        password,
      });

      _user.save((error, data) => {
        if (error) {
          return res.status(400).json({
            message: "Somthing went wrong",
          });
        }
        if (data) {
          return res.status(201).json({
            message: "Admin created successfully",
          });
        }
      });
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> signup ",
      error: error.message,
    });
  }
}

async function signin(req, res) {
  try {
    Admin.findOne({ email: req.body.email }).exec(async (error, user) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        //const isValid = await Admin.authenticate(req.body.password)
        if (req.body.password == user.password) {
          const { email, _id, name } = user;
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });
          return res.status(200).json({
            token,
            user: {
              _id,
              email,
              name,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid username and password",
          });
        }
      } else {
        return res.status(400).json({
          message: "Invalid username and password",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> signin ",
      error: error.message,
    });
  }
}

async function addAdminProduct(req, res) {
  try {
    const {
      product_name,
      product_price,
      discount,
      products,
      description,
      role,
      quantity,
      selling_price,
    } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
      productPictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }
    const new_id = await unique_id();
    const product = new Product({
      product_id: new_id,
      product_name: product_name,
      slug: slugify(product_name),
      product_price,
      discount,
      quantity,
      products,
      selling_price,
      role,
      description,
      productPictures,
    });
    product.save((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        return res.status(200).json({ product });
      }
    });
    //return res.status(200).json({ message: " Success " });
  } catch (error) {
    console.log("Error frome: controller >> adminProduct ", error.message);
    return res.status(400).json({ message: "Something went wrong." });
  }
}

async function topupFranchise(req, res) {
  try {
    const { franchise_id, wallet_amt, products_qunt } = req.body;
    const franchise = await Franchise.findOne({ franchise_id: franchise_id });
    if (franchise) {
      await Franchise.updateOne(
        { franchise_id: franchise_id },
        {
          $set: {
            wallet_amt: parseInt(franchise.wallet_amt) + parseInt(wallet_amt),
            products_qunt:
              parseInt(franchise.products_qunt) + parseInt(products_qunt),
          },
        }
      );
      return res
        .status(200)
        .json({ message: "Fund Amount updated successfully!" });
    } else {
      return res.status(400).json({ message: "Franchise not Found!!" });
    }
  } catch {
    return res.status(400).json({
      message:
        "Something went wrong >>> Controllers >> adminController >> topupFranchise",
    });
  }
}

async function getApproval(req, res) {
  const BuyPackage = require("../../models/buy_package");
  try {
    const { status } = req.body;
    BuyPackage.find({ status: status }).then(async (data, error) => {
      if (error) return res.status(200).json({ message: error });
      if (data) {
        return res.status(200).json({ data });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error frome: controller >> getApproval ",
      error: error.message,
    });
  }
}

async function userInfo(req, res) {
  const User = require("../../models/user");
  try {
    const { member_id } = req.body;
    if (member_id) {
      User.findOne({ member_id: member_id }).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          return res.status(200).json({ data });
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

async function change_password_admin(req, res) {
  try {
    const Admin = require("../../models/admin");
    const { email, pass, confirm_pass } = req.body;
    if (pass == confirm_pass) {
      const chk = await Admin.updateOne(
        { email: email },
        {
          $set: {
            password: confirm_pass,
          },
        }
      );
      if (chk.modifiedCount > 0) {
        res
          .status(200)
          .json({ message: "Admin Password Successfully Updated" });
      } else {
        res.status(400).json({ message: "Email Do Not Match" });
      }
    } else {
      res.status(400).json({ message: "Password Do not Match" });
    }
    return res.status(200).json({ message: " success" });
  } catch (error) {
    console.log("Error frome: controller >> change_password_admin ");
    return res.status(400).json({ error: error.message });
  }
}

async function getOnedayAllrecord(req, res) {
  const User = require("../../models/user");
  const week_income = require("../../models/weekly_generated_income");
  const income_history = require("../../models/income_history");
  const KycInfo = require("../../models/KycInfo");
  const BankDetail = require("../../models/bankInfo");
  const buy_package = require("../../models/buy_package");
  try {
    const oneDay_Calculate = new Date(Date.now() - 1000 * 3600 * 24);
    const oneDayUser = await User.find({
      createdAt: {
        $gt: new Date(oneDay_Calculate).toISOString(),
        $lt: new Date(Date.now()).toISOString(),
      },
    }).count();

    const level_wise_member = await User.aggregate([
      {
        $group: {
          _id: {
            level: "$level",
          },
          Total_member: { $sum: 1 },
          level: { $first: "$level" },
        },
      },
    ]);

    const one_day_week_income = await week_income.aggregate([
      {
        $match: {
          createdAt: {
            $gt: oneDay_Calculate,
          },
        },
      },
      {
        $group: {
          _id: {
            member_level: "$member_level",
          },
          total_income: { $sum: "$income" },
          member_level: { $first: "$member_level" },
        },
      },
    ]);

    const all_week_income = await week_income.aggregate([
      {
        $group: {
          _id: {
            member_level: "$member_level",
          },
          total_income: { $sum: "$income" },
          member_level: { $first: "$member_level" },
        },
      },
    ]);

    const oneDayincome_history = await income_history
      .find({
        createdAt: {
          $gt: new Date(oneDay_Calculate).toISOString(),
          $lt: new Date(Date.now()).toISOString(),
        },
      })
      .count();

    const totalcredited_amount = await income_history.aggregate([
      {
        $match: {
          createdAt: {
            $gt: oneDay_Calculate,
          },
        },
      },
      {
        $group: {
          _id: { day: { $dayOfMonth: "$createdAt" } },
          TotalSum: { $sum: "$credited_amount" },
          // incomeHistory: { $push: "$$ROOT" },
        },
      },
    ]);

    const oneDayBankDetail = await BankDetail.find({
      createdAt: {
        $gt: new Date(oneDay_Calculate).toISOString(),
        $lt: new Date(Date.now()).toISOString(),
      },
    }).count();

    const oneDaybuy_packageReq = await buy_package
      .find({
        createdAt: {
          $gt: new Date(oneDay_Calculate).toISOString(),
          $lt: new Date(Date.now()).toISOString(),
        },
        status: 0,
      })
      .count();

    const oneDaybuy_packageApproveReq = await buy_package
      .find({
        createdAt: {
          $gt: new Date(oneDay_Calculate).toISOString(),
          $lt: new Date(Date.now()).toISOString(),
        },
        status: 1,
      })
      .count();

    const Total_buy_package_amount = await buy_package.aggregate([
      {
        $match: {
          status: 1,
        },
      },
      {
        $lookup: {
          from: "adminProduct",
          localField: "product_id",
          foreignField: "product_id",
          as: "productInfo",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$productInfo", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          member_id: 1,
          product_price: 1,
          product_id: 1,
          product_name: 1,
          productInfo: 1,
        },
      },
      /* {$project: {
        product_id: 1,
        product_name: 1,
        "productInfo.product_price": 1
      }}, */
      {
        $group: {
          _id: {
            product_id: "$product_id",
          },
          product_count: { $sum: 1 },
          product_name: { $first: "$product_name" },
          product_price: { $first: "$product_price" },
          total_purchase_income: { $sum: "$product_price" },
        },
      },
    ]);

    return res.status(200).json({
      oneDayUser: oneDayUser,
      oneDayincome_history: oneDayincome_history,
      totalcredited_amount: totalcredited_amount,
      level_wise_member: level_wise_member,
      oneDayBankDetailTotal: oneDayBankDetail,
      oneDaybuy_packageReqTotal: oneDaybuy_packageReq,
      oneDaybuy_packageApproveReqTotal: oneDaybuy_packageApproveReq,
      one_day_week_income: one_day_week_income,
      all_week_income: all_week_income,
      Total_buy_package_amount: Total_buy_package_amount,
    });
  } catch (error) {
    console.log("Error frome: controller >> getOnedayAllrecord ", error);
    return res.status(400).json({ error: "Somthing went Wrong" });
  }
}

async function getUsersPage(req, res) {
  try {
    const Users = require("../../models/user");
    const { per_page, page } = req.body;
    let params = {};
    if (req.body && req.body.member_id) {
      //params.member_id = req.body.member_id;
      params = {
        $or: [
          { member_id: req.body.member_id },
          { member_name: { $regex: `^${req.body.member_id}`, $options: "i" } },
        ],
      };
    }

    if (req.body && req.body.start_date && req.body.end_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
        $lte: new Date(req.body.end_date).toISOString(),
      };
    } else if (req.body && req.body.start_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
      };
    } else if (req.body && req.body.end_date) {
      params.createdAt = {
        $lte: new Date(req.body.end_date).toISOString(),
      };
    }

    if (req.body && req.body.column && req.body.value) {
      params = {};
      params[req.body.column] = req.body.value;
    }

    const totalData = await Users.find(params).count();
    Users.find(params)
      .sort({ createdAt: -1 })
      .limit(per_page)
      .skip((page - 1) * per_page)
      .then((result) => {
        res.status(200).send({ data: result, totalData });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  } catch (error) {
    console.log("Error frome: controller >> getUsersPage");
    return res.status(400).json({ error: error.message });
  }
}

async function getKYCPage(req, res) {
  try {
    const KYCs = require("../../models/bankInfo");
    const { per_page, page } = req.body;
    const params = {};
    if (req.body && req.body.member_id) {
      params.member_id = req.body.member_id;
    }

    if (req.body && req.body.start_date && req.body.end_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
        $lte: new Date(req.body.end_date).toISOString(),
      };
    } else if (req.body && req.body.start_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
      };
    } else if (req.body && req.body.end_date) {
      params.createdAt = {
        $lte: new Date(req.body.end_date).toISOString(),
      };
    }

    const totalData = await KYCs.find(params).count();
    KYCs.find(params)
      .sort({ createdAt: -1 })
      .limit(per_page)
      .skip((page - 1) * per_page)
      .then((result) => {
        res.status(200).send({ data: result, totalData });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function getCashbackHistoryPage(req, res) {
  try {
    const CashbackHistory = require("../../models/cashback_history");
    const { per_page, page } = req.body;
    const params = {};
    if (req.body && req.body.member_id) {
      params.member_id = req.body.member_id;
    }

    if (req.body && req.body.start_date && req.body.end_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
        $lte: new Date(req.body.end_date).toISOString(),
      };
    } else if (req.body && req.body.start_date) {
      params.createdAt = {
        $gte: new Date(req.body.start_date).toISOString(),
      };
    } else if (req.body && req.body.end_date) {
      params.createdAt = {
        $lte: new Date(req.body.end_date).toISOString(),
      };
    }

    const totalData = await CashbackHistory.find(params).count();
    CashbackHistory.find(params)
      .sort({ createdAt: -1 })
      .limit(per_page)
      .skip((page - 1) * per_page)
      .then((result) => {
        res.status(200).send({ data: result, totalData });
      })
      .catch((error) => {
        res.status(400).send({ message: error.message });
      });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

async function adduserwalletfund(req, res) {
  try {
    const User = require("../../models/user");
    const userFund = require("../../models/userFund");
    const { member_id, amount } = req.body;
    const user = await User.findOne({ member_id: member_id });
    const total = parseInt(user.new_wallet_amount) + parseInt(amount);
    await User.updateOne(
      { member_id: member_id },
      {
        $set: {
          new_wallet_amount: total,
        },
      }
    );
    const fund = new userFund({
      member_id: member_id,
      credited_amount: amount,
      total_amount: total,
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
          message: "Fund added successfully",
        });
      }
    });
  } catch (error) {
    console.log("Error frome: controller >> adduserwalletfund");
    return res.status(400).json({ message: error.message });
  }
}

async function get_payable_amount(req, res) {
  try {
    const User = require("../../models/user");
    const user = await User.find({ new_wallet_amount: { $gt: 0 } });
    const newUser = [];
    const a = user.map((d, index) => {
      const taxation_charge = parseFloat(d.new_wallet_amount) * 0.15;
      const payable_amount =
        parseFloat(d.new_wallet_amount) - parseFloat(taxation_charge);
      d.taxation_charge = taxation_charge;
      d.payable_amount = payable_amount;
      newUser.push({
        member_id: d.member_id,
        Total_amount: d.new_wallet_amount,
        taxation_charge,
        payable_amount,
        adminProfit: taxation_charge,
      });
    });
    Promise.all(a).then((r) => {
      return res.status(200).json(newUser);
    });
    // return res.status(200).json({
    //   Total_amount: user.new_wallet_amount,
    //   taxation_charge: taxation_charge,
    //   payable_amount: payable_amount,
    //   adminProfit: taxation_charge
    // })
  } catch (error) {
    console.log("Error frome: controller >> adduserwalletfund");
    return res.status(400).json({ error: error.message });
  }
}

async function getuserbankInfo(req, res) {
  const User = require("../../models/user");

  try {
    const allRecord = await User.aggregate([
      {
        $match: {
          new_wallet_amount: { $gte: 500 },
          direct: { $gte: 2 },
        },
      },
      {
        $lookup: {
          from: "bankInfo",
          localField: "member_id",
          foreignField: "member_id",
          as: "productInfo",
        },
      },
      {
        $group: {
          _id: {
            member_id: "$member_id",
            member_name: "$member_name",
            wallet_amount: "$new_wallet_amount",
            account_type: { $first: "$productInfo.account_type" },
            account_no: { $first: "$productInfo.account_no" },
            ifsc_code: { $first: "$productInfo.ifsc_code" },
            aadhar_number: { $first: "$productInfo.aadhar_number" },
            pan_no: { $first: "$productInfo.pan_no" },
            bank_name: { $first: "$productInfo.bank_name" },
          },
        },
      },
    ]);
    return res
      .status(200)
      .json({ allRecord: allRecord, length: allRecord.length });
  } catch (error) {
    console.log(
      "Error from: adminController >> getuserbankInfo",
      error.message
    );
    return res.status(400).json({ message: "Somthing Went wrong " });
  }
}

async function paymentTouser(req, res) {
  const Admin = require("../../models/admin");
  const User = require("../../models/user");
  const Payment = require("../../models/userPayment");

  try {
    const { member_id, amount } = req.body;
    const user = await User.findOne({ member_id: member_id });
    const taxation_charge = parseFloat(amount) * 0.15;
    const payable_amount = parseFloat(amount) - parseFloat(taxation_charge);
    const admin = await Admin.findOne({ name: "Admin" });
    await User.updateOne(
      { member_id: member_id },
      {
        $set: {
          new_wallet_amount:
            parseFloat(user.new_wallet_amount) - parseFloat(amount),
          withdrawl_amount:
            parseFloat(user.withdrawl_amount) + parseFloat(amount),
        },
      }
    )
      .then(async (d) => {
        await Admin.updateOne(
          { name: "Admin" },
          {
            $set: {
              admin_wallet:
                parseFloat(admin.admin_wallet) + parseFloat(taxation_charge),
            },
          }
        );
      })
      .then(async (d) => {
        const payment = new Payment({
          member_id: user.member_id,
          member_name: user.member_name,
          taxation_charge: taxation_charge,
          payable_amount: payable_amount,
          adminProfit: taxation_charge,
        });

        payment.save((error, data) => {
          if (error) {
            return res.status(400).json({
              message: "Somthing went wrong",
            });
          }
          if (data) {
            return res.status(201).json({
              message: "user wellate debited",
              Data: data,
            });
          }
        });
      });
  } catch (error) {
    console.log("Error frome: controller >> paymentTouser");
    return res.status(400).json({ message: error.message });
  }
}

async function getUserPaymentHistory(req, res) {
  try {
    const Payment = require("../../models/userPayment");
    const pay = await Payment.find(req.body);
    return res.status(200).json({ Data: pay });
  } catch (error) {
    console.log(
      "Error from: controller>> adminController >> getUserPaymentHistory",
      error.message
    );
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function subtractWalletAmount(req, res) {
  try {
    const User = require("../../models/user");
    const { amount, member_id } = req.body;
    const user = await User.findOne({ member_id: member_id });
    console.log(user);
    await User.updateOne(
      { member_id: user.member_id },
      {
        $set: {
          wallet_amount: parseFloat(user.wallet_amount) - parseFloat(amount),
        },
      }
    );
    return res
      .status(200)
      .json({ message: `Fund ${amount} subtracted successfully` });
  } catch (error) {
    console.log(
      "Error from: controller>> adminController >> substractWalletAmount",
      error.message
    );
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function generateCashback() {
  try {
    const Cashback = require("../../models/chackback");
    const User = require("../../models/user");
    const chackback = await Cashback.find({});
    const a = chackback.map(async (d) => {
      const startDate = new Date(d.createdAt);
      const currentDate = new Date();
      let daysToBePaid = parseInt(
        (currentDate - startDate) / (1000 * 3600 * 24)
      );
      daysToBePaid = daysToBePaid > 25 ? 25 : daysToBePaid;
      const amountToBePaid = daysToBePaid * 30;
      await Cashback.updateOne(
        { member_id: d.member_id },
        {
          $set: {
            chackback_amount: amountToBePaid,
            credited_amount: amountToBePaid,
            time_perioud: daysToBePaid,
            count: daysToBePaid,
          },
        }
      ).then(async () => {
        const { income_history } = require("../../functions/function");
        await User.updateOne(
          { member_id: d.member_id },
          {
            $set: {
              new_wallet_amount: amountToBePaid,
            },
          }
        );
        await income_history(
          d.member_id,
          amountToBePaid,
          amountToBePaid,
          "DailyCashbackIncome"
        );
      });
    });
    Promise.all(a).then((d) => {
      //return res.status(200).json("Cashback generated successfully.")
    });
  } catch (error) {
    //return res.status(400).json({ message: "Error from: controller/admin/adminController/generateCashback", error: error.message });
    console.log(
      "Error from: adminController >> generateCashback",
      error.message
    );
  }
}

async function getWeeklyIncome(req, res) {
  try {
    const resWeekWise = await test_weekly_generated_income.aggregate([
      { $match: { total_amount: { $gt: 0 } } },
      { $sort: { week_starts_on: -1 } },
      {
        $group: {
          _id: "$week_start_on",
          //randomID: { "$first": "$random_id" },
          week_ends_on: { $first: "$week_ends_on" },
          totalWeeklyIncome: { $sum: "$total_amount" },
          maxWeeklyIncome: { $max: "$total_amount" },
          minWeeklyIncome: { $min: "$total_amount" },
          incomeHistory: { $push: "$$ROOT" },
        },
      },
    ]);
    return res.status(200).json(resWeekWise);
  } catch (error) {
    console.log("Error frome: controller >> getWeeklyIncome", error.message);
    return res.status(400).json({ message: error.message });
  }
}

const levelWiseIncomeList = [0, 200, 100, 60, 40, 30, 20, 15, 15];
const incomeTypes = [
  "NewDistributorIncome",
  "NewDistributorIncome",
  "BusinessDistributor",
  "GrowthDistributor",
  "PlatinumDistributor",
  "SeniorDistributor",
  "DiamondDistributer",
  "RoyalLifeDistributor",
  "StandardRoyalDistributor",
];

function getSponsoringIncome(level) {
  return level == 0
    ? levelWiseIncomeList[1]
    : levelWiseIncomeList.slice(1, level + 1).reduce((total, income) => {
        return total + income;
      });
}

function getWeekDate() {
  const currentDate = new Date();
  currentDate.setUTCHours(0, 0, 0, 0);
  console.log("WeekDay", currentDate.getDay());
  const weekStartsFrom = new Date(
    currentDate.getTime() - 1000 * 3600 * 24 * currentDate.getDay()
  );
  return { startDate: weekStartsFrom, endDate: currentDate };
}

async function generateWeeklyIncome(req, res) {
  try {
    const { startDate, endDate } = getWeekDate();
    let incomeHistory = {};
    let incomeCount = {};

    const registrationCount = await user
      .find({
        activeStatus: 1,
        activation_date: { $gte: startDate, $lte: endDate },
      })
      .count();

    const weekRegistrations = await user.aggregate([
      {
        $match: {
          activeStatus: 1,
          activation_date: { $gte: startDate, $lte: endDate },
        },
      },
      { $limit: 2 },
      {
        $group: {
          _id: "$sponsor_id",
          directJoinings: { $sum: 1 },
          directJoiners: { $push: "$$ROOT" },
        },
      },
    ]);

    //console.log(weekRegistrations);
    weekRegistrations.map(async (sponsor) => {
      const pd = await findparent(sponsor._id);
    });

    /* const mapOne = weekRegistrations.map(async (sponsor) => {
      const sponsorInfo = await user.findOne({ member_id: sponsor._id });
      if (sponsorInfo) {
        const directJoinings = sponsor.directJoinings;
        const incomeData = {
          member_id: sponsorInfo.member_id,
          week_start_on: startDate,
          week_ends_on: endDate,
          current_level: sponsorInfo.level,
          last_weekDirect_registrations: sponsor.directJoinings,
          sponsoring_lncome: sponsor.directJoinings * getSponsoringIncome(sponsorInfo.level),
          total_weekly_registrations: 0,
          new_registrations_income: 0,
          total_amount: 0
        }
        incomeHistory[sponsorInfo.member_id] = incomeData;
        incomeCount[sponsorInfo.member_id] = 1;
      } else {
        //console.log(`sponsor id << ${sponsor._id} >> not found. DirectJoinings ${sponsor.directJoinings}`);
      }
    });
    Promise.all(mapOne).then((res) => {
      let allParents = {};
      Object.entries(incomeHistory).forEach(async ([mID, iData], index) => {
       
        iData.total_amount = iData.sponsoring_lncome + iData.new_registrations_income;
        await test_weekly_generated_income.updateOne(
          { member_id: mID, week_start_on: startDate.toISOString() },
          iData,
          { upsert: true }
        )
        const uInfo = await user.findOne({ member_id: mID }, { new_wallet_amount: 1 });
        const newWalletAmount = uInfo.new_wallet_amount + iData.total_amount;
        const incomeHistoryData = {
          member_id: mID,
          total_amount: newWalletAmount,
          credited_amount: iData.total_amount,
          income_type: incomeTypes[iData.current_level]
        }
        await income_history(incomeHistoryData.member_id, incomeHistoryData.total_amount, incomeHistoryData.credited_amount, incomeHistoryData.income_type);

        await user.updateOne({ member_id: mID }, {
          $set: {
            new_wallet_amount: newWalletAmount
          }
        })
        //console.log(iData);
        let parentList = await findparent(mID);
        parentList = parentList[0].referal.filter((s) => s.level != 0);
        parentListArray = []; parentList.map((parent) => { parentListArray.push(parent.member_id) });
        parentListArray.forEach(async (p) => {
          //console.log("DirectSponsorID", mID);
          let directSponsor = await user.findOne({ member_id: mID }, { level: 1 });
          const oldHistory = await test_weekly_generated_income.findOne({ member_id: p, week_start_on: startDate, week_ends_on: endDate })
          if (oldHistory) {
            let { current_level, last_weekDirect_registrations, sponsoring_lncome, total_weekly_registrations, new_registrations_income, total_amount } = oldHistory;
            total_weekly_registrations += iData.last_weekDirect_registrations;
            if (current_level == directSponsor.level) {
              console.log(`DirectSponsorLevel ${directSponsor.level} ParentLevel : ${current_level}`);
            }
            if (current_level > 1 && current_level.level != directSponsor.level) {
              new_registrations_income = total_weekly_registrations * levelWiseIncomeList[current_level];
            }
            total_amount = sponsoring_lncome + new_registrations_income;
            const parentIncomeData = {
              member_id: p,
              week_start_on: startDate,
              week_ends_on: endDate,
              current_level: current_level,
              last_weekDirect_registrations: last_weekDirect_registrations,
              sponsoring_lncome: sponsoring_lncome,
              total_weekly_registrations: total_weekly_registrations,
              new_registrations_income: new_registrations_income,
              total_amount: total_amount
            }
            await test_weekly_generated_income.updateOne(
              { member_id: p, week_start_on: startDate.toISOString() },
              parentIncomeData,
              { upsert: true }
            )
          } else {
            const parentInfo = await user.findOne({ member_id: p }, { member_id: 1, level: 1 });
            if (parentInfo.level == directSponsor.level) {
              console.log(`DirectSponsorLevel ${directSponsor.level} ParentLevel : ${parentInfo.level}`);
            }
            const last_weekDirect_registrations = 0;
            const sponsoring_lncome = 0;
            const total_weekly_registrations = iData.last_weekDirect_registrations;
            let new_registrations_income = 0;
            if (parentInfo.level > 1 && parentInfo.level != directSponsor.level) {
              new_registrations_income = total_weekly_registrations * levelWiseIncomeList[parentInfo.level];
            }

            const total_amount = sponsoring_lncome + new_registrations_income;
            const parentIncomeData = {
              member_id: p,
              week_start_on: startDate,
              week_ends_on: endDate,
              current_level: parentInfo.level,
              last_weekDirect_registrations: last_weekDirect_registrations,
              sponsoring_lncome: sponsoring_lncome,
              total_weekly_registrations: total_weekly_registrations,
              new_registrations_income: new_registrations_income,
              total_amount: total_amount
            }
            await test_weekly_generated_income.updateOne(
              { member_id: p, week_start_on: startDate.toISOString() },
              parentIncomeData,
              { upsert: true }
            )
          }

          const uInfo = await user.findOne({ member_id: p }, { new_wallet_amount: 1 });
          const newWalletAmount = uInfo.new_wallet_amount + iData.total_amount;
          const incomeHistoryData = {
            member_id: p,
            total_amount: newWalletAmount,
            credited_amount: iData.total_amount,
            income_type: incomeTypes[iData.current_level]
          }
          await income_history(incomeHistoryData.member_id, incomeHistoryData.total_amount, incomeHistoryData.credited_amount, incomeHistoryData.income_type);
          await user.updateOne({ member_id: p }, {
            $set: {
              new_wallet_amount: newWalletAmount
            }
          })
        })
      })
    }) */
    return res.status(200).json(weekRegistrations);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function getUserAllWeekIncome(req, res) {
  try {
    const allWeekUserIncome = await test_weekly_generated_income.aggregate([
      {
        $group: {
          _id: "$member_id",
          //randomID: { "$first": "$random_id" },
          //week_ends_on: { "$first": "$week_ends_on" },
          total_direct_registrations: {
            $sum: "$last_weekDirect_registrations",
          },
          total_sponsoring_income: { $sum: "$sponsoring_lncome" },
          total_teams_registrations: { $sum: "$total_weekly_registrations" },
          total_teams_registrations_income: {
            $sum: "$new_registrations_income",
          },
          totalWeeklyIncome: { $sum: "$total_amount" },
          incomeHistory: { $push: "$$ROOT" },
        },
      },
    ]);
    //console.log(allWeekUserIncome);
    if (allWeekUserIncome) {
      return res.status(200).json(allWeekUserIncome);
    } else {
      return res.status(400).json({ message: "Records not found." });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function generateDailyCashback() {
  try {
    const CashbackHistory = require("../../models/cashback_history");
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
      const chackback = await Cashback.find({ count: { $lt: 25 } });
      const total_members_count = chackback.length;
      const total_cashback_paid = total_members_count * 30;
      const all_members_id = [];
      const a = chackback.map(async (d) => {
        all_members_id.push(d.member_id);
        const amountToBePaid = 30;
        await Cashback.updateOne(
          { member_id: d.member_id },
          {
            $set: {
              chackback_amount: d.chackback_amount + amountToBePaid,
              credited_amount: amountToBePaid,
              time_perioud: d.time_perioud - 1,
              count: d.count + 1,
            },
          }
        ).then(async () => {
          const { income_history } = require("../../functions/function");
          const userInfo = await User.findOne({ member_id: d.member_id });
          const newAmount =
            parseInt(userInfo.new_wallet_amount) + amountToBePaid;
          await User.updateOne(
            { member_id: d.member_id },
            {
              $set: {
                new_wallet_amount: newAmount,
              },
            }
          );
          await income_history(
            d.member_id,
            newAmount,
            amountToBePaid,
            "DailyCashbackIncome"
          );
        });
      });
      Promise.all(a).then(async (d) => {
        const historyData = {
          cashback_date,
          total_cashback_paid,
          total_members_count,
          all_members_id,
        };
        await cashback_history
          .updateOne({ cashback_date }, historyData, { upsert: true })
          .then((history, error) => {
            if (error) console.log(error.message);
            console.log(`Cashback generated successfully.`);
          });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

async function generateDailyCashbackAPI(req, res) {
  return generateDailyCashback();
}

async function getDashboardData(req, res) {
  const thisYear = new Date();
  thisYear.setMonth(0);
  thisYear.setDate(1);
  thisYear.setUTCHours(0, 0, 0, 0);
  const data = await user.aggregate([
    /* {
      $project: {
        activation_date: {
          $dateFromString: { dateString: "$activation_date", format: "%Y-%m-%d %H:%M:%S" }
        }
      }
    }, */
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
  ]);

  const registrationData = await user.aggregate([
    /* {
      $project: {
        activation_date: {
          $dateFromString: { dateString: "$activation_date", format: "%Y-%m-%d %H:%M:%S" }
        }
      }
    }, */
    {
      $group: {
        _id: {
          year: { $year: "$activation_date" },
          /* month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }, */
        },
        count: { $sum: 1 },
      },
    },
  ]);
  if (data) {
    data.map((item) => {
      //console.log((item._id.activation_date).substr(0, 10));
      item.date = `${item._id.year}/${item._id.month}/${item._id.day}`;
    });
    return res.status(200).json({ heapData: data, registrationData });
  } else {
    return res.status(400).json({ message: error.message });
  }
}

async function resetWallet(updateWallet = false) {
  const UserModel = require("../../models/user");
  UserModel.updateMany(
    //{ test_wallet_amount: { $gt: 0 } },
    { $set: { test_wallet_amount: 0 } }
  ).then(async (res) => {
    if (updateWallet) {
      const CashbackModel = require("../../models/chackback");
      cashbackData = await CashbackModel.find({});
      const upgrade = cashbackData.map(async (cashbackInfo) => {
        const totalCashbackAmount = cashbackInfo.count * 30;
        const userInfo = await UserModel.findOne(
          { member_id: cashbackInfo.member_id },
          { test_wallet_amount: 1 }
        );
        //console.log(userInfo);
        //console.log(userInfo.test_wallet_amount);
        const newWalletAmount =
          userInfo.test_wallet_amount + totalCashbackAmount;
        await UserModel.updateOne(
          { member_id: cashbackInfo.member_id },
          { $set: { test_wallet_amount: newWalletAmount } }
        );
      });
      Promise.all(upgrade).then(async (re) => {
        const weeklyIncomeData = await weekly_generated_income.aggregate([
          {
            $group: {
              _id: {
                member_id: "$member_id",
                //income_from_sponsor: "$income_from_sponsor",
                //week_start_on: "$week_start_on",
                //week_ends_on: "$week_ends_on"
              },
              member_id: { $first: "$member_id" },
              member_level: { $first: "$member_level" },
              //income_from_sponsor: { "$first": "$income_from_sponsor" },
              week_start_on: { $first: "$week_start_on" },
              week_ends_on: { $first: "$week_ends_on" },
              directs: { $sum: "$direct_registrations" },
              indirects: { $sum: "$indirect_registrations" },
              direct_income: { $sum: "$direct_income" },
              indirect_income: { $sum: "$indirect_income" },
              income: { $sum: "$income" },
              incomeHistory: { $push: "$$ROOT" },
            },
          },
          {
            $project: {
              member_id: 1,
              member_level: 1,
              week_start_on: 1,
              week_ends_on: 1,
              directs: 1,
              indirects: 1,
              direct_income: 1,
              indirect_income: 1,
              income: 1,
              incomeHistory: 1,
            },
          },
        ]);

        //console.log(weeklyIncomeData);
        const i = weeklyIncomeData.map(async (incomeInfo) => {
          const userInfo = await UserModel.findOne(
            { member_id: incomeInfo.member_id },
            { test_wallet_amount: 1 }
          );
          const newWalletAmount =
            userInfo.test_wallet_amount + incomeInfo.income;
          await UserModel.updateOne(
            { member_id: incomeInfo.member_id },
            { $set: { test_wallet_amount: newWalletAmount } }
          );
        });
        Promise.all(i).then((r) => {
          console.log("wallet successfully reset.");
        });
        //console.log(weeklyIncomeData);
      });
    }
  });
}

async function updateNewWalletWithTestWallet() {
  try {
    const UserModel = require("../../models/user");
    const userList = await UserModel.find(
      { test_wallet_amount: { $gt: 0 } },
      { member_id: 1, test_wallet_amount: 1, new_wallet_amount: 1 }
    );
    const upgrade = userList.map(async (userInfo) => {
      if (userInfo.new_wallet_amount == userInfo.test_wallet_amount) {
        //console.log(userInfo);
      } else {
        await UserModel.updateOne(
          { member_id: userInfo.member_id },
          { $set: { new_wallet_amount: userInfo.test_wallet_amount } }
        );
      }
    });
    Promise.all(upgrade).then((re) => {});
  } catch (error) {
    console.log(
      "error From: adminController >> updateNewWalletWithTestWallet",
      error.message
    );
  }
}

async function getMatrixPlans(req, res) {
  try {
    const matrixPlans = await MatrixPlanModel.find({});
    return res.status(200).json(matrixPlans);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

async function generatedBills(req, res) {
  try {
    const generatedBills = await buy_package.aggregate([
      { $match: { status: 1 } },
      {
        $lookup: {
          from: "franchise",
          localField: "franchise_id",
          foreignField: "franchise_id",
          as: "franchise_info",
        },
      },
      {
        $group: {
          _id: "$franchise_id",
          franchise_id: { $first: "$franchise_id" },
          total_generated_bills: { $sum: 1 },
          bills: { $push: "$$ROOT" },
          franchise_name: { $first: "$franchise_info.franchise_name" },
          franchise_cashback_wallet: {
            $first: "$franchise_info.chackback_wallet",
          },
        },
      },
    ]);
    return res.status(200).json(generatedBills);
  } catch (error) {
    return res.status(400).json({ message: "something went wrong." });
  }
}

module.exports = {
  signup,
  signin,
  userInfo,
  getApproval,
  getUsersPage,
  getKYCPage,
  paymentTouser,
  topupFranchise,
  addAdminProduct,
  adduserwalletfund,
  get_payable_amount,
  getOnedayAllrecord,
  change_password_admin,
  generateCashback,
  getWeeklyIncome,
  generateWeeklyIncome,
  generateDailyCashback,
  generateDailyCashbackAPI,
  getDashboardData,
  resetWallet,
  getuserbankInfo,
  updateNewWalletWithTestWallet,
  getUserAllWeekIncome,
  getCashbackHistoryPage,
  getMatrixPlans,
  generatedBills,
  getUserPaymentHistory,
  subtractWalletAmount,
};
