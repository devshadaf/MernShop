import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import FeatureStore from "../store/FeatureStore";
import LegalDetail from "../components/Legal/LegalDetail";

const RefundPage = () => {
      const { getLegalDetail } = FeatureStore();

      useEffect(() => {
        (async () => {
          await getLegalDetail("refund");
        })();
      }, []);
  return <Layout>
    <LegalDetail/>
  </Layout>;
};

export default RefundPage;
