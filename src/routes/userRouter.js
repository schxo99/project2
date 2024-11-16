const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {signupValidation, loginValiation} = require('../middlewares/validations');


router.post('/signup', signupValidation, userController.signup);
router.post('/login', loginValiation, userController.login);

module.exports = router;