const db = require('../models');

const createTrip = async (userInfo, tripInfo) => {
  try{
    await db.Trip.create({
      userId: userInfo.id,
      name: tripInfo.name,
      description: tripInfo.description,
      startDate: tripInfo.startDate,
      endDate: tripInfo.endDate,
      status: 0
    })
    return true;
  }catch(err){
    console.log(err)
    throw new Error('tripService createTrip Err', err)
  }
}

const findTripAll = async (id) => {
  try{
    const tripsInfo = db.Trip.findAll({
      where: {userId: id},
      order:[['id', 'ASC']]
    })
    return tripsInfo
  }catch(err){
    throw new Error('tripService findTripAll Err', err)
  }
}

const deleteTrip = async(id) => {
  try{
    await db.Trip.destroy({where: {id: id}})
    return true;
  }catch(err){
    throw new Error('tripService deleteTrip Err', err)
  }
}

const updateTrip = async(id, tripInfo) => {
  try{
    await db.Trip.update(
      {
        name: tripInfo.name,
        description: tripInfo.description,
        startDate: tripInfo.startDate,
        endDate: tripInfo.endDate
      },
      {
        where :{ id: id }
      }
    )
    return true
  }catch(err){
    throw new Error('tripService updateTrip Err', err)
  }
}

module.exports = {
  createTrip,
  findTripAll,
  deleteTrip,
  updateTrip
}