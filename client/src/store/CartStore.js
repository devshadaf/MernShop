import axios from "axios";
import { create } from "zustand";
import { unAuthorized } from "../utility/utility";

const CartStore = create((set, get) => ({
  isCartSubmit: false,
  cartList: null,
  cartListCount: null,
  vat: () => get().total * 0.05,
  payable: () => get().total + get().vat(),

  getCardListRequest: async () => {
    try {
      set({ isCartSubmit: true });
      const res = await axios.get("/api/v1/CartList");
      let total = 0;

      res.data.data.forEach((item) => {
        if (item.product.discount) {
          total += Number(item.product.discountPrice) * Number(item.qty);
        } else {
          total += Number(item.product.price) * Number(item.qty);
        }
      });

      set({ total });

      set({ isCartSubmit: false });
      set({ cartList: res.data.data });
      set({ cartListCount: res.data.data.length });

      return res.data.data;
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },

  removeCardListRequest: async (productId) => {
    try {
      const res = await axios.get(`/api/v1/RemoveCartList/${productId}`);
      return res.data.success;
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },

  saveCardListRequest: async (cardItem) => {
    try {
      const res = await axios.post("/api/v1/SaveCartList", cardItem);
      return res.data.success;
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },

  createInvoiceRequest: async () => {
    try {
      const res = await axios.get("/api/v1/CreateInvoice");
      window.location.href = res.data.data.GatewayPageURL;
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },

  InvoiceList: null,
  InvoiceListRequest: async () => {
    try {
      const res = await axios.get("/api/v1/InvoiceList");
      set({ InvoiceList: res.data.data });
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },

  InvoiceDetails: null,
  getInvoiceDetails: async (id) => {
    try {
      const res = await axios.get(`/api/v1/InvoiceProductList/${id}`);
      set({ InvoiceDetails: res.data.data });
    } catch (error) {
      unAuthorized(error.response.status);
    }
  },
}));

export default CartStore;
