import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, updateCartItem, removeFromCart, cartItems, navigate } =
    useAppContext();

  return (
    product && (
      <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        scrollTo(0, 0);
      }}
        className="border border-gray-200 rounded-xl shadow-sm bg-white w-full max-w-[250px] sm:max-w-[220px] md:max-w-56 p-3 transition-all hover:shadow-md hover:-translate-y-1 duration-200 mx-auto"
      >
        <div className="group relative flex items-center justify-center bg-indigo-50 rounded-lg p-2">
          <img
            src={product.image[0]}
            alt={product.name}
            className="group-hover:scale-105 transition-transform duration-300 w-20 sm:w-24 md:w-36"
          />
        </div>
        <div className="mt-3 text-gray-600 text-sm">
          <p className="mb-0.5">{product.category}</p>
          <p className="text-gray-800 font-semibold text-base sm:text-lg truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-1 mt-1">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt=""
                  className="w-4 h-4"
                />
              ))}
            <p className="text-xs text-gray-400">(4)</p>
          </div>
          <div className="flex items-end justify-between mt-4 flex-wrap gap-2">
            <p className="text-indigo-600 font-semibold text-sm sm:text-base md:text-lg">
              {currency}
              {product.offerPrice}
              <span className="text-gray-400 line-through ml-1 text-xs sm:text-sm">
                {currency}
                {product.price}
              </span>
            </p>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-indigo-500"
            >
              {!cartItems[product._id] ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 bg-indigo-100 text-indigo-600 text-xs sm:text-sm rounded-md border border-indigo-300 hover:scale-105 active:scale-100 transition-transform"
                >
                  <img src={assets.cart_icon} alt="" className="w-4 h-4" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-indigo-500/20 text-indigo-700 px-2 py-1 rounded-md select-none text-sm">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-md font-semibold px-2"
                  >
                    −
                  </button>
                  <span className="w-5 text-center">
                    {cartItems[product._id]}
                  </span>
                  <button
                    onClick={() => addToCart(product._id)}
                    className="text-md font-semibold px-2"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCard;
