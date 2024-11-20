const db = require('../models');

const getSchedule = async (tripId) => {
  try{
    const scheduleInfo = await db.Schedule.findAll({
      where: {
        tripId: tripId
      },
      order:[
        ['orderId', 'ASC']
      ],
    })
    return scheduleInfo
  }catch(err){
    throw new Error('scheduleService getSchedule Err', err)
  }
}

const addSchedule = async (scheduleInfo) => {
  // trip기간에 해당안되는 date가 들어오는 예외처리해야함
  console.log(scheduleInfo)
  try{
    console.log(scheduleInfo)
    for (const element of scheduleInfo) {
      await db.Schedule.create({
        tripId: element.tripId,
        date: element.date,
        type: element.type,
        description: element.description,
        startTime: element.startTime,
        endTime: element.endTime,
        orderId: element.orderId
      });
    }
    return true
  }catch(err){
    throw new Error('scheduleService addSchedule Err', err)
  }
}

const deleteSchedule = async(schedules) => {
  try{
    for(const element of schedules) {
      await db.Schedule.destroy({
        where: {
          id: element.id
        }
      })
    }
    return true
  }catch(err){
    console.log(err)
    throw new Error('scheduleService deleteSchedule Err', err)
  }
}

module.exports = {
  getSchedule,
  addSchedule,
  deleteSchedule
}