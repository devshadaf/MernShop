const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default:0
  },
},{timestamps:true, versionKey:false});

const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
