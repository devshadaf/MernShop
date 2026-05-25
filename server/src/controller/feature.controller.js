const FeatureModel = require("../models/feature.model");
const LegalModel = require("../models/legal.model");

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

const handleLegal = async (req, res, next) => {
    try {
        const type=req.params.type
        const data=await LegalModel.find({type:type})
        res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        next(error)
    }
};

module.exports = { handleFeatureList, handleLegal };