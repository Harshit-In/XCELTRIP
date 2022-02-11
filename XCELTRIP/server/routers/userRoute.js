const express = require('express');
const {
    requireSignin
} = require('../common-middleware');
const { creacteTopup, fundTransferUserToUser } = require('../Controllers/pinissueController');


const {
    signup,
    signin,
    updateUserInfo,
    forgetPassword,
    otp_match,
    change_password
} = require('../Controllers/userController');
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
router.post('/creacteTopup', creacteTopup);
router.post('/fundTransferUserToUser', fundTransferUserToUser);





module.exports = router;