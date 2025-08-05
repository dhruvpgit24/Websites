import React, { useContext, useEffect } from "react";
import { Admincontext } from "../../context/Admincontext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { dashData, getDashData, aToken, cancelAppointment } =
    useContext(Admincontext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="p-6 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            icon={assets.doctor_icon}
            label="Doctors"
            value={dashData.doctors}
          />
          <StatCard
            icon={assets.appointments_icon}
            label="Appointments"
            value={dashData.appointments}
          />
          <StatCard
            icon={assets.patients_icon}
            label="Patients"
            value={dashData.patients}
          />
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center mb-4">
            <img src={assets.list_icon} alt="" className="w-6 h-6 mr-2" />
            <p className="text-lg font-semibold">Latest Bookings</p>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-md border"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.docData.image}
                    alt=""
                    className="w-14 h-14 object-cover rounded-full"
                  />
                  <div>
                    <p className="font-medium">{item.docData.name}</p>
                    <p className="text-sm text-gray-500"><p>{item.slotDate?.split("_").join("/")}</p></p>
                  </div>
                </div>

                <div>
                  {item.cancelled ? (
                    <span className="px-4 py-2 text-sm rounded-full bg-gray-200 text-gray-500 border border-gray-300">
                      Cancelled
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white shadow-md rounded-lg p-5 flex items-center space-x-4">
    <img src={icon} alt={label} className="w-10 h-10" />
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

export default Dashboard;
