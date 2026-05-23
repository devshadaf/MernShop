const ProfileModel = require("../models/profile.model");

const handleSaveProfile=async(req,res,next)=>{
    try {
        const userId=req.user._id
        const body=req.body
        body.userID = userId;

       await ProfileModel.updateOne(
         { userID: userId },
         { $set: body },
         { upsert: true },
       );

       res.status(200).json({
        success:true,
        message:"Profile Save Sucessfull"
       })

    } catch (error) {
        next(error)
    }
}

const handleReadProfile = async (req, res, next) => {
    try {
        const userId=req.user._id
        const user = await ProfileModel.findOne({ userID: userId });
        res.status(200).json({
            success:true,
            data:user
        })
    } catch (error) {
        next(error)
    }
};

module.exports = { handleSaveProfile, handleReadProfile };