import React from "react";
import { NavLink } from "react-router-dom";
import { RouteIndex, RouteTaskList } from "../helper/RouteName";

const Navigation = () => {
  const baseStyle =
    "relative py-2.5 px-6 text-sm font-semibold rounded-xl transition-all duration-300 border backdrop-blur-lg bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-purple-300";

  const activeStyle =
    "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg";

  return (
    <div className="pb-6 border-b border-white/10 flex gap-4">
      <NavLink
        to={RouteIndex}
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ""}`
        }
      >
        Add Task
      </NavLink>

      <NavLink
        to={RouteTaskList}
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? activeStyle : ""}`
        }
      >
        My Task
      </NavLink>
    </div>
  );
};

export default Navigation;
