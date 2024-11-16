const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const userService = require('../services/userService')

const signup = async (req,res) => {
  const userInfo = req.body; // userInfo = {name, email, password, gender, provider}
  try{
    if(await userService.signup(userInfo)){
      return res.status(201).json({message:'가입완료'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message:'중복된 이메일입니다.'})
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
};

const login = async (req,res) => {
  const { email, password } = req.body;
  try{
    const token = await userService.login(email, password);
    if(token){
      console.log(token)
      res.header({token: token})
      return res.status(StatusCodes.OK).json({message:'로그인'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message:'로그인 실패'})
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  signup,
  login
};