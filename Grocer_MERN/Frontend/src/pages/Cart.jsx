import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets, dummyAddress } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);

  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    axios,
    user,
    setCartItems
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddresses, setShowAddresses] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const getUserAddress = async () => {
    const { data } = await axios.get("/api/address/get");
    try {
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const placeOrder = async () => {
    console.log("Order Payload", {
      address: selectedAddress,
      items: Object.entries(cartItems).map(([product, quantity]) => ({
        product,
        quantity,
      })),
    });
  
    try {
      if (!selectedAddress) {
        return toast.error("Please select an Address");
      }
  
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          address: selectedAddress._id,
          items: Object.entries(cartItems).map(([product, quantity]) => ({
            product,
            quantity,
          })),
        });
  
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };  

  useEffect(() => {
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [cartItems, products]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16 gap-10 px-4 sm:px-6 md:px-10 pb-10 bg-gray-50 text-[#3d4853] p-8 rounded-xl">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-base text-green-500 font-medium">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm font-semibold border-b pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium py-4 border-b bg-white rounded-md"
          >
            <div className="flex items-center md:gap-6 gap-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="cursor-pointer w-20 h-20 flex items-center justify-center border border-gray-300 rounded-md overflow-hidden shadow-sm"
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </motion.div>
              <div>
                <p className="hidden md:block font-semibold">{product.name}</p>
                <div className="font-normal text-gray-500/70 text-sm">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center mt-1">
                    <p>Qty:</p>
                    <select
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                      className="outline-none ml-1 bg-white border border-gray-300 px-2 py-1 rounded-md text-sm"
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-base font-semibold text-gray-700">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => removeFromCart(product._id)}
              className="cursor-pointer mx-auto"
            >
              <img src={assets.remove_icon} alt="Remove" />
            </motion.button>
          </motion.div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-green-500 font-medium"
        >
          <img
            className="group-hover:-translate-x-1 transition"
            src={assets.arrow_right_icon_colored}
            alt=""
          />
          Continue Shopping
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-[360px] w-full bg-gray-50 p-5 rounded-lg border border-gray-200 shadow-sm"
      >
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-gray-600">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500 pr-4 text-sm">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-green-500 hover:underline cursor-pointer text-sm"
            >
              Change
            </button>

            <AnimatePresence>
              {showAddress && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-12 z-10 left-0 right-0 py-1 bg-white border border-gray-300 text-sm w-full rounded shadow-lg"
                >
                  {addresses.map((address, index) => (
                    <p
                      key={index}
                      onClick={() => {
                        setSelectedAddress(address);
                        setShowAddress(false);
                      }}
                      className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {address.street}, {address.city}, {address.state},{" "}
                      {address.country}
                    </p>
                  ))}
                  <p
                    onClick={() => navigate("/add-address")}
                    className="text-green-500 text-center cursor-pointer p-2 hover:bg-green-100"
                  >
                    Add address
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-gray-600">
            Payment Method
          </p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded shadow-sm text-sm"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-gray-300" />

        <div className="text-gray-600 mt-4 space-y-2 text-sm">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-base font-medium mt-3 text-gray-700">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
          onClick={placeOrder}
          className="w-full py-3 mt-6 bg-green-500 text-white font-medium hover:bg-green-600 rounded transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </motion.button>
      </motion.div>
    </div>
  ) : null;
};

export default Cart;
