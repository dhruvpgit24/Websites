import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-6 md:px-16 py-12">
      <p className="text-2xl font-semibold text-[#2E2E2E] mb-8 text-center">
        Browse through the doctors specialist.
      </p>

      <div className="block lg:hidden mb-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-[#9708CC] text-white px-4 py-2 rounded-md font-medium shadow hover:bg-[#7d0bb5] transition"
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <div
          className={`${
            showFilter ? "block" : "hidden"
          } lg:block bg-[#e4e4e4] p-6 rounded-xl shadow w-full lg:w-1/4`}
        >
          <p className="text-lg font-medium text-[#2E2E2E] mb-4">
            Specialities
          </p>
          <div className="space-y-3 text-[#666666] text-sm">
            {[
              "General physician",
              "Gynecologist",
              "Dermatologist",
              "Pediatricians",
              "Neurologist",
              "Gastroenterologist",
            ].map((spec, idx) => (
              <p
                key={idx}
                onClick={() =>
                  speciality === spec
                    ? navigate("/doctors")
                    : navigate(`/doctors/${spec}`)
                }
                className="cursor-pointer hover:text-[#9708CC]"
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="cursor-pointer bg-[#f0e7ff] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:bg-[#E3D2F4]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                {item.available === true || item.available === "true" ? (
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Available
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-red-600 font-medium mb-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    Unavailable
                  </div>
                )}

                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-[#666666]">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
