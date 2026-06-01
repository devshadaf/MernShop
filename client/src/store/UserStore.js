import { create } from "zustand";
import axios from "axios";

const UserStore = create((set) => ({
  isFormSubmit: false,
  isUserLogin: false,

  UserOTPRequest: async (email) => {
    set({ isFormSubmit: true });
    const res = await axios.get(`/api/v1/UserLogin/${email}`);
    sessionStorage.setItem("email", email);
    set({ isFormSubmit: false });
    return res.data.success;
  },

  UserVerifyRequest: async (otp) => {
    try {
      set({ isFormSubmit: true });
      const email = sessionStorage.getItem("email");
      const res = await axios.get(`/api/v1/VerifyLogin/${email}/${otp}`);
      set({ isFormSubmit: false });
      if (res.data.success) {
        set({ isUserLogin: true });
        set({ isFormSubmit: false });
        return true;
      } 
    } catch {
       set({ isFormSubmit: false });
      return false;
    }
  },

  UserLoginVerify:async()=>{
    try {
          const result = await axios.get("/api/v1/authVerify", {
            withCredentials: true,
          });
          if (result.data.success) {
            set({ isUserLogin: true });
          }
    } catch {
       set({ isUserLogin: false });
    }
  },

  UserLogout:async()=>{
      const data= await axios.get("/api/v1/UserLogout");
      if(data.data.success){
        set({ isUserLogin: false });
      }
      else{
        set({ isUserLogin: true });
      }
  
  }

}));

export default UserStore;
