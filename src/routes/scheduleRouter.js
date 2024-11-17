const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const {authToken} = require('../middlewares//authToken')
const {paramChangeToInt} = require('../middlewares/validations');


router
  .route('/:id?')
  .get(authToken, paramChangeToInt, scheduleController.getSchedule)
  .post(authToken, scheduleController.addSchedule)
//   .put()
//   .delete()

module.exports = router;