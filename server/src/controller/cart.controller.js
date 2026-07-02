const CartModel = require("../models/cart.model");
const mongoose=require("mongoose")
const objectID=mongoose.Types.ObjectId

const handleSaveCartList=async(req,res,next)=>{
    try {
        const userID=req.user._id
        const body=req.body
        body.userID = userID;

        await CartModel.create(body)
        res.status(201).json({
            success:true,
            message:"Add to Cart Successfully"
        })

    } catch (error) {
        next(error)
    }
}

const handleRemoveCartList = async (req, res, next) => {
    try {
        const CartID = new objectID(req.params.CartID);
        const userId = new objectID(req.user._id);
        await CartModel.deleteOne({ _id: CartID, userID: userId });
        res.status(200).json({
          success: true,
          message: "Remove to Cart Successfully",
        });
    } catch (error) {
        next(error)
    }
};

const handleUpdateCartList = async (req, res, next) => {
    try {
        const CartID = new objectID(req.params.CartID);
        const userId = new objectID(req.user._id);
        const body=req.body

         await CartModel.updateOne({ _id: CartID, userID: userId },{$set:body});

         res.status(200).json({
                  success: true,
          message: "Update Cart Successfully",
        });
    } catch (error) {
        next(error)
    }
};

const handleCartList = async (req, res, next) => {
    try {
        const userID=new objectID(req.user._id)

        const matchStage={$match:{userID:userID}}

        const joinWithProduct = {
          $lookup: { from: "products", localField: "productID", foreignField :"_id",as:"product"},
        };
        const unwindProductStage={$unwind:"$product"}

        const joinWithBrand = {
          $lookup: {
            from: "brands",
            localField: "product.brandID",
            foreignField: "_id",
            as: "brand",
          },
        };
        const unwindBrandStage = { $unwind: "$brand" };

        const joinWithCategory = {
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
            userID: 0,
            createdAt: 0,
            updatedAt: 0,
            "product.createdAt": 0,
            "product.updatedAt": 0,
            "product._id": 0,
            "brand.createdAt": 0,
            "brand.updatedAt": 0,
            "brand._id": 0,
            "category.createdAt": 0,
            "category.updatedAt": 0,
            "category._id": 0,
            "product.brandID": 0,
            "product.categoryID": 0,
          },
        };

        const data = await CartModel.aggregate([
          matchStage,
          joinWithProduct,
          unwindProductStage,
          joinWithBrand,
          unwindBrandStage,
          joinWithCategory,
          unwindCategoryStage,
          projectionStage,
        ]);

        res.status(200).json({
            success:true,
            data:data
        })

    } catch (error) {
        next(error)
    }
};



module.exports = {
  handleSaveCartList,
  handleRemoveCartList,
  handleUpdateCartList,
  handleCartList,
};