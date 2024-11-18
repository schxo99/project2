const express = require('express');
const router = express.Router();
const {getSchedule, addSchedule, updateSchedule} = require('../controllers/scheduleController');
const {authToken} = require('../middlewares//authToken')
const {paramValidate} = require('../middlewares/validations');


router
  .route('/:id?')
  .get(authToken, paramValidate, getSchedule)
  .post(authToken, addSchedule)
  .put(authToken, updateSchedule)

module.exports = router;