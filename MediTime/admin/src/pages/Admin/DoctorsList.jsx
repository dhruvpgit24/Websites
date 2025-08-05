import React, { useContext, useEffect } from "react";
import { Admincontext } from "../../context/Admincontext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken , changeAvailablity } = useContext(Admincontext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="bg-white hover:shadow-2xl transition duration-300 rounded-xl overflow-hidden border border-gray-200 hover:-translate-y-1"
          >
            <div className="bg-[#ededff] h-52 flex items-center justify-center overflow-hidden hover:bg-indigo-200">
              <img
                src={item.image}
                alt={item.name}
                className="h-full object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-indigo-600 mb-3">{item.speciality}</p>
              <div className="flex items-center gap-2">
                <input
                onChange={()=> changeAvailablity(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="accent-green-600 w-4 h-4"
                />
                <p className="text-sm text-gray-700">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
