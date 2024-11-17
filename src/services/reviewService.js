const db = require('../models');

const addReview = async (userId, reviewInfo) => {
  try{
    await db.Review.create({
      userId: userId,
      placeId: reviewInfo.placeId,
      description: reviewInfo.description,
      status: 1
    })
    return
  }catch(err){
    throw new Error('reviewService addReview Err', err) 
  }
}

const getReview = async (id) => {
  try{
    const reviews = await db.Review.findAll({
      where: {
        placeId: id,
        status: 1        
      }, raw: true
    })
    return reviews
  }catch(err){
    throw new Error('reviewSercie getReview Err', err)
  }
}

const deleteReview = async(id) => {
  try{
    await db.Review.destroy({
      where: {id: id}
    })
    return
  }catch(err){
    throw new Error('reviewService deleteReview Err', err)
  }
}

const updateReview = async(id, description) => {
  try{
    await db.Review.update(
      {description: description},
      {where: {id: id}
    })
  return
  }catch(err){
    throw new Error('reviewService updateReview Err', err)
  }
}

module.exports = {
  addReview,
  getReview,
  deleteReview,
  updateReview
}