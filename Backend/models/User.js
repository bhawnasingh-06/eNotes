const mongoose = require('mongoose');
const {Schema}=mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
    
  });
//user is the model name here and Userschema is the name of the schema which we are sending 
const User=mongoose.model('user',UserSchema);
User.createIndexes();
  module.exports=User;