import Skeleton from "react-loading-skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import imgJson from "../../assets/images/image.json";

const ProductSkeleton = () => {
  return (
    <div className="container">
      <div className="row">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
            <div className="card shadow-sm h-100 rounded-3 bg-white">
              <Player autoplay loop src={imgJson} className="w-100" />
              <div className="card-body">
                <Skeleton count={3} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
