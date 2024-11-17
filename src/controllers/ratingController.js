const {StatusCodes} = require('http-status-codes');
const ratingController = require('../services/ratingService')

const addRating = async(req,res) => {
  try{
    
  }catch(err){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'서버에러'})
  }
}

module.exports = {

}