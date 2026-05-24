const CartModel = require("../models/cart.model")
const ProfileModel = require("../models/profile.model");
const InvoiceModel = require("../models/invoice.model");
const InvoiceProductModel = require("../models/invoiceProduct.model");
const PaymentSettingModel = require("../models/paymentSetting.model");

const FormData=require("form-data")
const axios=require("axios")
const mongoose=require("mongoose");
const ObjectId=mongoose.Types.ObjectId


const handleCreateInvoice=async(req,res,next)=>{
    try {
        const userID = new ObjectId(req.user._id); ;

      // =============Step 01: Calculate Total Payable & Vat==============

      const matchStage = { $match: { userID: userID } };
      const joinWithProductStage = {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "product",
        },
      };
      const unwindProductStage={$unwind:"$product"}

      const CartData = await CartModel.aggregate([
        matchStage,
        joinWithProductStage,
         unwindProductStage,
      ]);

       let price=0
       let totalPrice = 0;

       CartData.forEach((data)=>{
         if(data.product.discount){
             price = parseInt(data.product.discountPrice);
         }
         else{
             price = parseInt(data.product.price);
         }
         totalPrice += parseInt(data.qty) * price;
       })

       const vat=totalPrice*0.5  // 5% Vat
       const payable=vat+totalPrice

      // =============Step 02: Prepare  Customer Details & Shipping Details ==========

      const data = await ProfileModel.aggregate([matchStage]);

      const cus_details = `Name=${data[0].cus_name}, Address=${data[0].cus_add}, City=${data[0].cus_city}, Phone=${data[0].cus_phone}`;
      const ship_details = `Name=${data[0].ship_name}, Address=${data[0].ship_add}, City=${data[0].ship_city}}`;

      // =============Step 03: Transaction & Other's ID======================

      const trans_id=Math.floor(Math.random()*900000+100000)
      const val_id=0

      // =============Step 04: Create Invoice===========================

       const InvoiceData = await InvoiceModel.create({
         userID: userID,
         payable: payable,
         cus_details: cus_details,
         ship_details: ship_details,
         tran_id: trans_id,
         val_id: val_id,
         delivery_status: "pending",
         payment_status: "pending",
         total: totalPrice,
         vat: vat,
       });

      // =============Step 05: Create Invoice Product===============

        CartData.forEach(async(data) => {
         await InvoiceProductModel.create({
           userID: userID,
           invoiceID: InvoiceData._id,
           productID: data.productID,
           qty: data.qty,
           price: data.product.discount
            ? data.product.discountPrice
             : data.product.price,
           color: data.color,
           size: data.size,
         });
        });

      //=============Step 06: Remove Carts======================================

      await CartModel.deleteMany({ userID :userID});

      //=============Step 07: Prepare SSL Payment=======================

      const PaymentSettings=await PaymentSettingModel.find()
      const form = new FormData();

      form.append("store_id", PaymentSettings[0].store_id);
      form.append("store_passwd", PaymentSettings[0].store_passwd);
      form.append("total_amount", payable.toString());
      form.append("currency", PaymentSettings[0].currency);
      form.append("tran_id", trans_id);

      form.append("success_url",`${PaymentSettings[0]["success_url"]}/${trans_id}` );
      form.append("fail_url", `${PaymentSettings[0]["fail_url"]}/${trans_id}`);
      form.append("cancel_url",`${PaymentSettings[0]["cancel_url"]}/${trans_id}`);
      form.append("ipn_url", `${PaymentSettings[0]["ipn_url"]}/${trans_id}`);

      form.append("cus_name", data[0].cus_name);
      form.append("cus_email", req.user.email);
      form.append("cus_add1", data[0].cus_add);
      form.append("cus_add2", data[0].cus_add);
      form.append("cus_city", data[0].cus_city);
      form.append("cus_state", data[0].cus_state);
      form.append("cus_postcode", data[0].cus_postcode);
      form.append("cus_country", data[0].cus_country);
      form.append("cus_phone", data[0].cus_phone);
      form.append("cus_fax", data[0].cus_fax);

      form.append("shipping_method", "YES");
      form.append("ship_name", data[0].ship_name);
      form.append("ship_add1", data[0].ship_add);
      form.append("ship_add2", data[0].ship_add);
      form.append("ship_city", data[0].ship_city);
      form.append("ship_state", data[0].ship_state);
      form.append("ship_country", data[0].ship_country);
      form.append("ship_postcode", data[0].ship_postcode);

      form.append("product_name", "According Invoice");
      form.append("product_category", "According Invoice");
      form.append("product_profile", "According Invoice");
      form.append("product_amount", "According Invoice");

      let SSLResponse = await axios.post(PaymentSettings[0].init_url,form);

      res.status(200).json({
        success: true,
        data: SSLResponse.data,
      });
    } catch (error) {
        next(error)
    }
}

const handlePaymentSuccess = async(req, res, next) => {
    try {
        const trans_id = req.params.trans_id;
        await InvoiceModel.updateOne(
          { tran_id: trans_id },
          { $set: { payment_status:"success"} },
        );
        res.status(200).json({
            message:"Payment Success"
        })
    } catch (error) {
        next(error)
    }
};

const handlePaymentCancel = async(req, res, next) => {
    try {
        const trans_id = req.params.trans_id;
        await InvoiceModel.updateOne(
          { tran_id: trans_id },
          { $set: { payment_status:"cancel"} },
        );
         res.status(200).json({
           message: "Payment Cancel",
         });
    } catch (error) {
        next(error)
    }
};

const handlePaymentFail = async(req, res, next) => {
    try {
        const trans_id = req.params.trans_id;
        await InvoiceModel.updateOne(
          { tran_id: trans_id },
          { $set: { payment_status:"fail"} },
        );
          res.status(200).json({
            message: "Payment Fail",
          });
    } catch (error) {
        next(error)
    }
};

const handlePaymentIPN = async(req, res, next) => {
    try {
        const trans_id = req.params.trans_id;
        await InvoiceModel.updateOne(
          { tran_id: trans_id },
          { $set: { payment_status:req.body.status} },
        );
         res.status(200).json({
          message: "Payment Hold",
        });
    } catch (error) {
        next(error)
    }
};

const getAllInvoiceList = async (req, res, next) => {
    try {
        const data = await InvoiceModel.find({ userID : new ObjectId(req.user._id)});
        res.status(200).json({
            success:true,
            data
        })
    } catch (error) {
        next(error)
    }
};

const getInvoiceProductList = async (req, res, next) => {
    try {
        const invoiceID = new ObjectId(req.params.invoice_id);
        const userID = new ObjectId(req.user._id);
        const data = await InvoiceProductModel.find({ userID, invoiceID });
         res.status(200).json({
           success: true,
           data,
         });
    } catch (error) {
        next(error)
    }
};



module.exports = {
  handleCreateInvoice,
  handlePaymentSuccess,
  handlePaymentCancel,
  handlePaymentFail,
  handlePaymentIPN,
  getAllInvoiceList,
  getInvoiceProductList,
};