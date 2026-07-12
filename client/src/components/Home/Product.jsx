import { useState } from "react";
import ProductStore from "../../store/ProductStore";
import ProductCard from "./ProductCard";
import ProductSkeleton from "../skeleton/Product_Skeleton";


const Product = () => {
  const { ProductList, getProductListByRemark } = ProductStore();
  const [activeTab, setActiveTab] = useState("new");
  if (!ProductList) {
    return <ProductSkeleton />;
  }
  return (
    <div className="section">
      <div className="container-fluid py-5 bg-light">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmal mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <div>
              {/*  Tabs */}
              <ul
                className="nav nav-pills p-3 justify-content-center mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getProductListByRemark("new");
                      setActiveTab("new");
                    }}
                    className={`nav-link ${activeTab === "new" ? "active" : ""}`}
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-new"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    ariaselected="true"
                  >
                    New
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getProductListByRemark("trending");
                      setActiveTab("trending");
                    }}
                    className={`nav-link ${activeTab === "trending" ? "active" : ""}`}
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    ariaselected="false"
                  >
                    Trending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getProductListByRemark("popular");
                      setActiveTab("popular");
                    }}
                    className={`nav-link ${activeTab === "popular" ? "active" : ""}`}
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    ariaselected="false"
                  >
                    Popular
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getProductListByRemark("top");
                      setActiveTab("top");
                    }}
                    className={`nav-link ${activeTab === "top" ? "active" : ""}`}
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    ariaselected="false"
                  >
                    Top
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      getProductListByRemark("special");
                      setActiveTab("special");
                    }}
                    className={`nav-link ${activeTab === "special" ? "active" : ""}`}
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-special"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    ariaselected="false"
                  >
                    Special
                  </button>
                </li>
              </ul>
              {/* Cards */}
              <div className="tab-content" id="pills-tabContent">
                <div
                  className={`tab-pane fade show ${activeTab == "new" ? "active" : ""}`}
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    <ProductCard data={ProductList} />{" "}
                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${activeTab == "trending" ? "active" : ""}`}
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    <ProductCard data={ProductList} />{" "}
                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${activeTab == "popular" ? "active" : ""}`}
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    <ProductCard data={ProductList} />{" "}
                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${activeTab == "top" ? "active" : ""}`}
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    <ProductCard data={ProductList} />{" "}
                  </div>
                </div>
                <div
                  className={`tab-pane fade show ${activeTab == "special" ? "active" : ""}`}
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  <div className="container">
                    <ProductCard data={ProductList} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Product;
