const express=require("express");
const { getProductBrandList, getProductCategoryList, getProductSliderList, getProductListByBrand, getProductListByCategory, getProductListBySmilier, getProductListByKeyword, getProductListByRemark, getProductDetails, getProductReviewList } = require("../controller/product.controller");
const { getProductBrandList, getProductCategoryList, getProductSliderList, getProductListByBrand, getProductListByCategory, getProductListBySmilier, getProductListByKeyword, getProductListByRemark, getProductDetails, getProductReviewList, handleCreateReview, handleProductByFilter } = require("../controller/product.controller");

const express = require("express");
const route=express.Router()

// Product
route.get("/ProductBrandList", getProductBrandList);
route.get("/ProductCategoryList", getProductCategoryList);
route.get("/ProductSliderList", getProductSliderList);
route.get("/ProductListByBrand/:BrandID", getProductListByBrand);
route.get("/ProductListByCategory/:CategoryID", getProductListByCategory );
route.get("/ProductListBySmilier/:CategoryID", getProductListBySmilier);
route.get("/ProductListByKeyword/:Keyword", getProductListByKeyword);
route.get("/ProductListByRemark/:Remark", getProductListByRemark);
route.get("/ProductDetails/:ProductID", getProductDetails);
route.get("/ProductReviewList/:ProductID", getProductReviewList);
route.get("/CreateReview/:ProductID", auth, handleCreateReview);
route.post("/ProductListByFilter", handleProductByFilter)


module.exports=route