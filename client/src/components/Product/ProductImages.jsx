import ProductStore from "../../store/ProductStore";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/image-gallery.css";

const ProductImages = () => {
   const {  ProductDetails } = ProductStore();
   const images = [
  {
    original: `${ProductDetails.data[0].img1}`,
    thumbnail: `${ProductDetails.data[0].img1}`,
  },
  {
    original: `${ProductDetails.data[0].img2}`,
    thumbnail: `${ProductDetails.data[0].img2}`,
  },
  {
    original: `${ProductDetails.data[0].img3}`,
    thumbnail: `${ProductDetails.data[0].img3}`,
  },
  {
    original: `${ProductDetails.data[0].img4}`,
    thumbnail: `${ProductDetails.data[0].img4}`,
  },
  {
    original: `${ProductDetails.data[0].img5}`,
    thumbnail: `${ProductDetails.data[0].img5}`,
  },
  {
    original: `${ProductDetails.data[0].img6}`,
    thumbnail: `${ProductDetails.data[0].img6}`,
  },
  {
    original: `${ProductDetails.data[0].img7}`,
    thumbnail: `${ProductDetails.data[0].img7}`,
  },
  {
    original: `${ProductDetails.data[0].img8}`,
    thumbnail: `${ProductDetails.data[0].img8}`,
  },

];
  return (
    <ImageGallery
      items={images}
    />
  );
};

export default ProductImages;
