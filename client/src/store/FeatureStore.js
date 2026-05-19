import { create } from "zustand";
import axios from "axios";

const FeatureStore = create((set) => ({
  FeatureList: null,
  getFeatureList: async () => {
    const data = await axios.get("/api/v1/FeatureList");
    set({ FeatureList: data.data });
  },
}));

export default FeatureStore;
