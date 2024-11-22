const db = require('../models');
const {createAccessToken, createRefreshToken, isMatchPassword, createHashPassword} = require('../utils/authUtil');
const authUtil = require('../utils/authUtil')
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

const findUser = async (email) => {
  try{
    const userInfo = await db.User.findOne({ where: { email: email }, raw: true });
    return userInfo
  }catch(err){
    throw new Error('userService findUser Err', err)
  }
}

const login = async (email, password) => {
  try{
    const userInfo = await findUser(email)
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

const changePassword = async(email, password, newPassword) => {
  try{
    const userInfo = await findUser(email)
    if(await isMatchPassword(userInfo, password) && password !== newPassword){
      const salt = await authUtil.createRandomSalt()
      const newHashPassword = await authUtil.passwordChangeToHash(newPassword, salt)
      await db.User.update({
        hashPassword: newHashPassword,
        salt: salt
      },
      {
        where: {email: email,}
      }
      );
      return true
    }
    return false
  }catch(err){
    throw new Error('userService changePassword Err', err)
  }
}

const deleteUser = async(email, password) => {
  try{
    const userInfo = await findUser(email)
    console.log(userInfo)
    console.log(password)
    if(await isMatchPassword(userInfo, password)){
      await db.DelUser.create({
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        gender: userInfo.gender,
        provider: userInfo.provider,
        createdAt: userInfo.createdAt,
        updatedAt: userInfo.updatedAt,
        deletedAt: userInfo.deletedAt,
      });

      await db.User.destroy({where: {id:userInfo.id}})
      return true;
    }
    return false
  }catch(err){
    console.log(err)
    throw new Error('userService deleteUser Err', err)
  }
}

module.exports = {
  createUser,
  login,
  logout,
  updateAccessToken,
  findUser,
  changePassword,
  deleteUser
};
