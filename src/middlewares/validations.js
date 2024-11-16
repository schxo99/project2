const { body, validationResult } = require('express-validator');
const { StatusCodes} = require('http-status-codes')

const validate = (req,res,next) =>{
  const err = validationResult(req)

  if(err.isEmpty()){
    return next()
  }else{
    return res.status(StatusCodes.BAD_REQUEST).json(err.array())
  }
}

const signupValidation = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({min: 4}),
  body('gender').isIn(['male','femaile']),
  body('provider').isString(),
  validate
];

const loginValiation = [
  body('email').isEmail(),
  body('password').isString(),
  validate
]

module.exports = {
  signupValidation,
  loginValiation
}