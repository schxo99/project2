const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController')
const {authToken} = require('../middlewares/authToken')
router
  .route('/')
  .post(authToken)
  .delete(authToken)

  module.exports = router;