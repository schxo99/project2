const express = require('express');
const router = express.Router();
const {getTrips, createTrip, deleteTrip, updateTrip} = require('../controllers/tripController');
const {authToken} = require('../middlewares//authToken')
const {createTripValidate, paramValidate} = require('../middlewares/validations');

router
  .route('/:id?')
  .get(authToken, paramValidate, getTrips)
  .post(authToken, createTripValidate, createTrip)
  .put(authToken, updateTrip)
  .delete(authToken, paramValidate, deleteTrip)

module.exports = router;