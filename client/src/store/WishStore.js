import axios from "axios";
import { create } from "zustand";
import { unAuthorized } from "../utility/utility";

const WishStore = create((set) => ({
  isWishSubmit: false,
  wishList: null,
  wishListCount: null,

  getWishListRequest: async () => {
    try {
         set({ isWishSubmit: true });
         const res = await axios.get("/api/v1/WishList");
         set({ isWishSubmit: false });
         set({ wishList: res.data.data });
         set({ wishListCount: res.data.data.length });
         return res.data.data; 
    } catch (error) {
      unAuthorized(error.response.status)
    }
  },

  removeWishListRequest: async (productId) => {
    try {
          const res = await axios.post(`/api/v1/RemoveWishList`, {
            productID: productId,
          });
          return res.data.success;
    } catch (error) {
      unAuthorized(error.response.status)
    }
  },

  saveWishListRequest: async (productId) => {
    try {
          const res = await axios.post("/api/v1/SaveWishList", {
            productID: productId,
          });
          return res.data.success;
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },
}));

export default WishStore;
