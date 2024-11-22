const { verifyToken } = require('../utils/authUtil');
const { StatusCodes } = require('http-status-codes');
const authUtil = require('../utils/authUtil');
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const authToken = async (req,res,next) => {
  try{
    const accessToken = req.headers.authorization?.split(' ')[1];

    //authUtil로 빼고 싶음...
    await admin.auth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        decodedToken = {...decodedToken, id: decodedToken.uid}
        req.userInfo = decodedToken;
        next()
      })
      .catch((error) => {
        console.log("authToken userInfo Error!!!!: ", error);
        res.status(StatusCodes.UNAUTHORIZED).json({message:'유효하지 않은 토큰'})
      });

  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae:'서버 에러'})
  }
}

const refreshToken = async (req,res,next) => {
  try{
    const refreshToken = req.headers.refresh?.split(' ')[1];
    if(!await authUtil.isMatchRefreshToken(refreshToken)){
      return res.status(StatusCodes.FORBIDDEN).json({message:'다시 로그인하세요~'})
    }
    const userInfo = await verifyToken(refreshToken)
    req.userInfo = userInfo
    next()
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  authToken,
  refreshToken
}