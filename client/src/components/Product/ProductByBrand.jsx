import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import Layout from "../common/Layout";
import AllProductList from "./AllProductList";

const ProductByBrand = () => {
  const { id } = useParams();
  const { getProductListByBrand } = ProductStore();
  useEffect(()=>{
    (async()=>{
        await getProductListByBrand(id)
    })()
  },[id])

  return (
    <Layout>
      <AllProductList />
    </Layout>
  );
};

export default ProductByBrand;
