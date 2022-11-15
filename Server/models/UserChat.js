/*

  Author: Brandon

  This is the schema for user post

*/

const mongoose = require('mongoose');

const userChatSchema = new mongoose.Schema({
  senderID: {type:String, required: true},
  recieverID: {type:String, required: true},
  message: {type:String, required: true},
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('UserChat',userChatSchema);