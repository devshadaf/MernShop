const UserModel = require("../models/user.model");
const sendEmail = require("../service/Email.service");
const { EncodeToken } = require("../service/Token.service");

const getUserLogin=async(req,res,next)=>{
    try {
        const email=req.params.email
        const generateOTP = Math.floor(Math.random() * 900000 + 100000);
        await UserModel.updateOne({ email }, { $set: { otp: generateOTP } },{upsert:true});

        const emailOption={
            to:email,
            subject:"Verification OTP for MernShop ",
            body:`Your Verification 6 digit code is = ${generateOTP}`
        }

        sendEmail(emailOption);

        res.status(200).json({
            success:true,
            message:"6 digits OTP code sent to your email"
        })

    } catch (error) {
        next(error)
    }
}

const getVerifiyLogin = async (req, res, next) => {
    try {
        const {email,otp}=req.params
        const user=await UserModel.findOne({email,otp})

        if (user) {
          const user = await UserModel.findOne({ email });
          const token = EncodeToken(user);

          res.cookie("token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
          });

          await UserModel.updateOne({ email }, { $set: { otp: 0 } });

          return res.status(200).json({
            success: true,
            message: "Login Successfull",
          });
        } else {
          return res.status(400).json({
            success: false,
            message: "Invalid Request",
          });
        }

    } catch (error) {
        next(error)
    }
};

const getUserLogout = async (req, res, next) => {
    try {
        req.user=null
            res.cookie("token", "", {
              expires: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              httpOnly: true,
            });
        
        res.status(200).json({
            success:true,
            message:"Logout Sucessfull"
        })
    } catch (error) {
        next(error)
    }
};

const getAuthVerify = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

module.exports = {
  getUserLogin,
  getVerifiyLogin,
  getUserLogout,
  getAuthVerify,
};