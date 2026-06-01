import {create} from "zustand"
import { unAuthorized } from "../utility/utility";
import axios from 'axios'

const ProfileStore=create((set)=>({

ProfileForm:{
     cus_add: "",
    cus_city: "",
    cus_country: "",
    cus_fax:"",
    cus_name:"" ,
    cus_phone:"",
    cus_postcode:"",
    cus_state: "",
    ship_add: "",
    ship_city: "",
    ship_country:"" ,
    ship_name:"" ,
    ship_phone: "",
    ship_postcode:"" ,
    ship_state: "" 
},

 ProfileOnChange:(name,value)=>{
    set((state) => ({
      ProfileForm:{
        ...state.ProfileForm,
        [name]:value
      }
    }));
 },
  
 ProfileDetails:null,

 getProfileDetails:async()=>{
    try {
        const data = await axios.get(`/api/v1/ReadProfile`);
        if (data.data.success && data.data.data != null) {
          set({ ProfileDetails: data.data.data });
          set({ ProfileForm: data.data.data });
        } else if (data.data.data == null) {
          set({ ProfileDetails: [] });
        }
    } catch (err) {
        unAuthorized(err.response.status)
    }
 },

 getSaveProfile:async(body)=>{
    try {
        set({ ProfileDetails :null});
        const data = await axios.post(`/api/v1/UpdateProfile`, body);
        if(data.data.success){
            set({ ProfileDetails: data.data.data });
            set({ ProfileForm: data.data.data });
            return true
        }
        else{
            set({ ProfileDetails:null });
        }
    } catch (err) {
        unAuthorized(err.response.status)
    }
 },


}))


export default ProfileStore