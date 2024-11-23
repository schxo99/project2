const {StatusCodes} = require('http-status-codes');
const tripService = require('../services/tripService');
const {getSchedule} = require('../services/scheduleService');

const createTrip = async (req,res) => {
  try{
    const userInfo = req.userInfo;
    const tripInfo = req.body;

    if(await tripService.createTrip(userInfo, tripInfo)){
      return res.status(StatusCodes.CREATED).json({message:"생성 완료"})
    }
    throw new Error('등록 실패')
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const getTrips = async (req,res) => {
  try{
    const {id} = req.params;
    const userInfo = req.userInfo;
    let tripInfo
    if(id){
      tripInfo = await getSchedule(id);
    }else{
      tripInfo = await tripService.findTripAll(userInfo.id)
    }
    return res.status(StatusCodes.OK).json(tripInfo)
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

const updateTrip = async (req,res) => {
  try{
	  const {id} = req.params;
    const tripInfo = req.body;
    const userInfo = req.userInfo;
    if(await tripService.updateTrip(id, tripInfo)){
      const tripsInfo = await tripService.findTripAll(userInfo.id)
      return res.status(StatusCodes.OK).json(tripsInfo);
    }
    return res.status(StatusCodes.BAD_REQUEST).json({message: '업뎃 실패'})
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

module.exports = {
  createTrip,
  getTrips,
  deleteTrip,
  updateTrip
}