import { Link, useLocation, useParams } from "react-router";
import ProductSkeleton from "../skeleton/Product_Skeleton";
import ProductStore from "../../store/ProductStore";
import { useEffect, useState } from "react";

const AllProductList = () => {
  const {
    ProductBrandList,
    getProductBrandList,
    ProductCategoryList,
    getProductCategoryList,
    getFilterProductList,
    ProductList,
  } = ProductStore();

  const { id } = useParams();
  const location = useLocation();

  const [filterOption, setFilterOption] = useState({
    BrandID: "",
    CategoryID: "",
    MinPrice: "",
    MaxPrice: "",
  });

  const isUpdate = Object.values(filterOption).every((item) => item == "");

  const handleInputChange = (name, value) => {
    setFilterOption((data) => ({
      ...data,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (location.pathname.includes("/by-brand/")) {
      setFilterOption({
        BrandID: id,
        CategoryID: "",
        MinPrice: "",
        MaxPrice: "",
      });
    } else if (location.pathname.includes("/by-category/")) {
      setFilterOption({
        BrandID: "",
        CategoryID: id,
        MinPrice: "",
        MaxPrice: "",
      });
    } else if (location.pathname.includes("/by-keyword/")) {
      setFilterOption({
        BrandID: "",
        CategoryID: "",
        MinPrice: "",
        MaxPrice: "",
      });
    }
  }, [id, location.pathname]);

  useEffect(() => {
    if (!isUpdate) {
      const fetchData = async () => {
        await getFilterProductList(filterOption);
      };

      fetchData();
    }
  }, [filterOption]);

  useEffect(() => {
    (async () => {
      ProductBrandList === null ? await getProductBrandList() : null;
      ProductCategoryList === null ? await getProductCategoryList() : null;
    })();
  }, []);

  if (!ProductList) {
    return <ProductSkeleton />;
  }
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            <select
              value={filterOption.BrandID}
              className="form-control form-select cursor-pointer"
              onChange={(e) => handleInputChange("BrandID", e.target.value)}
            >
              <option value="" className="cursor-pointer">
                Choose Brand
              </option>
              {ProductBrandList?.data.map((item, i) => {
                return (
                  <option value={item._id} key={i} className="cursor-pointer">
                    {item.brandName}
                  </option>
                );
              })}
            </select>
            <label className="form-label mt-3">Categories</label>
            <select
              value={filterOption.CategoryID}
              className="form-control form-select"
              onChange={(e) => handleInputChange("CategoryID", e.target.value)}
            >
              <option value="">Choose Category</option>
              {ProductCategoryList?.data.map((item, i) => {
                return (
                  <option value={item._id} key={i} className="cursor-pointer">
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
            <label className="mt-4 bodySmal">
              Minimum Price ${filterOption.MinPrice}
            </label>
            <input
              value={filterOption.MinPrice}
              onChange={(e) => handleInputChange("MinPrice", e.target.value)}
              min={0}
              max={100000}
              step={100}
              type="range"
              className="form-range bodyMedium"
            />
            <label className="mt-4 bodySmal">
              Maximum Price ${filterOption.MaxPrice}
            </label>
            <input
              value={filterOption.MaxPrice}
              onChange={(e) => handleInputChange("MaxPrice", e.target.value)}
              min={0}
              max={100000}
              step={100}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              <div className="container">
                <div className="row">
                  {ProductList.data.map((item, i) => {
                    let price = (
                      <p className="bodyMedium  text-dark my-1">
                        Price: ${item["price"]}{" "}
                      </p>
                    );
                    if (item["discount"] === true) {
                      price = (
                        <p className="bodyMedium  text-dark my-1">
                          Price:<strike> ${item["price"]} </strike> $
                          {item["discountPrice"]}{" "}
                        </p>
                      );
                    }
                    return (
                      <div
                        className="col-md-3 p-2 col-lg-3 col-sm-6 col-12"
                        key={i}
                      >
                        <Link
                          to={`/product-detail/${item._id}`}
                          className="card shadow-sm h-100 rounded-3 bg-white"
                        >
                          <img
                            className="w-100 rounded-top-2"
                            src={item["image"]}
                          />
                          <div className="card-body">
                            <p className="bodySmal text-secondary my-1">
                              {item["title"]}
                            </p>
                            {price}
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProductList;
