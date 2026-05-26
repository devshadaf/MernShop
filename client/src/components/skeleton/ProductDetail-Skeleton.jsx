import Skeleton from "react-loading-skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import imgJson from "../../assets/images/image.json";

const ProductDetailSkeleton = () => {
  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-7 align-content-center p-1">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Skeleton count={15} />
              </div>
              <div className="col-3">
                <Player autoplay loop src={imgJson} className="w-100" />
              </div>
              <div className="col-3">
                <Player autoplay loop src={imgJson} className="w-100" />
              </div>
              <div className="col-3">
                <Player autoplay loop src={imgJson} className="w-100" />
              </div>
              <div className="col-3">
                <Player autoplay loop src={imgJson} className="w-100" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 p-1">
          <Skeleton count={20} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
