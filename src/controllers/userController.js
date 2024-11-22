const { StatusCodes } = require("http-status-codes");
const userService = require('../services/userService')

const signup = async (req,res) => {
  const userInfo = req.body; // userInfo = {name, email, password, gender, provider}
  try{
    if(await userService.createUser(userInfo)){
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
    const tokens = await userService.login(email, password);
    console.log(tokens)
    if(tokens){
      res.header('Authorization', `Bearer ${tokens.accessToken}`);
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true, 
      });
      return res.status(StatusCodes.OK).json({message:'로그인'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message:'로그인 실패'})
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const fbLogin = async (req,res) => {
  const userInfo = req.userInfo;
  console.log("fbLogin userInfo", userInfo);

  try{
    let checkFbsignup = await userService.fblogin(userInfo);
    
    if(checkFbsignup){
      return res.status(StatusCodes.OK).json({message:'로그인 성공'})
    }else if(!checkFbsignup){
      return res.status(StatusCodes.CREATED).json({message:'회원등록 및 로그인 성공'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message:'로그인 실패'})
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const logout = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    console.log(userInfo)
    await userService.logout(userInfo.id)
    return res.status(StatusCodes.OK).json({message:'로그아웃'})
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const updateAccessToken = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const newAccessToken = await userService.updateAccessToken(userInfo)
    res.header('Authorization', `Bearer ${newAccessToken}`);
    return res.status(StatusCodes.OK).json({message:'accessToken 재발행 완'})
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  signup,
  login,
  logout,
  updateAccessToken,
  fbLogin
};