const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");


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

async function userInfo(req, res) {
  const User = require("../../models/user");
  try {
    const { member_id, startDate, endDate } = req.body;
    if (member_id) {
      User.findOne({ member_id: member_id }).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          const directChild = await  User.find({ sponsor_id: member_id })
          return res.status(200).json({ data, directChild });
        }
      });
    } else {
      User.find({ createdAt:{$gt: endDate, $lt: startDate}}).then(async (data, error) => {
        if (error) return res.status(200).json({ message: error });
        if (data) {
          
          // data.filter((d)=>{ return d})
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
      History.findOne({ member_id: member_id }).then(async (data, error) => {
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
    if (from ||  to) {
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



module.exports = {
  signup,
  signin,
  userInfo,
  getIncomeHistory,
  getFundTransferHistory
};
