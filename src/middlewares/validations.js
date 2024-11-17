const { body, validationResult, param } = require('express-validator');
const { StatusCodes} = require('http-status-codes')

const validate = (req,res,next) =>{
  const err = validationResult(req)

  if(err.isEmpty()){
    return next()
  }else{
    console.log(err)
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

const loginValidation = [
  body('email').isEmail(),
  body('password').isString(),
  validate
]

const createTripValidation = [
  body('name').isString(),
  body('description').isString(),
  body('startDate').isDate(),
  body('endDate').isDate(),
  validate
]

const paramChangeToInt = [
  param('id').optional().isInt().toInt(),
  validate
]

const scheduleValidation = [
  body('tripId').isInt(),
  body('placeId').isInt(),
  body('date').isInt(),
  body('orderId').isInt(),
  validate
]

const reivewValidation = [
  body('placeId').isInt(),
  body('description').isString(),
  validate
]

module.exports = {
  signupValidation,
  loginValidation,
  createTripValidation,
  paramChangeToInt,
  scheduleValidation,
  reivewValidation
}