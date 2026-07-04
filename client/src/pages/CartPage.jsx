import CartSkeleton from "../components/skeleton/Cart-Skeleton";
import Layout from "../components/common/Layout";
import Cart from "../components/Cart/Cart";
import CartStore from "../store/CartStore";

import { useEffect } from "react";
import NoData from "../components/common/NoData";

const CartPage = () => {
  const { cartList, getCardListRequest } = CartStore();

  useEffect(()=>{
    (async()=>{
      await getCardListRequest()
    })()
  },[])

  if (cartList == null) {
    return (
      <Layout>
        <CartSkeleton />
      </Layout>
    );
  } else if (cartList.length === 0) {
    return (
      <Layout>
        <NoData />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <Cart />
      </Layout>
    );
  }
};

export default CartPage;
