const { StatusCodes } = require("http-status-codes");
const userService = require('../services/userService')

const signup = async (req,res) => {
  const userInfo = req.body;
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

const findUserInfo = async (req,res) => {
  try{
    let userInfo = req.userInfo;
    userInfo = await userService.findUser(userInfo.email)
    return res.status(StatusCodes.OK).json({
      id: userInfo.id,
      email: userInfo.email,
      gender: userInfo.gender,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      provider: userInfo.provider
    })
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const changePassword = async(req,res) => {
  try{
    const userInfo = req.userInfo;
    const {password, newPassword} = req.body;
    console.log(userInfo)
    console.log(password, newPassword)
    if(await userService.changePassword(userInfo.email, password, newPassword)){
      return res.status(StatusCodes.OK).json({message:'비밀번호 변경완료'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message:'잘못된 요청입니다.'})
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const deleteUser = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const {password} = req.body;
    if(await userService.deleteUser(userInfo.email, password)){
      return res.status(StatusCodes.OK).json({message:'탈퇴 되었습니다.'})
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message: '잘못된 정보입니다.'})
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}
module.exports = {
  signup,
  login,
  logout,
  updateAccessToken,
  findUserInfo,
  changePassword,
  deleteUser
};