import React, { useState } from "react";
import Layout from "../components/common/Layout";
import UserStore from "../store/UserStore";
import SubmitButton from "../components/User/SubmitButton";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const { UserVerifyRequest } = UserStore();
    const [OTP,setOTP]=useState("")
    const navigate=useNavigate()

    const handleVerify=async()=>{
        if(OTP==""){
            return toast.error("Provide Valid OTP")
        }
      const success=  await UserVerifyRequest(OTP)
        if (success) {
          navigate("/");
          toast.success("Login Successfull");
        } else {
         toast.error("Wrong OTP");
         setOTP("")
        }
    }

  return (
    <Layout>
      <div className="container section">
        <div className="row d-flex justify-content-center">
          <div className="col-md-5">
            <div className="card p-5">
              <h4 className=" text-center bodyXLarge fw-bold mb-2">
                Enter Verification Code
              </h4>
              <p>
                A verification code has been sent to the email address you
                provide
              </p>
              <input
                placeholder="Verification"
                type="text"
                className="form-control"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
              />
              <SubmitButton
                submit={false}
                className="btn mt-3 btn-success"
                text="Submit"
                onClick={handleVerify}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
