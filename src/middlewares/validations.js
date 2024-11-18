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

const signupValidate = [
  body('name').isString(),
  body('email').isEmail(),
  body('password').isString().isLength({min: 4}),
  body('gender').isIn(['male','femaile']),
  body('provider').isString(),
  validate
];

const loginValidate = [
  body('email').isEmail(),
  body('password').isString(),
  validate
]

const createTripValidate = [
  body('name').isString(),
  body('description').isString(),
  body('startDate').isDate(),
  body('endDate').isDate(),
  validate
];

const paramValidate = [
  param('id').optional().isInt().toInt(),
  validate
];

const scheduleValidate = [
  body('tripId').isInt(),
  body('date').isInt(),
  body('type').isIn(['메모','장소','식당','카페','교통','숙소']),
  body('description').optional().isString(),
  body('startTime').optional().isTime(),
  body('endTime').optional().isTime(),
  body('orderId').isInt(),
  validate
];

module.exports = {
  signupValidate,
  loginValidate,
  createTripValidate,
  paramValidate,
  scheduleValidate,
};