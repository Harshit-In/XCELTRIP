const { check, validationResult } = require('express-validator');
exports.validateSignUpRequest = [
    check('email')
    .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    .withMessage('Enter a valid email'),
    check('password')
    .isLength({ min: 6})
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage('password must be at least 6 character long and must contains uppercase and lowercase letters.')

]

exports.validateSignInRequest = [
    check('email').notEmpty().withMessage('username or email is required'),
    check('password').notEmpty().withMessage('password is required')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.status(400).json({ errors: errors.array()[0].msg })
    }
    next()
}