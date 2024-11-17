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
    throw new Error('tripService getSchedule Err', err)
  }
}

const addSchedule = async (scheduleInfo) => {
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