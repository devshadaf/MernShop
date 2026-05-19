import Skeleton from "react-loading-skeleton";
import { Player } from "@lottiefiles/react-lottie-player";
import imgJson from "../../assets/images/image.json";

const CategorySkeleton = () => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
          <span className="bodySmal mb-5 text-center">
            Explore a World of Choices Across Our Most Popular <br />
            Shopping Categories{" "}
          </span>
            {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="col-6 col-lg-8r text-center col-md-8r p-2">
              <div  className="card h-100 rounded-3 bg-white">
                <div  className="card-body">
                  <Player autoplay loop src={imgJson} className="w-100" />
                  <Skeleton count={1} />
                </div>
              </div>
          </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
