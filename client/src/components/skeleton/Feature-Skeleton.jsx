import Skeleton from "react-loading-skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import imgJson from "../../assets/images/image.json";

const FeatureSkeleton = () => {
  return (
    <div className="container section">
      <div className="row">
        {Array.from({ length: 4 }).map((_,i) => (
          <div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="row">
                  <div className="col-4">
                    <Player autoplay loop src={imgJson} className="w-100" />
                  </div>
                  <div className="col-8">
                    <Skeleton count={3} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSkeleton;
