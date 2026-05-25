import { create } from "zustand";
import axios from "axios"

const ProductStore = create((set) => ({
  ProductBrandList: null,
  getProductBrandList: async () => {
    const data = await axios.get("/api/v1/ProductBrandList");
    set({ ProductBrandList: data.data });
  },

  ProductCategoryList: null,
  getProductCategoryList: async () => {
    const data = await axios.get("/api/v1/ProductCategoryList");
    set({ ProductCategoryList: data.data });
  },

  ProductSliderList: null,
  getProductSliderList: async () => {
    const data = await axios.get("/api/v1/ProductSliderList");
    set({ ProductSliderList: data.data });
  },

  ProductList: null,
  getProductListByBrand: async (id) => {
    const data = await axios.get(`/api/v1/ProductListByBrand/${id}`);
    set({ ProductList: data.data });
  },

  getProductListByCategory: async (id) => {
    const data = await axios.get(`/api/v1/ProductListByCategory/${id}`);
    set({ ProductList: data.data });
  },

  getProductListBySmilier: async (id) => {
    const data = await axios.get(`/api/v1/ProductListBySmilier/${id}`);
    set({ ProductList: data.data });
  },

  SearchValue: "",
  setSearchValue: (value) => {
    set({ SearchValue: value });
  },

  getProductListByKeyword: async (keyword) => {
    const data = await axios.get(`/api/v1/ProductListByKeyword/${keyword}`);
    set({ ProductList: data.data });
  },

  getProductListByRemark: async (remark) => {
    const data = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
    set({ ProductList: data.data });
  },

  ProductDetails: null,
  getProductDetails: async (id) => {
    const data = await axios.get(`/api/v1/ProductDetails/${id}`);
    set({ ProductDetails: data.data });
  },

  ProductReviewList: null,
  getProductReviewList: async (id) => {
    const data = await axios.get(`/api/v1/ProductReviewList/${id}`);
    set({ ProductReviewList: data.data });
  },

  getFilterProductList:async(reqBody)=>{
    const res = await axios.post(`/api/v1/ProductListByFilter`, reqBody);
    set({ ProductList: res.data });
  }

}));

export default ProductStore