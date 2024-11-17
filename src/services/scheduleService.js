const db = require('../models');

const getSchedule = async (tripId) => {
  try{
    const scheduleInfo = await db.Schedule.findAll({
      where: {
        tripId: tripId
      }
    })
    return scheduleInfo
  }catch(err){
    throw new Error('scheduleService getSchedule Err', err)
  }
}

const addSchedule = async (scheduleInfo) => {
  // trip기간에 해당안되는 date가 들어오는 예외처리해야함
  try{
    console.log(scheduleInfo)
    scheduleInfo.forEach(async (element)  => {
      await db.Schedule.create({
        tripId: element.tripId,
        placeId: element.placeId,
        date: element.date,
        orderId: element.orderId
      })
    });
    return
  }catch(err){
    throw new Error('scheduleService addSchedule Err', err)
  }
}

module.exports = {
  getSchedule,
  addSchedule
}