import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => product.category === item.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.image[0] ? product.image[0] : null);
  }, [product]);

  return (
    product && (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12"
      >
        <p className="text-sm text-gray-600">
          <Link to={"/"}>Home</Link> /<Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}>
            {" "}
            {product.category}
          </Link>{" "}
          /<span className="text-green-600"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4 bg-gray-100 rounded-2xl p-8">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.image.map((image, index) => (
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border border-gray-500/30 rounded overflow-hidden cursor-pointer shadow-md hover:shadow-green-300 transition-all duration-300 max-w-24"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.01, rotate: 0.5 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="border border-gray-500/30 max-w-100 rounded overflow-hidden shadow-lg hover:shadow-green-300"
            >
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm w-full md:w-1/2"
          >
            <h1 className="text-3xl font-semibold text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="md:w-4 w-3.5"
                  />
                ))}
              <p className="text-base ml-2">({4})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-400 line-through">
                MRP: {currency}
                {product.price}
              </p>
              <p className="text-2xl font-bold text-green-600">
                MRP: {currency}
                {product.offerPrice}
              </p>
              <span className="text-gray-500">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-600">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => addToCart(product._id)}
                className="w-full py-3.5 font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition shadow-md hover:shadow-gray-300"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => {
                  addToCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 font-medium bg-green-500 text-white hover:bg-green-600 transition shadow-md hover:shadow-green-400"
              >
                Buy now
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center w-max"
          >
            <p className="text-3xl font-semibold">Related Products</p>
            <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {relatedProducts
              .filter((product) => product.inStock)
              .map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              navigate("/products");
              scrollTo(0, 0);
            }}
            className="mt-6 px-5 py-2 rounded bg-green-100 hover:bg-green-200 text-green-700 transition"
          >
            See More
          </motion.button>
        </div>
      </motion.div>
    )
  );
};

export default ProductDetails;
