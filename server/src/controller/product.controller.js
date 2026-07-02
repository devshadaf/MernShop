const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const BrandModel = require("../models/brand.model");
const CategoryModel = require("../models/category.model");
const ProductSliderModel = require("../models/productSlider.model");
const ProductModel = require("../models/product.model");
const ProductDetailModel = require("../models/productDetail.model");
const ReviewModel = require("../models/review.model");

const getProductBrandList = async (req, res, next) => {
  try {
    const data = await BrandModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductCategoryList = async (req, res, next) => {
  try {
    const data = await CategoryModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductSliderList = async (req, res, next) => {
  try {
    const data = await ProductSliderModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductListByBrand = async (req, res, next) => {
  try {
    const brandId = new objectId(req.params.BrandID);

    const matchStage = { $match: { brandID: brandId } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      unwindBrandStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductListByCategory = async (req, res, next) => {
  try {
    const CategoryID = new objectId(req.params.CategoryID);

    const matchStage = { $match: { categoryID: CategoryID } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      unwindBrandStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductListBySmilier = async (req, res, next) => {
  try {
    const CategoryID = new objectId(req.params.CategoryID);

    const matchStage = { $match: { categoryID: CategoryID } };
    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      unwindBrandStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductListByKeyword = async (req, res, next) => {
  try {
    const Keyword = req.params.Keyword;
    const searchRegex = { $regex: Keyword, $options: "i" };

    const matchStage = {
      $match: { $or: [{ title: searchRegex }, { shortDes: searchRegex }] },
    };

    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      unwindBrandStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductListByRemark = async (req, res, next) => {
  try {
    const Remark = req.params.Remark;

    const matchStage = { $match: { remark: Remark } };

    const joinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    const unwindBrandStage = { $unwind: "$brand" };

    const joinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };
    const data = await ProductModel.aggregate([
      matchStage,
      joinWithBrandStage,
      unwindBrandStage,
      joinWithCategoryStage,
      unwindCategoryStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductDetails = async (req, res, next) => {
  try {
    const ProductID = new objectId(req.params.ProductID);
    const matchStage = { $match: { productID: ProductID } };

    const joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
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
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        productID: 0,
        "product.createdAt": 0,
        "product.updatedAt": 0,
        "product.brandID": 0,
        "product.categoryID": 0,
        "brand.createdAt": 0,
        "brand.updatedAt": 0,
        "category.createdAt": 0,
        "category.updatedAt": 0,
      },
    };

    const data = await ProductDetailModel.aggregate([
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
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getProductReviewList = async (req, res, next) => {
  try {
    const ProductID = new objectId(req.params.ProductID);
    const matchStage = { $match: { productID: ProductID } };

    const joinWithUserstage = {
      $lookup: {
        from: "users",
        localField: "userID",
        foreignField: "_id",
        as: "user",
      },
    };
    const unwindUserStage = { $unwind: "$user" };

    const joinWithProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: "$product" };

    const projectionStage = {
      $project: {
        _id: 0,
        productID: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "user.createdAt": 0,
        "user.updatedAt": 0,
        "user.otp": 0,
        "product.createdAt": 0,
        "product.updatedAt": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
      },
    };

    const data = await ReviewModel.aggregate([
      matchStage,
      joinWithUserstage,
      unwindUserStage,
      joinWithProduct,
      unwindProductStage,
      projectionStage,
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

const handleCreateReview = async (req, res, next) => {
  try {
    const userId = new objectId(req.user._id);
    const ProductID = new objectId(req.params.ProductID);
    await ReviewModel.create({
      productID: ProductID,
      userID: userId,
      des: req.body.des,
      rating: req.body.rating,
    });

    res.status(201).json({
      success: true,
      message: "Review Create Done",
    });
  } catch (error) {
    next(error);
  }
};

const handleProductByFilter = async (req, res, next) => {
  try {
    const { BrandID, CategoryID, MinPrice, MaxPrice } = req.body;
    const filterOption = {};

    if (BrandID) {
      filterOption.brandID = new objectId(BrandID);
    }
    if (CategoryID) {
      filterOption.categoryID = new objectId(CategoryID);
    }

    const MatchStage = { $match: filterOption };

    const AddFieldsStage = {
      $addFields: {
        numericPrice: {
          $cond: {
            if: { $eq: ["$discount", true] },
            then: { $toInt: "$discountPrice" },
            else: { $toInt: "$price" },
          },
        },
      },
    };

    const PriceCondition = {};

    if (MinPrice) {
      PriceCondition.numericPrice = { $gte: Number(MinPrice) };
    }
    if (MaxPrice) {
      PriceCondition.numericPrice = {
        ...(PriceCondition.numericPrice || {}),
        $lte: Number(MaxPrice),
      };
    }

    const PriceMatchStage = { $match: PriceCondition };

    const JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        foreignField: "_id",
        localField: "brandID",
        as: "brand",
      },
    };
    const unwindBrandStage={$unwind:"$brand"}

    const JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        foreignField: "_id",
        localField: "categoryID",
        as: "category",
      },
    };
    const unwindCategoryStage = { $unwind: "$category" };

    const projectionStage = {
      $project: {
        categoryID: 0,
        brandID: 0,
        createdAt: 0,
        updatedAt: 0,
        numericPrice: 0,
        "brand._id": 0,
        "brand.updatedAt": 0,
        "brand.createdAt": 0,
        "category._id": 0,
        "category.updatedAt": 0,
        "category.createdAt": 0,
      },
    };

    const data = await ProductModel.aggregate([
      MatchStage,
      AddFieldsStage,
      PriceMatchStage,
      JoinWithBrandStage,
      unwindBrandStage,
      JoinWithCategoryStage,
      unwindCategoryStage,
      projectionStage
    ]);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProductBrandList,
  getProductCategoryList,
  getProductSliderList,
  getProductListByBrand,
  getProductListByCategory,
  getProductListBySmilier,
  getProductListByRemark,
  getProductDetails,
  getProductListByKeyword,
  getProductReviewList,
  handleCreateReview,
  handleProductByFilter,
};
