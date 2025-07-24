import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="px-6 md:px-16 py-16 text-[#2E2E2E] bg-white"
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find by Speciality
        </h1>
        <p className="text-[#666666] max-w-xl mx-auto">
          Simply browse through our extensive list of trusted doctors, schedule
          your appointment hassle-free.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10 max-w-6xl mx-auto">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center gap-3 group transition-transform duration-300 hover:scale-105"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#F6F0FF] rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:ring-4 group-hover:ring-[#d5e0ff]">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
              />
            </div>
            <p className="text-sm md:text-base font-medium text-[#2E2E2E] group-hover:text-[#9708CC] transition-colors duration-300">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
