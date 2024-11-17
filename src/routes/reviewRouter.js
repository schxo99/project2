const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {authToken} = require('../middlewares/authToken');
const {reivewValidation} = require('../middlewares/validations');

router
  .route('/:id?')
  .get(reviewController.getReview)
  .post(authToken, reivewValidation, reviewController.addReview)
  .put(authToken, reviewController.updateReview )
  .delete(authToken, reviewController.deleteReview)

module.exports = router;