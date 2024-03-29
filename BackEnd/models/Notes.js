const mongoose = require("mongoose");
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref :"user"
    },
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