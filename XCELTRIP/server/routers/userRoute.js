const express = require("express");
const { requireSignin } = require("../common-middleware");
const {
  creacteTopup,
  fundTransferUserToUser,
  currentInvestment,
  createInvestment,
  getTopUpInvestment,
  getcreateInvestment,
  fundInvestmentToCoin,
  getCashback,
} = require("../Controllers/pinissueController");

const {
  signup,
  signin,
  updateUserInfo,
  forgetPassword,
  otp_match,
  change_password,
  widthdrawl,
} = require("../Controllers/userController");
const { diret_and_direct_childlength } = require("../functions/function");
const {
  isRequestValidated,
  validateSignUpRequest,
  validateSignInRequest,
  validateTransaction,
} = require("../validator/auth");
const router = express.Router();

// authantication
router.post("/signup", signup);
router.post("/signin", validateSignInRequest, isRequestValidated, signin);
router.post("/updateUserInfo", requireSignin, updateUserInfo);
router.post("/forgot", forgetPassword);
router.post("/otp_match", otp_match);
router.post("/change_password", validateSignUpRequest, isRequestValidated, change_password);

// pin issue and fund
router.post("/investment", createInvestment);
router.post("/getcreateInvestment", getcreateInvestment);
router.post("/createTopup", validateTransaction, creacteTopup);
router.post("/fundTransferUserToUser", validateTransaction, fundTransferUserToUser);
router.post("/currentInvestment", validateTransaction, getTopUpInvestment);
router.post("/widthdrawl", validateTransaction, widthdrawl);
router.post("/getCashback", getCashback);
router.post("/fundInvestmentToCoin", fundInvestmentToCoin);

// test rout
router.post("/diret_and_direct_childlength", diret_and_direct_childlength);

module.exports = router;
