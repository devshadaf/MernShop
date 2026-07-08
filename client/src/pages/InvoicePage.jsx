import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import NoData from "../components/common/NoData";
import SubmitButton from "../components/Review/SubmitButton";
import CartSkeleton from "../components/skeleton/Cart-Skeleton";
import CartStore from "../store/CartStore";
import ReviewStore from "../store/ReviewStore";

const InvoicePage = () => {
  const {id}=useParams()
  const { InvoiceDetails, getInvoiceDetails } = CartStore();
  const { createReviewRequest }=ReviewStore()
  const [modalShow,setModalShow]=useState(false)
  const [reviewDetail,setReviewDetail]=useState({
    rating:"",
    des:''
  })


  useEffect(()=>{
    (async()=>{
     await getInvoiceDetails(id)
    })()
  },[id])

  const submitReview = async() => {
    if(reviewDetail.rating=="" || reviewDetail.des==""){
      setModalShow(false)
      return toast.error("Review Field Empty");
    }
    const res= await createReviewRequest(id,reviewDetail)
    if(res){
      toast.success("Review Created")
      setModalShow(false)
    }
  };

      if (InvoiceDetails == null) {
        return (
          <Layout>
            <CartSkeleton />
          </Layout>
        );
      } else if (InvoiceDetails.length === 0) {
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
                      {InvoiceDetails.map((item, i) => {
                        return (
                          <li
                            className="list-group-item d-flex justify-content-between align-items-start"
                            key={i}
                          >
                            <img
                              className="rounded-1"
                              alt=""
                              width="90"
                              height="auto"
                              src={item["product"]["image"]}
                            />
                            <div className="ms-2 me-auto">
                              <div className="fw-medium h6">
                                {item["product"]["title"]}
                              </div>
                              <span>
                                Unit Price: {item["price"]}, Total:{" "}
                                {item["price"] * parseInt(item["qty"])}
                              </span>
                              <br />
                              <span>
                                Qty: {item["qty"]}, Size: {item["size"]}, Color:{" "}
                                {item["color"]}
                              </span>
                            </div>
                            <button
                              onClick={() => setModalShow(true)}
                              className="btn btn-success"
                            >
                              Create Review
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <Modal show={modalShow} onHide={() => setModalShow(false)}>
                <Modal.Header closeButton>
                  <h6>Create Review</h6>
                </Modal.Header>
                <Modal.Body>
                  <div className="container">
                    <div className="row">
                      <div className="col-12 p-2">
                        <label className="form-label">Rating</label>
                        <select
                          onChange={(e) =>
                            setReviewDetail((prev) => ({
                              ...prev,
                              rating: e.target.value,
                            }))
                          }
                          className="form-select"
                        >
                          <option value="5">5 Star</option>
                          <option value="4">4 Star</option>
                          <option value="3">3 Star</option>
                          <option value="2">2 Star</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                      <div className="col-12 p-2">
                        <label className="form-label">Review</label>
                        <textarea
                          onChange={(e) =>
                            setReviewDetail((prev) => ({
                              ...prev,
                              des: e.target.value,
                            }))
                          }
                          className="form-control"
                          rows={7}
                        />
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button className="btn btn-dark" onClick={()=>setModalShow(false)}>Close</button>
                  <SubmitButton
                    text="Submit"
                    className="btn btn-success"
                    onClick={submitReview}
                  />
                </Modal.Footer>
              </Modal>
            </div>
          </Layout>
        );
      };
};

export default InvoicePage;
