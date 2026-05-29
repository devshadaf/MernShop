import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import FeatureStore from "../store/FeatureStore";
import LegalDetail from "../components/Legal/LegalDetail";

const ContactPage = () => {
      const { getLegalDetail } = FeatureStore();

      useEffect(() => {
        (async () => {
          await getLegalDetail("contact");
        })();
      }, []);
  return <Layout>
    <LegalDetail/>
  </Layout>;
};

export default ContactPage;
