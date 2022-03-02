const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  getSponser,
  getNextId,
  sendMobileOtp,
  generatePassword,
} = require("../functions/function");
const bcrypt = require("bcrypt");
const { sendEmailOtp, UserRagistractionMail } = require("../functions/mailer");

async function signup(req, res) {
  console.log(req.body)

  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).json({ message: "user already registered" });

      const { email, sponsor_id, full_name, xcelpay_wallet, country, mobile } = req.body;
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
      hash_password: hash,
      transcation_password: transcation_password,
      full_name,
      xcelpay_wallet,
      country,
      mobile,
    });

    _user.save((error, data) => {
      if (error) {
        console.log("Error from: userController >> signup", error.message);
        return res.status(400).json({
          message: "Somthing went wrong",
          error: error.message,
        });
      }
      if (data) {
        // sendMobileOtp(contact, message)
        UserRagistractionMail(email, new_id, password, transcation_password);
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
    User.findOne({ email: req.body.email }).then(async (user, error) => {
      if (error) return res.status(400).json({ error });
      if (user) {
        let isValid = bcrypt.compareSync(req.body.password, user.hash_password);
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
    });
  } catch (error) {
    console.log("Error from userController >> signin: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function updateUserInfo(req, res) {
  try {
    const { member_id, member_name, contact, addr, city, pincod } = req.body;

    if (member_id) {
      const status = await updateUserProfile(
        member_id,
        member_name,
        contact,
        addr,
        city,
        pincod
      );
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

async function updateUserProfile(
  member_id,
  member_name,
  contact,
  addr,
  city,
  pincod
) {
  const User = require("../models/user");
  try {
    if (member_id) {
      user_bank = await User.updateOne(
        {
          member_id: member_id,
        },
        {
          $set: {
            contact: contact,
            member_name: member_name,
            addr: addr,
            city: city,
            pincod: pincod,
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
    const { member_id, pass, confirm_pass } = req.body;
    if (pass == confirm_pass) {
      const hash = await bcrypt.hash(pass, 10);
      await User.updateOne(
        { member_id: member_id },
        {
          $set: {
            hash_password: hash,
          },
        }
      );
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
          activeStatus: status,
        },
      }
    );
    if (status == 2) {
      await UpdateAllParent(member_id, -1);
      return res.status(200).json({ message: "User unblocked successfully" });
    } else {
      await UpdateAllParent(member_id, 1);
      return res.status(200).json({ message: "User blocked successfully" });
    }
  } catch (error) {
    console.log("Error from userController >> blockuser: ", error.message);
    return res.status(400).json({ error: error.message });
  }
}

async function widthdrawl(req, res) {
  const User = require("../models/user");
  try {
    const { member_id, amount, wallet_type } = req.body;
    const user = await User.findOne({ member_id: member_id });
    switch (wallet_type) {
      case "income_wallet":
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              widthdrawl: Number(user.income_wallet) + Number(amount),
              income_wallet: Number(user.income_wallet) - Number(amount),
            },
          }
        );
      case "cashback_wallet":
        await User.updateOne(
          { member_id: member_id },
          {
            $set: {
              widthdrawl: Number(user.income_wallet) + Number(amount),
              cashback_wallet: Number(user.cashback_wallet) - Number(amount),
            },
          }
        );
    }
    if (user.income_wallet < amount) {
      return res.status(200).json({ message: "Insufficient Account Balance" });
    }

    const incomeType = "widthdrawl";
    await createIncomeHistory(member_id, amount, incomeType);
    return res.status(200).json({ message: "widthdrawl successfully" });
  } catch (error) {
    console.log("Error from: userController >> widthdrawl");
    return res.status(400).json({ message: "Somthing went wrong" });
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
};
