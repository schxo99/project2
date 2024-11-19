const express = require('express');
const router = express.Router();
const {getTrips, createTrip, deleteTrip, updateTrip} = require('../controllers/tripController');
const {authToken} = require('../middlewares//authToken')
const {tripValidate, paramValidate} = require('../middlewares/validations');

router
  .route('/:id?')
  .get(authToken, paramValidate, getTrips)
  .post(authToken, tripValidate, createTrip)
  .put(authToken, tripValidate, updateTrip) // 여행 수정
  .delete(authToken, paramValidate, deleteTrip)

module.exports = router;