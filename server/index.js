require("dotenv").config();
const express=require("express")
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnect = require("./src/config/dbConnect");
const { PORT } = require("./src/utilities/constant");
const route = require("./src/routes/routes");

const app = express()

// Middlewares
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// DataBase Connection
dbConnect();

// Routes
app.use("/api/v1", route)
app.use((err,req,res,next)=>{
  res.status(401).json({
    success: false,
    message: err.message,
  });
})

// Server Configuration
app.listen(PORT, () => {
  console.log("Server Connected Successfully");
});