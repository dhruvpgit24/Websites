import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "sonner";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate("/");
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "relative text-primary-dark font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary-dark after:rounded-full after:content-[''] after:animate-underline"
      : "text-gray-600 hover:text-primary transition-colors duration-200 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-primary after:w-0 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white sticky top-0 z-50 shadow-sm"
    >
      <NavLink to="/" className="flex items-center gap-2">
        <img
          onClick={() => setOpen(false)}
          src={assets.logo}
          alt="Grocer Logo"
          className="w-28 object-contain"
        />
      </NavLink>

      <div className="hidden sm:flex items-center gap-8 text-sm font-medium">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={navLinkClass}>
          All Product
        </NavLink>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>

        <div className="hidden lg:flex items-center border border-gray-300 px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search products"
            className="py-1.5 bg-transparent outline-none placeholder:text-muted w-36"
          />
          <img src={assets.search_icon} alt="search" className="w-4 ml-2" />
        </div>

        {user && (
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <motion.img
              whileHover={{ scale: 1.1, rotate: 2 }}
              src={assets.nav_cart_icon}
              alt="cart"
              className="w-6"
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 12 }}
              className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center"
            >
              {getCartCount()}
            </motion.div>
          </div>
        )}

        {!user ? (
          <motion.button
            onClick={() => setShowUserLogin(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
          >
            Login
          </motion.button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              className="w-10 cursor-pointer"
              alt="profile"
            />
            <div className="absolute top-10 right-0 w-40 z-40">
              <ul className="opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300 bg-white shadow border border-gray-200 py-2.5 rounded-md text-sm">
                <li
                  onClick={() => navigate("my-orders")}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer text-text-dark"
                >
                  My Orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer text-text-dark"
                >
                  Logout
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        {user && (
          <div
            onClick={() => navigate("/cart")}
            className="relative cursor-pointer"
          >
            <img src={assets.nav_cart_icon} alt="cart" className="w-6" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 12 }}
              className="absolute -top-2 -right-2 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center"
            >
              {getCartCount()}
            </motion.div>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle Menu"
          className="sm:hidden"
        >
          <img src={assets.menu_icon} alt="menu" className="w-6" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex flex-col items-start gap-2 px-5 text-sm sm:hidden z-40"
          >
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              All Product
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className={navLinkClass}
            >
              Contact
            </NavLink>
            {user && (
              <NavLink
                to="/my-orders"
                onClick={() => setOpen(false)}
                className={navLinkClass}
              >
                My Orders
              </NavLink>
            )}
            {!user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="mt-2 bg-primary text-white rounded-full px-6 py-2 text-sm"
              >
                Login
              </motion.button>
            ) : (
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.05 }}
                className="mt-2 bg-primary text-white rounded-full px-6 py-2 text-sm"
              >
                Logout
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
