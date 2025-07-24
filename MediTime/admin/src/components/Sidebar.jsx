import React, { useContext } from 'react';
import { Admincontext } from '../context/Admincontext';
import { DoctorContext } from '../context/Doctorcontext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  const { aToken } = useContext(Admincontext);
  const { dToken } = useContext(DoctorContext);

  if (aToken) {
    return (
      <div className="min-h-screen w-[220px] bg-white p-4 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.2)]">
        <ul className="space-y-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            <p>Add Doctor</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      </div>
    );
  }

  if (dToken) {
    return (
      <div className="min-h-screen w-[220px] bg-white p-4 shadow-[4px_0_6px_-2px_rgba(0,0,0,0.2)]">
        <ul className="space-y-4">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-[#6C63FF]/10 text-[#6C63FF] font-semibold'
                  : 'text-gray-700 hover:bg-[#6C63FF]/10 hover:text-[#1d11ff]'
              }`
            }
          >
            <img src={assets.people_icon} alt="Profile" className="w-5 h-5" />
            <p>Profile</p>
          </NavLink>
        </ul>
      </div>
    );
  }

  return null; 
};

export default Sidebar;
