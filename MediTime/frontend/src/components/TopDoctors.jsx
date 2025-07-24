import React, { useContext } from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="px-6 md:px-16 py-16 text-[#2E2E2E] bg-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Top Doctors to Book
        </h1>
        <p className="text-[#666666] max-w-xl mx-auto">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto cursor-pointer">
        {doctors.slice(0, 10).map((item, index) => (
          
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="bg-[#F6F0FF] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm font-medium mb-1 ${
                  item.available ? "text-green-600" : "text-red-600"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                ></span>
                {item.available ? "Available" : "Unavailable"}
              </div>

              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-[#666666]">{item.speciality}</p>
              {console.log(item.name, "available:", item.available, typeof item.available)}

            </div>
            
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="bg-gradient-to-r from-[#a800e5] to-[#cc40ff] text-white px-6 py-3 rounded-full shadow-md hover:shadow-2xl transition-all font-medium"
        >
          More
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
