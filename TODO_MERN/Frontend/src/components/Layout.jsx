import React from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { motion } from "framer-motion";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1e] to-[#1a1a2e] text-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 md:p-10"
      >
        <Navigation />
        <div className="mt-6">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default Layout;
