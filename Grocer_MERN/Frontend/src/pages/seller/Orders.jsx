import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { assets, dummyOrders } from "../../assets/assets";
import { toast } from "sonner";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const {data} = await axios.get('/api/order/seller');
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-auto bg-gray-50 px-4 py-6 md:px-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Orders List</h2>

      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row justify-between gap-6 p-5 max-w-4xl border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
        >
          <div className="flex gap-4 md:max-w-xs">
            <img
              className="w-14 h-14 object-cover"
              src={assets.box_icon}
              alt="boxIcon"
            />
            <div>
              {order.items.map((item, idx) => (
                <p
                  key={idx}
                  className="text-gray-800 font-medium leading-tight"
                >
                  {item.product.name}{" "}
                  <span className="text-green-600 font-semibold">
                    x {item.quantity}
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-800">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city}
            </p>
            <p>
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
            <p className="mt-1 text-gray-700">{order.address.phone}</p>
          </div>

          <div className="text-lg font-semibold text-gray-900 flex items-start md:items-center min-w-16">
            {currency}
            {order.amount}
          </div>

          <div className="text-sm flex flex-col gap-1 text-gray-700">
            <p>
              <span className="font-medium">Method:</span> {order.paymentType}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Payment:</span>{" "}
              <span
                className={`font-semibold ${
                  order.isPaid ? "text-green-600" : "text-red-500"
                }`}
              >
                {order.isPaid ? "Paid" : "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
