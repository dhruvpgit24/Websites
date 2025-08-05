import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="relative bg-gradient-to-tr from-[#e9daff] to-[#e2ebff] rounded-3xl overflow-hidden px-6 md:px-16 py-16 md:py-20 mx-4 md:mx-8 mt-8 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">

        <div className="w-full md:w-1/2 text-center md:text-left text-[#2E2E2E]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            Book Appointment <br />
            With <span className="text-[#9708CC]">Trusted Doctors</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:gap-4 mb-6">
            <img
              src={assets.group_profiles}
              alt="People"
              className="w-20 h-10 object-cover rounded-full shadow-sm mb-2 sm:mb-0"
            />
            <p className="text-[#666666] text-sm md:text-base leading-relaxed">
              Trusted by thousands. Browse our list of verified doctors and
              schedule your appointment with ease.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center gap-2 px-6 py-3 text-white bg-gradient-to-r from-[#9708CC] to-[#43CBFF] rounded-full shadow-md hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1"
          >
            Book Appointment
            <img src={assets.arrow_icon} alt="Arrow" className="w-4 h-4" />
          </a>
        </div>

        <div className="w-full md:w-1/2 flex justify-center relative z-10">
          <div className="absolute -top-10 -left-10 w-72 h-72 bg-[#9708CC] opacity-35 blur-3xl rounded-full z-0 hidden md:block"></div>
          <img
            src={assets.header_img}
            alt="Doctors"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md z-10 relative"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
