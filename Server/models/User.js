/*

  Author: Brandon

  This is the schema for user accounts

*/

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name:  {type:String, required: true},
  password: {type:String, required: true},
  email: {type:String, required: true},
  ID: {type:Number, required: true},
  balance: {type:Number},
  friendsList: [Number],
  validated: {type:Boolean},
  profileURL: {type: String},
  profileType: {type:Number, required: true},
  tutorSubjects: [String],
  dateCreated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User',UserSchema);
//Add Plaid Info