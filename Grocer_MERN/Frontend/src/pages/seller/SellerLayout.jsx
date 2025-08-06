import React from "react";
import { useAppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { NavLink, Link, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SellerLayout = () => {
  const { axios,navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async() => {
    try {
      const {data} = await axios.get('/api/seller/logout')
      if(data.success){
        toast.success(data.message)
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white shadow-md"
      >
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-5 text-gray-600 font-medium">
          <p>Hi! Admin</p>
          <button
            onClick={logout}
            className="border border-green-400 text-green-500 hover:text-white hover:bg-green-500 px-4 py-1 rounded-full transition-all duration-300 shadow-sm"
          >
            Logout
          </button>
        </div>
      </motion.div>

      <div className="flex">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="md:w-56 w-16 border-r h-screen border-gray-200 pt-4 flex flex-col bg-white shadow-lg"
        >
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 rounded-r-full mx-2 my-1 transition-all duration-200 cursor-pointer focus:outline-none
                  ${
                    isActive
                      ? "bg-green-100 text-green-600 font-semibold shadow-inner border-r-4 border-green-500"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p className="md:block hidden">{item.name}</p>
            </NavLink>
          ))}
        </motion.div>

        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
