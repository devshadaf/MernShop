import { Link } from "react-router"; 
import payIcon from "../../assets/images/payment.png"

const Footer = () => {
  return (
    <>
      <div>
        <div className="section-bottom shadow-sm bg-light">
          <div className="container py-5">
            <div className="row">
              <div className="col-md-4">
                <h1 className="fs-5 mb-3">Legals</h1>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    About
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    Refund Policy
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    Terms
                  </Link>
                </p>
              </div>
              <div className="col-md-4">
                <h1 className="fs-5 mb-3">Information</h1>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    How to buy
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    Contact
                  </Link>
                </p>
                <p className="my-2">
                  <Link className="nav-link" to="/">
                    Complain
                  </Link>
                </p>
              </div>
              <div className="col-md-4">
                <h1 className="fs-5 mb-3">About</h1>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum{" "}
                </p>
                <img className="w-75" src={payIcon} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark py-3 text-center">
          <p className="text-white bodySmal">All Rights Reserved. Developed by devShadaf </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
