import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken("");
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md rounded-xl relative">
      <img
        onClick={() => navigate("/")}
        className="w-32 md:w-36 object-contain cursor-pointer"
        src="/logo.png"
        alt="logo"
      />

      <ul className="hidden md:flex items-center gap-6 font-medium text-[#2E2E2E]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
          }
        >
          <li>HOME</li>
        </NavLink>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
          }
        >
          <li>ALL DOCTORS</li>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
          }
        >
          <li>ABOUT</li>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
          }
        >
          <li>CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4 md:gap-6">
        {token && userData ? (
          <div className="relative group">
          <div className="flex items-center gap-1 cursor-pointer">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={userData.image}
              alt="Profile"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown"
            />
          </div>
      
          <div className="absolute top-12 right-0 min-w-48 bg-[#F4F5F7] rounded-2xl shadow-md p-4 z-20 flex flex-col gap-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-500">
            <p
              onClick={() => navigate("my-profile")}
              className="hover:text-[#2E2E2E] cursor-pointer transition"
            >
              My Profile
            </p>
            <p
              onClick={() => navigate("my-appointments")}
              className="hover:text-[#2E2E2E] cursor-pointer transition"
            >
              My Appointments
            </p>
            <p
              onClick={logout}
              className="hover:text-[#2E2E2E] cursor-pointer transition"
            >
              Log Out
            </p>
          </div>
        </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-gradient-to-r from-[#9708CC] to-[#43CBFF] hover:opacity-90 text-white px-6 py-2 rounded-full transition-all duration-300 font-medium shadow-md max-sm:hidden max-lg:hidden"
          >
            Create Account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 cursor-pointer lg:hidden"
          src={assets.menu_icon}
          alt="menu"
        />
      </div>

      {showMenu && (
        <div className="fixed inset-0 z-30 bg-white p-6 flex flex-col gap-6 text-lg text-[#2E2E2E]">
          <div className="flex justify-between items-center mb-6">
            <img className="w-32" src="/logo.png" alt="Logo" />
            <img
              onClick={() => setShowMenu(false)}
              className="w-6 cursor-pointer"
              src={assets.cross_icon}
              alt="Close"
            />
          </div>

          <NavLink
            to="/"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/doctors"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
            }
          >
            All Doctors
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              isActive ? "text-[#9708CC]" : "hover:text-[#9708CC]"
            }
          >
            Contact
          </NavLink>
          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              className="mt-4 bg-gradient-to-r from-[#9708CC] to-[#43CBFF] text-white px-4 py-2 rounded-full"
            >
              Login / Register
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
