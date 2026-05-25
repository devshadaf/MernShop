import { create } from "zustand";
import axios from "axios";

const FeatureStore = create((set) => ({
  FeatureList: null,
  getFeatureList: async () => {
    const data = await axios.get("/api/v1/FeatureList");
    set({ FeatureList: data.data });
  },
  LegalDetails:null,
  getLegalDetail:async(type)=>{
    const data = await axios.get(`/api/v1/Legal/${type}`);
    set({ LegalDetails: data.data });
  }
}));

export default FeatureStore;
