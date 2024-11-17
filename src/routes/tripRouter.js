const express = require('express');
const router = express.Router();
const tripController = require('../controllers/tripController');
const {authToken} = require('../middlewares//authToken')
const {createTripValidation, paramChangeToInt} = require('../middlewares/validations');

router
  .route('/:id?')
  .get(authToken, tripController.getTrips)
  .post(authToken, createTripValidation, tripController.createTrip)
  // .put(tripController.changeTrip) // 여행 수정
  .delete(authToken, paramChangeToInt, tripController.deleteTrip)

module.exports = router;