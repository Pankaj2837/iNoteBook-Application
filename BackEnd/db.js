const mongoose = require("mongoose");
const mongoURI =
  "mongodb://127.0.0.1:27017/test?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
const connectToMongo = async () => {
  await mongoose.connect(mongoURI, () => {
    console.log("connected to mongoose");
  });
};
module.exports = connectToMongo;
