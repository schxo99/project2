const {StatusCodes} = require('http-status-codes');
const scheduleService = require('../services/scheduleService')

const getSchedule = async (req,res) => {
  try{
    const {id} = req.params;
    const scheduleInfo = await scheduleService.getSchedule(id)
    return res.status(StatusCodes.OK).json(scheduleInfo)
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'});
  }
}

const addSchedule = async(req,res) => {
  try{
    const scheduleInfo = req.body;
    await scheduleService.addSchedule(scheduleInfo.schedules);
    const schedulesInfo = await scheduleService.getSchedule(scheduleInfo.schedules[0].tripId)
    return res.status(StatusCodes.OK).json(schedulesInfo)
  }catch(err){
    console.log(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({messgae: '서버 에러'})
  }
}

module.exports = {
  getSchedule,
  addSchedule
}