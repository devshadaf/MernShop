import { IoIosStar } from "react-icons/io";
import { Link } from "react-router";

const ProductCard = ({ data }) => {
  return (
    <div className="row">
      {data.data.map((item, i) => {
        const star = parseInt(item.star);
        const ItemPrice = item.discount ? (
          <p className="bodyMedium text-dark my-1">
            Price: <strike className="pe-2">{item.price}</strike>
            <b>{item.discountPrice}</b>
          </p>
        ) : (
          <p className="bodyMedium text-dark my-1">
            Price: <b>{item.price}</b>
          </p>
        );

        return (
          <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
            <Link
              to={`/product-detail/${item._id}`}
              className="card shadow-sm h-100 rounded-3 bg-white cursor-pointer"
            >
              <img className="w-100 rounded-top-2" src={item.image} />
              <div className="card-body">
                <p className="bodySmal text-secondary my-1">{item.title}</p>
                {ItemPrice}
                <p className="bodyMedium text-dark my-1">
                  {" "}
                  Rating :
                  {Array.from({ length: star }).map((_, i) => (
                    <IoIosStar fill="#FAB63E" key={i} />
                  ))}
                </p>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;
