require("dotenv").config();
const express=require("express")
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./src/config/dbConnect");
const { PORT } = require("./src/utilities/constant");

const app = express()

// Middlewares
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(express.json());

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// DataBase Connection
dbConnect();

// Server Configuration
app.listen(PORT, () => {
  console.log("Server Connected Successfully");
});