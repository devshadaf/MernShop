import React, { useEffect } from "react";
import Layout from "../components/common/Layout";
import CartStore from "../store/CartStore";
import CartSkeleton from "../components/skeleton/Cart-Skeleton";
import NoData from "../components/common/NoData";
import { Link } from "react-router-dom";

const OrderPage = () => {
      const { InvoiceList, InvoiceListRequest } =CartStore();

      useEffect(() => {
        (async () => {
          await InvoiceListRequest();
        })();
      }, []);


      if (InvoiceList == null) {
        return (
          <Layout>
            <CartSkeleton />
          </Layout>
        );
      } else if (InvoiceList.length === 0) {
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
                <div className="col-md-12">
                  <div className="card p-4">
                    <ul className="list-group list-group-flush">
                      {InvoiceList.map((item, i) => {
                        return (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-start"
                            key={i}
                          >
                            <div className="ms-2 me-auto">
                              <div className="">
                                <p className="m-1">
                                  <b>Invoice No: {item["tran_id"]}</b>
                                </p>
                                <p className="m-1">
                                  <b>Customer:</b> {item["cus_details"]}
                                </p>
                                <p className="m-1">
                                  <b>Shipping: </b>
                                  {item["ship_details"]}
                                </p>
                                <p className="m-1">
                                  <b>Payment: </b>
                                  {item["payment_status"]}
                                </p>
                                <p className="m-1">
                                  <b>Delivery: </b> {item["delivery_status"]}
                                </p>
                              </div>
                            </div>
                            <Link
                              className="btn btn-success"
                              to={`/invoice/${item["_id"]}`}
                            >
                              Details
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        );
      }
};

export default OrderPage;
