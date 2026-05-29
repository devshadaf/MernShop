import FeatureStore from "../../store/FeatureStore";
import parse from "html-react-parser"
import LegalSkeleton from "../skeleton/Legal-Skeleton";

const LegalDetail = () => {
    const { LegalDetails } = FeatureStore();
    console.log(LegalDetails)
    if (!LegalDetails) {
      return <LegalSkeleton />;
    }
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card p-4">
            {parse(LegalDetails.data[0].description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDetail;
