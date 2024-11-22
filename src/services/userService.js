const db = require('../models');
const {createAccessToken, createRefreshToken, isMatchPassword, createHashPassword} = require('../utils/authUtil');

const createUser = async (userInfo) => {
  try{
    userInfo = await createHashPassword(userInfo);
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
  try{
    const userInfo = await db.User.findOne({ where: { email: email }, raw: true });
    await logout(userInfo.id)
    if(userInfo && await isMatchPassword(userInfo, password)){
      const accessToken = await createAccessToken(userInfo)
      const refreshToken = await createRefreshToken(userInfo)
      await db.Token.create({
        userId: userInfo.id,
        token: refreshToken
      });
      return {accessToken: accessToken, refreshToken: refreshToken};
    }
    return false
  }catch(err){
    console.log(err)
    throw new Error('userService login Err', err)
  }
};

const fblogin = async (userInfo) => {
  try{
    const findUserInfo = await db.User.findOne({ where: { id: userInfo.id }, raw: true });
    
    if(!findUserInfo){
      await db.User.create({
        id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
      });

      return false;
    }

    return true;
  }catch(err){
    console.log(err)
    throw new Error('userService login Err', err)
  }
};

const logout = async(id) => {
  try{
    await db.Token.destroy({where: {userId:id}})
    return true
  }catch(err){
    return "오류나도 어쩔건데"
  }
}

const updateAccessToken = async(userInfo) => {
  try{
    const accessToken = await createAccessToken(userInfo)
    return accessToken;
  }catch(err){
    throw new Error('userService updateAccessToken Err', err)
  }
}
module.exports = {
  createUser,
  login,
  logout,
  updateAccessToken,
  fblogin
};
