const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  getSponser,
  getNextId,
  sendMobileOtp,
  generatePassword,
  createIncomeHistory,
  updateParentTeam,
} = require("../functions/function");
const bcrypt = require("bcrypt");
const { sendEmailOtp, UserRagistractionMail } = require("../functions/mailer");
const user = require("../models/user");

async function signup(req, res) {
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "user already registered" });

    const { email, sponsor_id, full_name, xcelpay_wallet, country, mobile } =
      req.body;
    const password = await generatePassword();
    const transcation_password = await generatePassword();
    const hash = await bcrypt.hash(password, 10);
    const get_Sponser = await getSponser(sponsor_id);
    if (get_Sponser == false) {
      return res.status(400).json({
        message:
          "Invalid sponser Id or Sponser is blocked. Please enter a valid sponser Id",
      });
    }
    const new_id = await getNextId();
    const _user = new User({
      member_id: new_id,
      sponsor_id: sponsor_id,
      email,
      password: password,
      hash_password: hash,
      txn_password: transcation_password,
      full_name,
      xcelpay_wallet,
      country,
      mobile,
    });

    _user.save(async (error, data) => {
      if (error) {
        console.log("Error from: userController >> signup", error.message);
        return res.status(400).json({
          message: "Somthing went wrong",
          error: error.message,
        });
      }
      if (data) {
        // sendMobileOtp(contact, message)
        await UserRagistractionMail(
          email,
          new_id,
          password,
          transcation_password
        );
        await updateParentTeam(new_id, 1);
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
    const email = req.body.email;
    console.log(email.toLowerCase());
    User.findOne({ email: { $regex: `^${email}`, $options: "i" } }).then(
      async (user, error) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          let isValid = bcrypt.compareSync(
            req.body.password,
            user.hash_password
          );
          if (isValid) {
            const { _id, email, member_id, sponsor_id } = user;
            const token = jwt.sign(
              { _id: user._id, email: user.email },
              process.env.JWT_SECRET,
              { expiresIn: "1h" }
            );
            return res.status(200).json({
              token,
              user: {
                _id,
                email,
                member_id,
                sponsor_id,
              },
            });
          } else {
            return res.status(400).json({
              message: "Invalide username and password",
            });
          }
        } else {
          return res.status(400).json({
            message: "Incorrect credentials, member not found.",
          });
        }
      }
    );
  } catch (error) {
    console.log("Error from userController >> signin: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function updateUserInfo(req, res) {
  try {
    const { member_id } = req.body;

    if (member_id) {
      const status = await updateUserProfile({ ...req.body });
      if (status) {
        return res.json({
          status: 200,
          error: false,
          params: {
            member_id: member_id,
          },
          message: "User profile Updated successfully",
        });
      } else {
        return res.json({
          status: 400,
          error: true,
          message: "Something went wrong, please try again",
        });
      }
    } else {
      return res.json({
        status: 400,
        error: true,
        message: "Invalid request",
      });
    }
  } catch (error) {
    console.log(
      "Error: from: src>controller>updateUserInfo.js: ",
      error.message
    );
    return res.json({
      status: 400,
      error: true,
      message: "Something went wrong, please try again!",
    });
  }
}

async function updateUserProfile(memberInfo) {
  const User = require("../models/user");
  try {
    console.log(memberInfo);
    if (memberInfo.member_id) {
      user_bank = await User.updateOne(
        {
          member_id: memberInfo.member_id,
        },
        {
          $set: {
            full_name: memberInfo.full_name,
            email: memberInfo.email,
            mobile: memberInfo.mobile,
            xcelpay_wallet: memberInfo.xcelpay_wallet,
          },
        }
      );
    }
    return {
      status: 200,
      user_data: user_bank,
      error: false,
    };
  } catch (error) {
    console.log(
      "Error: from: constroller>userController>updateUserProfile: ",
      error
    );
    return undefined;
  }
}

async function forgetPassword(req, res) {
  try {
    const forget = require("../models/forgetOtp");
    const User = require("../models/user");
    const { email } = req.body;
    const otp = await generateOtp();
    const user = await User.findOne({ email: email });
    forget.findOne({ email: email }).then(async (data, error) => {
      if (error)
        return res
          .status(400)
          .json({ message: "Somthing went wrong", error: error });
      if (data) {
        await forget.updateOne(
          { email: email },
          {
            $set: {
              otp: otp,
            },
          }
        );
        await sendOtp(user.email, otp);
        return res.status(200).json({ message: "Otp send on your email" });
      } else {
        const fopt = await new forget({
          email: user.email,
          otp: otp,
        });
        await sendOtp(email, otp);
        fopt.save((data, error) => {
          if (error) return res.status(400).json({ message: "error" });
          if (data) {
            return res.status(200).json({ message: "OTP Send" });
          }
        });
      }
    });
  } catch (error) {
    console.log("Error from userController >> forgetPassword: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

function sendOtp(email, otp) {
  try {
    // const message = `Dear User, Your OTP for UserId ${contact} is ${otp} - TEARN`;
    // return sendMobileOtp(contact, message);
    return sendEmailOtp(email, otp);
  } catch (error) {
    console.log("Error from userController >> sendOtp: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function otp_match(req, res) {
  try {
    const Forget = require("../models/forgetOtp");
    const { member_id, userInput } = req.body;
    console.log(req.body);

    const fkucs = await Forget.findOne({ member_id: member_id });
    if (parseInt(fkucs.otp) == parseInt(userInput)) {
      res.status(200).json({ message: "OTP Matched!" });
    } else {
      res.status(400).json({ message: "Please enter a valid otp!" });
    }
  } catch (error) {
    console.log("Error from userController >> otp_match: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function change_password(req, res) {
  try {
    const User = require("../models/user");
    const { member_id, pass, confirm_pass, password_type } = req.body;
    const hash = await bcrypt.hash(pass, 10);

    if (pass == confirm_pass) {
      switch (password_type) {
        case "password":
          await User.updateOne(
            { member_id: member_id },
            {
              $set: {
                hash_password: hash,
              },
            }
          );

        case "txn_password":
          await User.updateOne(
            { member_id: member_id },
            {
              $set: {
                txn_password: hash,
              },
            }
          );
      }

      res.status(200).json({ message: "Password Successfully Updated" });
    } else {
      res.status(400).json({ message: "Password Do not Match" });
    }
  } catch (error) {
    console.log(
      "Error from userController >> change_password: ",
      error.message
    );
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function generateOtp() {
  try {
    const otp = Math.floor(Math.random() * (100000 + 1));
    return otp;
  } catch (error) {
    console.log("Error from userController >> generateOtp: ", error.message);
  }
}

async function blockuser(req, res) {
  const User = require("../models/user");
  const { UpdateAllParent } = require("../functions/function");
  try {
    const { member_id, status } = req.body;
    await User.updateOne(
      { member_id: member_id },
      {
        $set: {
          status: status,
        },
      }
    );
    if (status == 2) {
      await UpdateAllParent(member_id, -1);
      return res.status(200).json({ message: "User blocked successfully" });
    } else {
      await UpdateAllParent(member_id, 1);
      return res.status(200).json({ message: "User unblocked successfully" });
    }
  } catch (error) {
    console.log("Error from userController >> blockuser: ", error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function widthdrawl(req, res) {
  const User = require("../models/user");
  const withdrawlRequests = require("../models/withdrawlRequests");
  try {
    const { member_id, amount, wallet_type } = req.body;
    const newRequest = await withdrawlRequests.insertMany([req.body]);
    if (newRequest) {
      res.status(200).json({
        message: "Withdrawl request has been placed successfully.",
        fundReq: newRequest,
      });
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
    //const user = await User.findOne({ member_id: member_id });
/* 
    switch (wallet_type) {
      case "income_wallet":
        if (user.income_wallet < amount) {
          return res.status(200).json({
            message: `Insufficient Account Balance in ${wallet_type}`,
          });
        }
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              widthdrawl: Number(user.widthdrawl) + Number(amount),
              income_wallet: Number(user.income_wallet) - Number(amount),
            },
          }
        );
        break;
      case "cashback_wallet":
        if (user.cashback_wallet < amount) {
          return res.status(200).json({
            message: `Insufficient Account Balance in ${wallet_type}`,
          });
        }
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              widthdrawl: Number(user.widthdrawl) + Number(amount),
              cashback_wallet: Number(user.cashback_wallet) - Number(amount),
            },
          }
        );
        break;
    }
    const incomeType = "widthdrawl";
    await createIncomeHistory(member_id, amount, incomeType); */
    //return res.status(200).json({ message: "widthdrawl successfully" });
  } catch (error) {
    console.log("Error from: userController >> widthdrawl", error);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function manualFundRequest(req, res) {
  try {
    const manualFundRequestModel = require("../models/manualFundRequests");
    const newRequest = await manualFundRequestModel.insertMany([req.body]);
    if (newRequest) {
      res.status(200).json({
        message: "Request to add fund has been placed successfully.",
        fundReq: newRequest,
      });
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function getManualFundRequest(req, res) {
  try {
    const manualFundRequestModel = require("../models/manualFundRequests");
    const allRequests = await manualFundRequestModel
      .find(req.body)
      .sort({ createdAt: -1 });
    if (allRequests) {
      res.status(200).json(allRequests);
    } else {
      res.status(400).json({ message: "Something went wrong." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function approveFundRequest(req, res) {
  try {
    const manualFundRequestModel = require("../models/manualFundRequests");
    const updateResult = await manualFundRequestModel.updateOne({
      _id: req.body.id,
    },
    {
      $set: {
        is_approved: true
      }
    }).then(async (fundRequest, error)=>{
      if (error) res.status(400).json({ message: "Something went wrong." });
      const re = await manualFundRequestModel.findOne({_id: req.body.id});
      const memberID = re.member_id;
      await user.updateOne({member_id: memberID},{$inc: {bep20_wallet: re.amount}});
      res.status(200).json({message: "Request approved successully.", fundRequest});
    })
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = {
  signup,
  signin,
  otp_match,
  blockuser,
  updateUserInfo,
  forgetPassword,
  otp_match,
  change_password,
  widthdrawl,
  manualFundRequest,
  getManualFundRequest,
  approveFundRequest
};
