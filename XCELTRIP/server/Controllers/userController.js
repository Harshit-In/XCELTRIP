const User = require("../models/user");
const jwt = require("jsonwebtoken");
const {
  getSponser,
  getNextId,
  sendMobileOtp,
} = require("../functions/function");
const bcrypt = require("bcrypt");

async function signup(req, res) {
  try {
    User.findOne({ email: req.body.email }).then(async (error, user) => {
      if (user)
        return res.status(400).json({ message: "user already registered" });
      const { email, sponsor_id, password, conform_password } = req.body;
      if (password !== conform_password) {
        return res.status(400).json({
          message: "Enter same password",
        });
      }
      const hash = await bcrypt.hash(password, 10);
          const get_Sponser = await getSponser(sponsor_id)
         if(get_Sponser == false){
             return res.status(400).json({message: "Invalid sponser Id. Please enter a valid sponser Id or Sponser is blocked"})
         }
      const new_id = await getNextId()
      const _user = new User({
        member_id: new_id,
        sponsor_id,
        email,
        hash_password: hash,
      });
      // const message = `Welcome to FastEarn,"${member_name}", you have been successfully registered with us. Your I'd is "${new_id}" and password is "${password}".Click to login : "{http://myfastearn.in/}" - MYFASTEARN`

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
          return res.status(200).json({
            message: "user created successfully",
            data: data,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error from userController >> signup: ", error.message);
    return res.status(400).json({ message: "Somthing went wrong" });
  }
}

async function signin(req, res) {
  try {
    User.findOne({ email: req.body.email }).then(async (user, error) => {
        console.log(error)
      if (error) return res.status(400).json({ error });
      if (user) {
    console.log(user);

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
              sponsor_id
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalide username and password",
          });
        }
      } else {
        return res.status(400).json({
          message: "Somthing went wrong",
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
    const { member_id } = req.body;
    const otp = await generateOtp();
    const user = await User.findOne({ member_id: member_id });
    forget.findOne({ member_id: member_id }).then(async (data, error) => {
      if (error)
        return res
          .status(400)
          .json({ message: "Somthing went wrong", error: error });
      if (data) {
        await forget.updateOne(
          { member_id: member_id },
          {
            $set: {
              otp: otp,
            },
          }
        );
        await sendOtp(user.contact, otp);
        return res.status(200).json({ message: "Otp send on your number" });
      } else {
        const fopt = await new forget({
          member_id: user.member_id,
          otp: otp,
        });
        await sendOtp(user.contact, otp);
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

function sendOtp(contact, otp) {
  try {
    const message = `Dear User, Your OTP for UserId ${contact} is ${otp} - TEARN`;
    return sendMobileOtp(contact, message);
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
      await User.updateOne(
        { member_id: member_id },
        {
          $set: {
            hash_password: confirm_pass,
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

module.exports = {
  signup,
  signin,
  otp_match,
  blockuser,
  updateUserInfo,
  forgetPassword,
  otp_match,
  change_password,
};
