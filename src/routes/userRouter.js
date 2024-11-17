const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {signupValidation, loginValidation} = require('../middlewares/validations');
const { authToken, refreshToken } = require('../middlewares/authToken');


router.post('/signup', signupValidation, userController.signup);
router.post('/login', loginValidation, userController.login);
router.delete('/logout', authToken, userController.logout);
router.get('/refresh', refreshToken, userController.updateAccessToken);

module.exports = router;