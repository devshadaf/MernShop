import axios from "axios";
import { create } from "zustand";

const ReviewStore = create((set) => ({
  isReviewSubmit:false,
  createReviewRequest:async(id,data)=>{
    set({ isReviewSubmit: true });
    const res= await axios.post(`/api/v1/CreateReview/${id}`,data);
    set({ isReviewSubmit: false });
    return res.data.success;
  }
}));

export default ReviewStore