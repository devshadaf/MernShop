import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import Layout from "../common/Layout";
import AllProductList from "./AllProductList";

const ProductByCategory = () => {
  const {id}=useParams()
  const { getProductListByCategory } = ProductStore();
  useEffect(()=>{
    (async()=>{
      await getProductListByCategory(id)
    })()
  },[id])
  return (
    <Layout>
      <AllProductList />
    </Layout>
  );
};

export default ProductByCategory;
