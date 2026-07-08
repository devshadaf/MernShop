import { Link } from "react-router";
import Logo from "../../assets/images/plainb-logo.svg";
import ProductStore from "../../store/ProductStore";
import UserStore from "../../store/UserStore";
import { useEffect } from "react";
import CartStore from "../../store/CartStore";
import WishStore from "../../store/WishStore";

const Navbar = () => {
  const { SearchValue, setSearchValue } = ProductStore();
  const { isUserLogin, UserLoginVerify, UserLogout } = UserStore();
  const { cartListCount } = CartStore();
  const { wishListCount } = WishStore();

  const handleSearchInput = () => {
    setSearchValue("");
  };

  useEffect(() => {
    UserLoginVerify();
  }, []);

  return (
    <>
      <div className="container-fluid text-white p-2 bg-success">
        <div className="container">
          <div className="row justify-content-around">
            <div className="col-md-6">
              <span>
                <span className="fs-6 mx-2">
                  <i className="bi bi-envelope"></i> Support@PlanB.com{" "}
                </span>
                <span className="fs-6 mx-2">
                  <i className="bi bi-envelope"></i> 01774688159{" "}
                </span>
              </span>
            </div>
            <div className="col-md-6">
              <span className="float-end">
                <span className="bodySmal mx-2 fs-6 cursor-pointer">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="bodySmal mx-2 fs-6 cursor-pointer">
                  <i className="bi bi-youtube"></i>
                </span>
                <span className="bodySmal  mx-2 fs-6 cursor-pointer">
                  <i className="bi bi-facebook"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar sticky-top bg-white navbar-expand-lg navbar-light py-3">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img className="img-fluid" src={Logo} alt="Logo" width="96px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            ariacontrols="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
              <span className="nav-item me-4">
                <Link className="btn ms-2 btn-light position-relative" to="/">
                  <i className="bi bi-house"></i> Home
                </Link>
                <Link
                  to="/cart"
                  type="button"
                  className="btn ms-2 btn-light position-relative"
                >
                  <i className="bi text-dark bi-bag"></i> Cart
                  {cartListCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                      {cartListCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/wish"
                  type="button"
                  className="btn ms-4 btn-light position-relative"
                >
                  <i className="bi text-dark bi-heart"></i> Wish
                  {wishListCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                      {wishListCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/order"
                  type="button"
                  className="btn ms-4 btn-light position-relative"
                >
                  <i className="bi text-dark  bi-truck"></i> Order
                </Link>
              </span>
            </ul>
          </div>

          <div className=" d-lg-flex">
            <div className="input-group">
              <input
                value={SearchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Link to={`/by-keyword/${SearchValue}`}>
                <button
                  onClick={handleSearchInput}
                  className="btn btn-outline-dark"
                  type="submit"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ width: 20, height: 20 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0
7 7 0 0114 0z"
                    />{" "}
                    width: height: Slider Component
                  </svg>
                </button>
              </Link>
            </div>

            {isUserLogin ? (
              <>
                <Link
                  type="button"
                  className="btn ms-3 btn-success d-flex"
                  to="/profile"
                >
                  Profile
                </Link>
                <button
                  onClick={() => UserLogout()}
                  className="btn ms-3 btn-success d-flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                type="button"
                className="btn ms-3 btn-success d-flex"
                to="/otp"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
