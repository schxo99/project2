const {StatusCodes} = require('http-status-codes');
const reviewService = require('../services/reviewService');

const addReview = async(req,res) => {
  try{
    const userInfo = req.userInfo
    const reviewInfo = req.body;

    await reviewService.addReview(userInfo.id, reviewInfo);
    const reviews = await reviewService.getReview(reviewInfo.placeId)
    return res.status(StatusCodes.OK).json(reviews)
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const getReview = async(req,res) => {
  try{
    const {id} = req.params;
    const reivews = await reviewService.getReview(id)
    return res.status(StatusCodes.OK).json({reivews})
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const deleteReview = async(req,res) => {
  try{
    const reviewInfo = req.body;
    await reviewService.deleteReview(reviewInfo.id)
    const reivews = await reviewService.getReview(reviewInfo.placeId)
    return res.status(StatusCodes.OK).json(reivews)
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버 에러'})
  }
}

const updateReview = async(req,res) => {
  try{
    const reviewInfo = req.body;
    await reviewService.updateReview(reviewInfo.id, reviewInfo.description)
    const reviews = await reviewService.getReview(reviewInfo.placeId)
    return res.status(StatusCodes.OK).json(reviews)
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버에러'})
  }
}
module.exports = {
  addReview,
  getReview,
  deleteReview,
  updateReview
}