import { useNavigate } from "react-router-dom";
import CartStore from "../../store/CartStore";
import ProfileStore from "../../store/ProfileStore";
import SubmitButton from "./SubmitButton";
import toast from "react-hot-toast";

const Cart = () => {
    const { ProfileForm } = ProfileStore();
    const navigate=useNavigate()
    const {
      cartList,
      removeCardListRequest,
      getCardListRequest,
      total,
      payable,
      vat,
      createInvoiceRequest,
    } = CartStore();

    const remove=async(id)=>{
       const res= await removeCardListRequest(id)
       await getCardListRequest();
       if(res){
        toast.success("Cart item Removed")
       }
    }

    const handleInvoice=async()=>{
      const hasEmptyField = Object.values(ProfileForm).some(
        (value) => value.trim() == "",
      );

      if (hasEmptyField) {
        navigate("/profile");
        toast.error("Please complete your profile first");
        return;
      }

      await createInvoiceRequest();
    }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            <ul className="list-group list-group-flush">
              {" "}
              {cartList.map((item, i) => {
                return (
                  <li
                    className="list group-item d-flex justify-content-between align-items-start py-3"
                    key={i}
                  >
                    <img
                      className="rounded-1"
                      width="90"
                      height="auto"
                      src={item["product"]["image"]}
                    />
                    <div className="ms-2 me-auto">
                      <p className="fw-lighter m-0">
                        {item["product"]["title"]}
                      </p>
                      <p className="fw-lighter my-1">
                        Unit Price: {item.price},Qty: {item["qty"]}, Size:{" "}
                        {item["size"]}, Color: {item["color"]}
                      </p>
                      <p className=" h6 fw-bold m-0 text-dark">
                        Total <i className="bi bi-currency-dollar"></i>
                        {parseInt(
                          item.product.discount
                            ? item.product.discountPrice
                            : item.product.price,
                        ) * parseInt(item["qty"])}{" "}
                      </p>
                    </div>
                    <button
                      onClick={() => remove(item["_id"])}
                      className="btn btn-sm btn-outline-danger"
                    >
                      {" "}
                      <i className="bi bi-trash"></i>
                    </button>
                  </li>
                );
              })}{" "}
            </ul>
            <div className="my-3">
              <ul className="list-group bg-transparent list-group-flush">
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    <b>
                      {" "}
                      Total: <i className="bi bi-currency-dollar" />
                      {total}{" "}
                    </b>
                  </span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    <b>
                      {" "}
                      Vat(5%): <i className="bi bi-currency-dollar" />
                      {vat()}
                    </b>
                  </span>
                </li>
                <li className="list-group-item bg-transparent h6 m-0 text-dark">
                  <span className="float-end">
                    {" "}
                    <b>
                      {" "}
                      Payable: <i className="bi bi-currency-dollar" />
                      {payable()}
                    </b>
                  </span>
                </li>
                <li className="list-group-item bg-transparent ">
                  <span className="float-end">
                    <SubmitButton
                    onClick={handleInvoice}
                      text="Check Out "
                      className="btn px-5 mt-2 btn-success"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
