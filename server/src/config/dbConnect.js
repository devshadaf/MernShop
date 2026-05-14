const mongoose = require("mongoose");
const { DBUrl } = require("../utilities/constant");

function dbConnect() {
  mongoose
    .connect(DBUrl)
    .then(() => console.log("MongoDB Connected Sucessfully."))
    .catch((err) => console.log(err));
}

module.exports=dbConnect