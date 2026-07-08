import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import ProfileStore from "../store/ProfileStore";
import ProfileSkeleton from "../components/skeleton/Profile-Skeleton";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const {
      ProfileForm,
      ProfileOnChange,
      ProfileDetails,
      getProfileDetails,
      getSaveProfile,
    } = ProfileStore();

    useEffect(()=>{
        (async()=>{
            await getProfileDetails()
        })()
    },[])

       const handleUpdate = async () => {
            await getSaveProfile(ProfileForm);
            toast.success("Profile Updated")
       };

    if(!ProfileDetails){
        return (
            <Layout>
                <ProfileSkeleton/>
            </Layout>
        )
    }

  return (
    <Layout>
      <div className="container mt-5">
        <div className="card p-5 rounded-3">
          <h6>Customer Details</h6>
          <hr />
          <div className="row mb-4">
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Name </label>
              <input
                type="text"
                className="form-control"
                value={ProfileForm.cus_name}
                onChange={(e) => ProfileOnChange("cus_name", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Phone </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_phone}
                onChange={(e) => ProfileOnChange("cus_phone", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Fax </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_fax}
                onChange={(e) => ProfileOnChange("cus_fax", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Country </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_country}
                onChange={(e) => ProfileOnChange("cus_country", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer City </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_city}
                onChange={(e) => ProfileOnChange("cus_city", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer State </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_state}
                onChange={(e) => ProfileOnChange("cus_state", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Post Code </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_postcode}
                onChange={(e) =>
                  ProfileOnChange("cus_postcode", e.target.value)
                }
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Customer Address</label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.cus_add}
                onChange={(e) => ProfileOnChange("cus_add", e.target.value)}
              />
            </div>
          </div>
          <h6>Shipping Details</h6>
          <hr />
          <div className="row">
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Name </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_name}
                onChange={(e) => ProfileOnChange("ship_name", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Phone </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_phone}
                onChange={(e) => ProfileOnChange("ship_phone", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Country </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_country}
                onChange={(e) =>
                  ProfileOnChange("ship_country", e.target.value)
                }
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping City </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_city}
                onChange={(e) => ProfileOnChange("ship_city", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping State </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_state}
                onChange={(e) => ProfileOnChange("ship_state", e.target.value)}
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Post Code </label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_postcode}
                onChange={(e) =>
                  ProfileOnChange("ship_postcode", e.target.value)
                }
              />
            </div>
            <div className="col-md-3 p-2">
              <label className="form-label">Shipping Address</label>
              <input
                type="text"
                className="form-control "
                value={ProfileForm.ship_add}
                onChange={(e) => ProfileOnChange("ship_add", e.target.value)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-3 p-2">
              <button className="btn btn-success" onClick={handleUpdate}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
