const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const {authToken} = require('../middlewares//authToken')
const {paramChangeToInt} = require('../middlewares/validations');


router
  .route('/:id?')
  .get(authToken, paramChangeToInt, scheduleController.getSchedule)
  .post(authToken, scheduleController.addSchedule)
//   .put() //스케쥴 수정
//   .delete() //스케쥴 삭제

module.exports = router;