const express=require("express");
const { getProductBrandList, getProductCategoryList, getProductSliderList, getProductListByBrand, getProductListByCategory, getProductListBySmilier, getProductListByKeyword, getProductListByRemark, getProductDetails, getProductReviewList } = require("../controller/product.controller");
const { getProductBrandList, getProductCategoryList, getProductSliderList, getProductListByBrand, getProductListByCategory, getProductListBySmilier, getProductListByKeyword, getProductListByRemark, getProductDetails, getProductReviewList, handleCreateReview, handleProductByFilter } = require("../controller/product.controller");
const { getUserLogin, getVerifiyLogin, getUserLogout } = require("../controller/user.controller");
const auth = require("../middleware/auth");
const { handleSaveProfile, handleReadProfile } = require("../controller/profile.controller");
const { handleSaveWishList, handleRemoveWishList, getAllWishList } = require("../controller/wishlist.controller");

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

// User
route.get("/UserLogin/:email", getUserLogin);
route.get("/VerifyLogin/:email/:otp", getVerifiyLogin);
route.get("/UserLogout", auth, getUserLogout);

// Profile
route.post("/CreateProfile", auth, handleSaveProfile)
route.post("/UpdateProfile", auth, handleSaveProfile)
route.get("/ReadProfile", auth, handleReadProfile)

// WishList
route.post("/SaveWishList", auth, handleSaveWishList)
route.post("/RemoveWishList", auth, handleRemoveWishList)
route.get("/WishList", auth, getAllWishList)
module.exports=route