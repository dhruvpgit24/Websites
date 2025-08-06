import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { dummyOrders } from "../assets/assets";
import { motion } from "framer-motion";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency,axios,user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/user')
      if(data.success){
        setMyOrders(data.orders)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(user){
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="py-10 px-4 md:px-10">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-semibold text-gray-800">My Orders</p>
        <div className="w-16 h-1 bg-primary rounded-full mt-1"></div>
      </div>

      <div className="space-y-8">
        {myOrders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white backdrop-blur-sm border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-xl p-6 space-y-6 hover:scale-[1.01] transition-all duration-300"
          >
            {console.log("Order Date:", order.createdAt)}
            <div className="flex flex-wrap justify-between text-sm text-gray-600">
              <span className="font-medium">🧾 Order ID: {order._id}</span>
              <span className="font-medium">💳 Payment: {order.paymentType}</span>
              <span className="font-medium">💰 Total: {currency}{order.amount}</span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gray-100 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded shadow-lg"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800">{item.product.name}</h2>
                      <p className="text-sm text-gray-600">{item.product.category}</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 space-y-1 text-sm text-gray-600">
                    <p>🛒 Quantity: {item.quantity || "1"}</p>
                    <p>📦 Status: {order.status}</p>
                    <p>📅 Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-primary font-medium mt-1">
                      ₹ Amount: {currency}{item.product.offerPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
