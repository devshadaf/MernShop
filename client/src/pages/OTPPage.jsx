import React, { useState } from "react";
import Layout from "../components/common/Layout";
import SubmitButton from "../components/User/SubmitButton";
import toast from "react-hot-toast";
import UserStore from "../store/UserStore";
import { useNavigate } from "react-router-dom";

const OTPPage = () => {
    const navigate=useNavigate()
    const { UserOTPRequest } = UserStore();
    const [email,setEmail]=useState("")
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const handleEmail=async()=>{
        const isValid = emailRegex.test(email);

       if (isValid) {
        const data= await UserOTPRequest(email)
        if(data){
            navigate("/login");
        }
       } else {
        toast.error("Provide Valid Email")
       }
    }

  return (
    <Layout>
      <div className="container section">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <div className="card p-5">
              <h4 className=" text-center bodyXLarge fw-bold mb-2">
                Enter Your Email
              </h4>
              <p>
                A verification code will be sent to the email address you
                provide
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                type="email"
                className="form-control"
              />
              <SubmitButton
                onClick={handleEmail}
                submit={false}
                className="btn mt-3 btn-success"
                text="Next"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OTPPage;
