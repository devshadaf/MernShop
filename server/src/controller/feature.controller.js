const FeatureModel = require("../models/feature.model");

const handleFeatureList=async(req,res,next)=>{
    try {
        const data=await FeatureModel.find()
        res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        next(error)
    }
}

module.exports = handleFeatureList;