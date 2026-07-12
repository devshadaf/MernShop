import { useEffect, useState } from "react";
import ProductDetailSkeleton from "../components/skeleton/ProductDetail-Skeleton";
import Layout from "../components/common/Layout";
import { useParams } from "react-router-dom";
import ProductStore from "../store/ProductStore";
import ProductImages from "../components/Product/ProductImages";
import parse from "html-react-parser";
import { IoIosStar } from "react-icons/io";
import CartStore from "../store/CartStore";
import toast from "react-hot-toast";
import WishStore from "../store/WishStore";


const ProductDetail = () => {
  const { id } = useParams();
  const { saveCardListRequest,getCardListRequest } = CartStore();
  const { getProductDetails, ProductDetails, ProductReviewList, getProductReviewList } = ProductStore();
  const { saveWishListRequest, getWishListRequest } = WishStore();

    const [cartOption, setCartOption] = useState({
      productID: "",
      color: "",
      qty: 1,
      size: "",
    });

  useEffect(() => {
    (async () => {
      await getProductDetails(id);
      await getProductReviewList(id)
    })();
  }, [id]);

  if (!ProductDetails) {
    return <ProductDetailSkeleton />;
  }
  
  const handleQuantity = (type) => {
    setCartOption((prev) => ({
      ...prev,
      qty:
      type === "Increment" ? prev.qty + 1 : prev.qty > 1 ? prev.qty - 1 : 1,
    }));
  };

  const handleAddCart=async(productId)=>{
    const updatedCart = {
      ...cartOption,
      productID: productId,
    };
    setCartOption(updatedCart);
    if(updatedCart.size==""){
      return toast.error("Size is Required")
    }
    else if(updatedCart.color==""){
      return toast.error("Color is Required");
    }
    const res = await saveCardListRequest(updatedCart);
    await getCardListRequest()
    if(res){
      toast.success("Item Added to Cart")
    }
  }

  const handleAddWish = async (productId) => {
    const res= await saveWishListRequest(productId);
    await getWishListRequest()
    if(res){
      toast.success("Item Added to Wishlist");
    }
  };
  
  return (
    <Layout>
      <div className="container mt-2 py-3">
        <div className="row">
          <div className="col-md-7 p-3">
            <ProductImages />
          </div>
          <div className="col-md-5 p-3">
            <h4>{ProductDetails.data[0].product.title}</h4>
            <p className="text-muted bodySmal my-2">
              Category: {ProductDetails.data[0].category.categoryName}{" "}
            </p>
            <p className="text-muted bodySmal my-2">
              Brand: {ProductDetails.data[0].brand.brandName}
            </p>
            <p className="bodySmal mb-3 mt-1">
              {ProductDetails.data[0].product.shortDes}
            </p>
            {ProductDetails.data[0].product.discount ? (
              <span className="bodyMedium">
                {" "}
                Price:
                <strike className="text-secondary">
                  ${ProductDetails.data[0].product.price}
                </strike>{" "}
                ${ProductDetails.data[0].product.discountPrice}
              </span>
            ) : (
              <span className="bodyMedium">
                Price: ${ProductDetails.data[0].product.price}
              </span>
            )}

            <div className="row mt-3">
              <div className="col-4 p-2">
                <label className="bodySmal">Size</label>
                <select
                  className="form-control my-2 form-select"
                  value={cartOption.size}
                  onChange={(e) =>
                    setCartOption({ ...cartOption, size: e.target.value })
                  }
                >
                  <option value="">Size</option>
                  {ProductDetails.data[0].size.split(",").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4 p-2">
                <label className="bodySmal">Color</label>
                <select
                  className="form-control my-2 form-select"
                  value={cartOption.color}
                  onChange={(e) =>
                    setCartOption({ ...cartOption, color: e.target.value })
                  }
                >
                  <option value="">Color</option>
                  {ProductDetails.data[0].color.split(",").map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-4 p-2">
                <label className="bodySmal">Quantity</label>
                <div className="input-group my-2">
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantity("Decrement")}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    value={cartOption.qty}
                    className="form-control bg-light text-center"
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleQuantity("Increment")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-4 p-2">
                <button
                  className="btn w-100 btn-success"
                  onClick={() =>
                    handleAddCart(ProductDetails.data[0].product._id)
                  }
                >
                  Add to Cart
                </button>
              </div>
              <div className="col-4 p-2">
                <button
                  className="btn w-100 btn-success"
                  onClick={() =>
                    handleAddWish(ProductDetails.data[0].product._id)
                  }
                >
                  Add to Wish
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="Speci-tab"
                data-bs-toggle="tab"
                data-bs-target="#Speci-tab-pane"
                type="button"
                role="tab"
                aria-controls="Speci-tab-pane"
                aria-selected="true"
              >
                Specifications
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="Review-tab"
                data-bs-toggle="tab"
                data-bs-target="#Review-tab-pane"
                type="button"
                role="tab"
                aria-controls="Review-tab-pane"
                aria-selected="false"
              >
                Review
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="Speci-tab-pane"
              role="tabpanel"
              aria-labelledby="Speci-tab"
              tabIndex="0"
            >
              {parse(ProductDetails.data[0].des)}
            </div>
            <div
              className="tab-pane fade"
              id="Review-tab-pane"
              role="tabpanel"
              aria-labelledby="Review-tab"
              tabIndex="0"
            >
              <ul className="list-group list-group-flush">
                {ProductReviewList && (
                  <ul className="list-group list-group-flush bg-transparent">
                    {ProductReviewList.data.map((item, i) => (
                      <li
                        key={i}
                        className="list-group-item bg-transparent pt-4"
                      >
                        <span className="bodyMedium">
                          <i className="bi bi-person pe-2"></i>
                          {item.user.email}
                        </span>
                        <p className="bodyMedium text-dark my-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <IoIosStar fill="#FAB63E" key={i} />
                          ))}
                        </p>
                        <p className="bodySmal mt-2">{item.des}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
