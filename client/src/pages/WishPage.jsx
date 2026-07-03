import React, { useEffect } from "react";
import ProductSkeleton from "../components/skeleton/Product_Skeleton";
import WishStore from "../store/WishStore";
import NoData from "../components/common/NoData";
import { Link } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import Layout from "../components/common/Layout";
import toast from "react-hot-toast";

const WishPage = () => {
  const { wishList, getWishListRequest, removeWishListRequest } = WishStore();

  useEffect(()=>{
    (async()=>{
      await getWishListRequest()
    })()
  },[])

  const remove=async(id)=>{
   const res= await removeWishListRequest(id)
   await getWishListRequest();
   if(res){
    toast.success("WishList Item Remove")
   }
  }

  if (wishList === null) {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <ProductSkeleton />
          </div>
        </div>
      </Layout>
    );
  } else if (wishList.length === 0) {
    return (
      <Layout>
        <NoData />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <div className="container mt-3">
          <div className="row">
            {wishList.map((item, i) => {
              let price = (
                <p className="bodyMedium  text-dark my-1">
                  Price: ${item["product"]["price"]}{" "}
                </p>
              );
              if (item["product"]["discount"] === true) {
                price = (
                  <p className="bodyMedium  text-dark my-1">
                    Price:<strike> ${item["product"]["price"]} </strike> $
                    {item["product"]["discountPrice"]}{" "}
                  </p>
                );
              }
              return (
                <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                  <div className="card shadow-sm h-100 rounded-3 bg-white">
                    <img
                      alt=""
                      className="w-100 rounded-top-2"
                      src={item["product"]["image"]}
                    />
                    <div className="card-body">
                      <p className="bodySmal text-secondary my-1">
                        {item["product"]["title"]}
                      </p>
                      {price}
                      {Array.from({ length: item.product.star }).map((_, i) => (
                        <IoIosStar fill="#FAB63E" key={i} />
                      ))}

                      <p className="mt-3">
                        <button
                          onClick={async () => {
                            await remove(item["productID"]);
                          }}
                          className="btn  btn-outline-danger btn-sm"
                        >
                          Remove
                        </button>
                        <Link
                          className="btn mx-2 btn-outline-success btn-sm"
                          to={`/product-detail/${item["productID"]}`}
                        >
                          Details
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    );
  }
};

export default WishPage;
