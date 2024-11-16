const { StatusCodes } = require('http-status-codes');
const db = require('../models');
const authUtil = require('../utils/authUtil');

const signup = async (userInfo) => {
  try{
    userInfo = await authUtil.createHashPassword(userInfo);
    await db.User.create({
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      hashPassword: userInfo.hashPassword,
      provider: userInfo.provider,
      salt: userInfo.salt
    });
    return true;
  }catch(err){
    return false
  }
};

const login = async (email, password) => {
  const userInfo = await db.User.findOne({ where: { email }, raw: true });
  if(userInfo && await authUtil.isMatchPassword(userInfo, password)){
    const token = authUtil.createToken(userInfo.id, userInfo.email)
    return token
  }
  return false
};

module.exports = {
  signup,
  login
};
