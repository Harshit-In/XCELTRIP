const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  userInfo,
  getIncomeHistory,
  getFundTransferHistory,
  getDashboardData,
  getOwnerWalletAddress,
  adminTouser,
  updateUserLevelByAdmin,
  updateOwnerWalletAddress,
  getWithdrawlRequest,
  approveWithdrawlRequest,
  changeMinMaxTopupAmount
  
} = require("../../Controllers/admin/adminController");
const { sendRoi, sendRoyalty } = require("../../Controllers/roiRoyaltyController");
const { blockuser } = require("../../Controllers/userController");


router.post("/admin/signup", signup);
router.post("/admin/signin", signin);
router.post("/admin/blockuser", blockuser); // block user
router.post("/userInfo", userInfo);
router.post("/getIncomeHistory", getIncomeHistory); // getIncome_History
router.post("/getFundTransferHistory", getFundTransferHistory); // getFundTransferHistory
router.get("/dashboarddata", getDashboardData);
router.get("/getOwnerWalletAddress", getOwnerWalletAddress);
router.post("/credit_wallet", adminTouser);  // fund transfer by admin
router.post("/update_rank", updateUserLevelByAdmin); // level update by admin
router.post("/update_owner_address", updateOwnerWalletAddress)
router.post("/all_withdrawl_requests", getWithdrawlRequest)
router.post("/approve_withdrawl_request", approveWithdrawlRequest)
router.post("/change_min_max_topup_amount", changeMinMaxTopupAmount)
router.post("/sendROI", sendRoi);
router.post("/sendRoyalty", sendRoyalty);



module.exports = router;
