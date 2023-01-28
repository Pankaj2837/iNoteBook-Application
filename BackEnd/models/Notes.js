import mongoose from 'mongoose';
const { Schema } = mongoose;
const NotesSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    discription : {
        type : String,
        required : true,
        unique: true
    },
    tag : {
        type : String,
        dafault : "General"
    },
    date : {
        type : String,
        dafault : Date.now
    }
  });
  module.exports = mongoose.model('notes',NotesSchema)