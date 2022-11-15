/*

  Author: Brandon

  This is the schema for user post

*/

const mongoose = require('mongoose');

const userPostSchema = new mongoose.Schema({
  userID: {type:String, required: true},
  userName: {type:String, required: true},
  message: {type:String, required: true},
  tags: [String],
})

module.exports = mongoose.model('UserPost',userPostSchema);