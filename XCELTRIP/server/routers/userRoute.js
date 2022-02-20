const express = require('express');
const {
    requireSignin
} = require('../common-middleware');
const { creacteTopup, fundTransferUserToUser, currentInvestment } = require('../Controllers/pinissueController');


const {
    signup,
    signin,
    updateUserInfo,
    forgetPassword,
    otp_match,
    change_password
} = require('../Controllers/userController');
const { diret_and_direct_childlength } = require('../functions/function');
const {
    isRequestValidated,
    validateSignUpRequest,
    validateSignInRequest
} = require('../validator/auth');
const router = express.Router();

 




// authantication 
router.post('/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/updateUserInfo', requireSignin, updateUserInfo);
router.post('/forgot', forgetPassword);
router.post('/otp_match', otp_match);
router.post('/change_password', validateSignUpRequest, change_password);

// pin issue and fund 
router.post('/createTopup', creacteTopup);
router.post('/fundTransferUserToUser', fundTransferUserToUser);
router.post('/currentInvestment', currentInvestment);


// test rout
router.post('/diret_and_direct_childlength', diret_and_direct_childlength);




module.exports = router;