const express = require('express');
const router = express.Router();
const {signup, login, logout, updateAccessToken} = require('../controllers/userController');
const {signupValidate, loginValidate} = require('../middlewares/validations');
const { authToken, refreshToken } = require('../middlewares/authToken');


router.post('/signup', signupValidate, signup);
router.post('/login', loginValidate, login);
router.delete('/logout', authToken, logout);
router.get('/refresh', refreshToken, updateAccessToken);

// router
//   .route('/account')
//   .put() // 회원정보 수정
//   .delete() //탈퇴

module.exports = router;