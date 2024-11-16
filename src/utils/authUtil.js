const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const createHashPassword = async (userInfo) => {
  try{
    const salt = await createRandomSalt();
    const hashPassword = await passwordChangeToHash(userInfo.password, salt);
    userInfo.salt = salt;
    userInfo.hashPassword = hashPassword;
    return userInfo
  }catch(err){
    throw new Error('makeHashPassword Err', err)
  }  
}

const isMatchPassword = async (userInfo, password) => {
  try{
    if(userInfo.hashPassword == await passwordChangeToHash(password, userInfo.salt)){
      return true
    }
    return false
  }catch(err){
    throw new Error('isMatchPassword Err', err)
  }
}

const createRandomSalt = async () => {
  const salt = crypto.randomBytes(10).toString('base64');
  return salt
};


const passwordChangeToHash = async (password, salt) => { 
  const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
  return hashPassword
}

const createToken = async (id, email) => {
  const token = jwt.sign(
      {   
          id:id,
          email : email,
      }, 
      process.env.JWT_SECRET, 
      {expiresIn : '200m', issuer : 'dev1'}
  );
  return token
};
module.exports = {
  createHashPassword,
  isMatchPassword,
  createToken
}