const mongoose = require('mongoose');
const {Schema}=mongoose;
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default:"General"
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
    
  });
//user is the model name here and Userschema is the name of the schema which we are sending 
  module.exports=mongoose.model('notes',NotesSchema)