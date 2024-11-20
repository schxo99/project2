const express = require('express');
const router = express.Router();
const {getTrips, createTrip, deleteTrip, updateTrip} = require('../controllers/tripController');
const {authToken} = require('../middlewares//authToken')
const {tripValidate, paramValidate} = require('../middlewares/validations');

router
  .route('/:id?')
  .get(authToken, paramValidate, getTrips)
  .put(authToken, updateTrip)
  .post(authToken, tripValidate, createTrip)
  .delete(authToken, paramValidate, deleteTrip)

module.exports = router;