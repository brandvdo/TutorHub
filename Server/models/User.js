/*

  Author: Brandon

  This is the schema for user accounts

*/

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:  {type:String, required: true},
  password: {type:String, required: true},
  email: {type:String, required: true},
  balance: {type:Number},
  friendsList: [Number],
  validated: {type:Boolean},
  profileURL: {type: String},
  profileType: {type:Number, required: true},
  tutorSubjects: [String],
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User',userSchema);
//Add Plaid Info