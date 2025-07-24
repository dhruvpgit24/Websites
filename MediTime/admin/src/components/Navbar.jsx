import React, { useContext } from "react";
import { Admincontext } from "../context/Admincontext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/Doctorcontext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(Admincontext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    setAToken("");
    localStorage.removeItem("aToken");
    navigate("/");
    dToken && setDToken('')
    localStorage.removeItem("dToken");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10" />
        <div>
          <p className="text-sm uppercase tracking-widest text-gray-500">
            Dashboard Panel
          </p>
          <span className="inline-block mt-1 px-3 py-1 text-sm font-semibold text-[#6C63FF] bg-[#6C63FF]/10 rounded-full">
            {aToken ? "Admin" : "Doctor"}
          </span>
        </div>
      </div>

      <button
        onClick={logout}
        className="bg-[#6C63FF] hover:bg-[#4d41f5] text-white px-4 py-2 rounded-lg font-medium transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
