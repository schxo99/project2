const {StatusCodes} = require('http-status-codes');
const tripService = require('../services/tripService');

const createTrip = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const tripInfo = req.body;
    if(await tripService.createTrip(userInfo, tripInfo)){
      const tripsInfo = await tripService.findTripAll(userInfo.id)
      return res.status(StatusCodes.OK).json(tripsInfo)
    }
    throw new Error('등록실패')
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const getTrips = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const tripsInfo = await tripService.findTripAll(userInfo.id)
    return res.status(StatusCodes.OK).json(tripsInfo)
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const deleteTrip = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const {id} = req.params;

    await tripService.deleteTrip(id)
    const tripsInfo = await tripService.findTripAll(userInfo.id)
    return res.status(StatusCodes.OK).json(tripsInfo)
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  createTrip,
  getTrips,
  deleteTrip,
}