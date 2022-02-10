const express = require('express');
const {
    requireSignin
} = require('../common-middleware');


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

 





router.post('/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/updateUserInfo', requireSignin, updateUserInfo);
router.post('/forgot', forgetPassword);
router.post('/otp_match', otp_match);
router.post('/change_password', validateSignUpRequest, change_password);


// supportTicket

module.exports = router;