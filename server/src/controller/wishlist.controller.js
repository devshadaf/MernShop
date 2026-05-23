const WishListModel = require("../models/wishList.model");


const handleSaveWishList=async(req,res,next)=>{
    try {
        const userID=req.user._id

        const body=req.body
        body.userID = userID;

        await WishListModel.updateOne({ userID },{$set:body},{upsert:true});
        res.status(200).json({
            success:true,
            message:"Wishlist Save Successfully"
        })

    } catch (error) {
        next(error)
    }
}

const handleRemoveWishList = async (req, res, next) => {
    try {
        const userID = req.user._id;
        const body=req.body
        body.userID = userID;

   await WishListModel.deleteOne(body );
           res.status(200).json({
             success: true,
             message: "Wishlist Remove Successfully",
           });

    } catch (error) {
        next(error)
    }
};

const getAllWishList = async (req, res, next) => {
    try {
      const user=req.user._id

      const matchStage = { $match: { userID :user} };

      const joinWithProductStage = {
        $lookup: { from: "products", localField: "productID", foreignField:"_id", as:"product"},
      };
      const unwindProductStage = { $unwind: "$product" };

      const joinWithBrandStage = {
        $lookup: {
          from: "brands",
          localField: "product.brandID",
          foreignField: "_id",
          as: "brand",
        },
      };
      const unwindBrandStage = { $unwind: "$brand" };

      const joinWithCategoryStage = {
        $lookup: {
          from: "categories",
          localField: "product.categoryID",
          foreignField: "_id",
          as: "category",
        },
      };
      const unwindCategoryStage = { $unwind: "$category" };

      const projectionStage = {
        $project: {
          _id: 0,
          userID: 0,
          createdAt: 0,
          productID: 0,
          brandID: 0,
          updatedAt: 0,
          "product.categoryID":0,
          "product.brandID":0,
          "product._id": 0,
          "product.createdAt": 0,
          "product.updatedAt": 0,
          "brand._id": 0,
          "brand.createdAt": 0,
          "brand.updatedAt": 0,
          "category._id": 0,
          "category.createdAt": 0,
          "category.updatedAt": 0,
        },
      };

      const data = await WishListModel.aggregate([
        matchStage,
        joinWithProductStage,
        unwindProductStage,
        joinWithBrandStage,
        unwindBrandStage,
        joinWithCategoryStage,
        unwindCategoryStage,
        projectionStage,
      ]);  

      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
        next(error)
    }
};

module.exports = { handleSaveWishList, handleRemoveWishList, getAllWishList };