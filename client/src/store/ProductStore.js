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

  ProductListByBrand: null,
  getProductListByBrand: async (id) => {
    const data = await axios.get(`/api/v1/ProductListByBrand/${id}`);
    set({ ProductListByBrand: data.data });
  },

  ProductListByCategory: null,
  getProductListByCategory: async (id) => {
    const data = await axios.get(`/api/v1/ProductListByCategory/${id}`);
    set({ ProductListByCategory: data.data });
  },

  ProductListBySmilier: null,
  getProductListBySmilier: async (id) => {
    const data = await axios.get(`/api/v1/ProductListBySmilier/${id}`);
    set({ ProductListBySmilier: data.data });
  },

  ProductListByKeyword: null,
  getProductListByKeyword: async (keyword) => {
    const data = await axios.get(`/api/v1/ProductListByKeyword/${keyword}`);
    set({ ProductListByKeyword: data.data });
  },

  ProductListByRemark: null,
  getProductListByRemark: async (remark) => {
    const data = await axios.get(`/api/v1/ProductListByRemark/${remark}`);
    set({ ProductListByRemark: data.data });
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
}));

export default ProductStore