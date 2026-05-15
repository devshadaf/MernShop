const jwt=require("jsonwebtoken")
const { JWTSecret } = require("../utilities/constant")

const EncodeToken=(user)=>{
    return jwt.sign({id:user._id,email:user.email},JWTSecret,{expiresIn:"7d"})
}

const DecodeToken=(token)=>{
    return jwt.verify(token,JWTSecret)
}

module.exports = { EncodeToken, DecodeToken };