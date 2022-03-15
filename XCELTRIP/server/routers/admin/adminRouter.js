const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  userInfo,
  getIncomeHistory,
  getFundTransferHistory,
  getDashboardData,
  adminTouser,
  updateUserLevelByAdmin,
  
} = require("../../Controllers/admin/adminController");
const { support_ticket_admin_reply, getsupportTicket, delete_ticket } = require("../../Controllers/support");
const { blockuser } = require("../../Controllers/userController");


router.post("/admin/signup", signup);
router.post("/admin/signin", signin);
router.post("/admin/blockuser", blockuser); // block user
router.post("/userInfo", userInfo);
router.post("/getIncomeHistory", getIncomeHistory); // getIncome_History
router.post("/getFundTransferHistory", getFundTransferHistory); // getFundTransferHistory
router.get("/dashboarddata", getDashboardData);
router.get("/credit_wallet", adminTouser);  // fund transfer by admin
router.get("/update_rank", updateUserLevelByAdmin); // level update by admin


// support ticket
router.post("/admin/support_ticket_admin_reply", support_ticket_admin_reply);
router.post("/getsupportTicket", getsupportTicket);
router.post("/delete_ticket", delete_ticket);




module.exports = router;
