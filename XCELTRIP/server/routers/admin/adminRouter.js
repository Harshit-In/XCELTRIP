const express = require("express");
const router = express.Router();
const {
  addFranchise,
  getFranchise,
  getFranchisePage,
  updateFranchise,
  deleteFranchise,
  franchise_kyc,
  franchiseWithdrawl,
  getFranchiseWithdrawl,
} = require("../../Controllers/admin/franchiseController");
const {
  signin,
  signup,
  topupFranchise,
  addAdminProduct,
  userInfo,
  getApproval,
  change_password_admin,
  getOnedayAllrecord,
  getUsersPage,
  adduserwalletfund,
  paymentTouser,
  get_payable_amount,
  getWeeklyIncome,
  generateWeeklyIncome,
  getDashboardData,
  generateDailyCashback,
  getUserAllWeekIncome,
  getKYCPage,
  getCashbackHistoryPage,
  generateDailyCashbackAPI,
  getMatrixPlans,
  generatedBills,
  getuserbankInfo,
  subtractWalletAmount,
  getUserPayment,
  getUserPaymentHistory,
} = require("../../Controllers/admin/adminController");
const {
  generateWeekWiseIncome,
  getWeekWiseIncomeList,
  getMemberWeekWiseIncomeList,
  royalty_qualifing_level,
} = require("../../Controllers/IncomeController");
const {
  getProduct,
  approval,
  getBuy_Package,
  getPackageRequest,
  repurchaseApproval,
  getrepurchaseApproval,
} = require("../../Controllers/PackageController");
const {
  kycApproval,
  getKyc,
  deleteKYC,
  addNotification,
  deleteNotification,
  editNotification,
  getNotification,
  get_bank_details_for_admin,
  getLastNotification,
} = require("../../Controllers/bankDetails");
const { blockuser } = require("../../Controllers/userController");
const {
  globle_income,
  get_matrix_user,
} = require("../../Controllers/globle_matrixController");
const {
  support_ticket_admin_reply,
  getsupportTicket,
  delete_ticket,
} = require("../../Controllers/support");

router.post("/admin/signup", signup);
router.post("/admin/signin", signin);
router.post("/admin/topupFranchise", topupFranchise);
router.post("/admin/addFranchise", addFranchise);
router.post("/admin/getFranchise", getFranchise);
router.post("/admin/deleteFranchise", deleteFranchise);
router.post("/admin/package/create", addAdminProduct);
router.post("/admin/getProduct", getProduct);
router.post("/admin/getApproval", getApproval);
router.post("/admin/KycApproval", kycApproval);
router.post("/admin/updateFranchise", updateFranchise);
router.get("/admin/getOnedayAllrecord", getOnedayAllrecord);
router.post("/admin/getKyc", getKyc);
router.post("/admin/blockuser", blockuser); // block user
router.post("/admin/deleteKyc/", deleteKYC);
router.post("/admin/deleteKyc/", get_bank_details_for_admin); // get_bank_details_for_admin
router.post("/admin/adduserwalletfund", adduserwalletfund); // add user fund
router.post("/admin/getUserPaymentHistory", getUserPaymentHistory); // getUserPaymentHistory

router.post("/admin/subtractWalletAmount", subtractWalletAmount); // subtractWalletAmount
router.get("/getuserbankInfo", getuserbankInfo); // for excel seet bankinfo
router.get("/get_payable_amount", get_payable_amount); // get_payable_amount
router.post("/notification/add", addNotification);
router.post("/notification/delete", deleteNotification);
router.post("/notification/get", getNotification);
router.get("/notification/last_notification", getLastNotification)
router.post("/notification/edit", editNotification);

// franchise
router.post("/franchise/approvalPackage", approval);
router.post("/franchise_kyc", franchise_kyc);
router.post("/franchiseWithdrawl", franchiseWithdrawl); // franchiseWithdrawl
router.post("/getFranchiseWithdrawl", getFranchiseWithdrawl); // getFranchiseWithdrawl
router.post("/franchise/getBuy_Package", getBuy_Package);
router.post("/franchise/get_package_request", getPackageRequest);
router.post("/userInfo", userInfo);
router.post("/admin/change_password_admin", change_password_admin);
router.post("/franchise_page", getFranchisePage);
router.post("/users_page", getUsersPage);
router.post("/kyc_page", getKYCPage);
router.post("/cashback_history_page", getCashbackHistoryPage);
router.post("/get_weekly_incomes", getWeeklyIncome);
router.get("/generate_weekly_income", generateWeeklyIncome),
router.get("/get_dashboard_data", getDashboardData);
router.get("/get_user_all_week_income", getUserAllWeekIncome);
router.get("/generate_daily_cashback", generateDailyCashbackAPI);
router.get("/week_wise_income", generateWeekWiseIncome);
router.get("/get_week_wise_income", getWeekWiseIncomeList);
router.post("/get_member_week_wise_income", getMemberWeekWiseIncomeList);
router.get("/get_matrix_plans", getMatrixPlans);
// router.get('/product/getcategory', getCategories)

// Roylty & club
router.post("/royalty_qualifing_level", royalty_qualifing_level);

// globle matrix
router.post("/admin/issue_globle_pin", globle_income);
router.post("/admin/get_matrix_user", get_matrix_user);

// Repurchase
router.post("/admin/repurchaseApproval", repurchaseApproval); // Repurchase
router.post("/admin/getrepurchaseApproval", getrepurchaseApproval); // Repurchase

// Support ticket
router.post("/admin/support_ticket_admin_reply", support_ticket_admin_reply);
router.post("/getsupportTicket", getsupportTicket);
router.post("/delete_ticket", delete_ticket);

//Bills
router.get("/generated_bills", generatedBills);

module.exports = router;
