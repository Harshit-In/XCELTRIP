const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  userInfo,
  getIncomeHistory,
  getFundTransferHistory,
  getDashboardData,
  
} = require("../../Controllers/admin/adminController");
const { blockuser } = require("../../Controllers/userController");


router.post("/admin/signup", signup);
router.post("/admin/signin", signin);
router.post("/admin/blockuser", blockuser); // block user
router.post("/userInfo", userInfo);
router.post("/getIncomeHistory", getIncomeHistory); // getIncome_History
router.post("/getFundTransferHistory", getFundTransferHistory); // getFundTransferHistory
router.get("/dashboarddata", getDashboardData);





module.exports = router;
