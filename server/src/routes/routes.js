const { getProductBrandList, getProductCategoryList, getProductSliderList, getProductListByBrand, getProductListByCategory, getProductListBySmilier, getProductListByKeyword, getProductListByRemark, getProductDetails, getProductReviewList, handleCreateReview, handleProductByFilter } = require("../controller/product.controller");
const { getUserLogin, getVerifiyLogin, getUserLogout, getAuthVerify } = require("../controller/user.controller");
const auth = require("../middleware/auth");
const { handleSaveProfile, handleReadProfile } = require("../controller/profile.controller");
const { handleSaveWishList, handleRemoveWishList, getAllWishList } = require("../controller/wishlist.controller");
const { handleSaveCartList, handleRemoveCartList, handleUpdateCartList, handleCartList } = require("../controller/cart.controller");
const { handleCreateInvoice, handlePaymentSuccess, handlePaymentFail, handlePaymentCancel, handlePaymentIPN, getAllInvoiceList, getInvoiceProductList } = require("../controller/invoice.controller");
const { handleFeatureList,handleLegal} = require("../controller/feature.controller");

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
route.post("/CreateReview/:ProductID", auth, handleCreateReview);
route.post("/ProductListByFilter", handleProductByFilter)

// User
route.get("/UserLogin/:email", getUserLogin);
route.get("/VerifyLogin/:email/:otp", getVerifiyLogin);
route.get("/authVerify",auth, getAuthVerify)
route.get("/UserLogout", auth, getUserLogout);

// Profile
route.post("/CreateProfile", auth, handleSaveProfile)
route.post("/UpdateProfile", auth, handleSaveProfile)
route.get("/ReadProfile", auth, handleReadProfile)

// WishList
route.post("/SaveWishList", auth, handleSaveWishList)
route.post("/RemoveWishList", auth, handleRemoveWishList)
route.get("/WishList", auth, getAllWishList)

// CartList
route.post("/SaveCartList", auth, handleSaveCartList);
route.get("/RemoveCartList/:CartID", auth, handleRemoveCartList);
route.post("/UpdateCartList/:CartID", auth, handleUpdateCartList);
route.get("/CartList", auth, handleCartList)

// Invoice & Payment
route.get("/CreateInvoice",auth,handleCreateInvoice)
route.get("/InvoiceList",auth,getAllInvoiceList)
route.get("/InvoiceProductList/:invoice_id",auth,getInvoiceProductList)

route.post("/PaymentSuccess/:trans_id", handlePaymentSuccess);
route.post("/PaymentFail/:trans_id", handlePaymentFail);
route.post("/PaymentCancel/:trans_id", handlePaymentCancel);
route.post("/PaymentIPN/:trans_id", handlePaymentIPN);

// FetaureList
route.get("/FeatureList", handleFeatureList);
route.get("/Legal/:type", handleLegal)

module.exports=route