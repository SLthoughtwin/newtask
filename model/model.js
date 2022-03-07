const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  resetToken:{
    type: String,
  },
  currentTime:Date,
  resetTime:{
    type: Date,
  },
  isVerified:{
    type:Boolean,
    default:false
  } 
},{timestamps:true})

const User = new mongoose.model('User',userSchema);
module.exports = User;