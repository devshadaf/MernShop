import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductStore from "../../store/ProductStore";
import Layout from "../common/Layout";
import AllProductList from "./AllProductList";

const ProductByKeyword = () => {
    const { keyword } = useParams();
    const { getProductListByKeyword } =
      ProductStore();
    
    useEffect(() => {
        (async()=>{
            await getProductListByKeyword(keyword);
        })()
    }, [keyword]);

  return (
    <Layout>
      <AllProductList />
    </Layout>
  );
};

export default ProductByKeyword;
