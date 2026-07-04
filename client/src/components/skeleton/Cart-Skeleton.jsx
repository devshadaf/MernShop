import Skeleton from "react-loading-skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import imgJson from "../../assets/images/image.json";

const CartSkeleton = () => {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            <ul className="list-group list-group-flush">
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <li
                    className="list-group-item d-flex align-items-start"
                    key={i}
                  >
                    <Player
                      autoplay
                      loop
                      src={imgJson}
                      style={{ width: "120px" }}
                    />
                    <div className="p-3">
                      <Skeleton count={3} style={{ width: "350px" }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
