import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/Doctorcontext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    getAppointments,
    appointments,
    dToken,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        All Appointments
      </h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Patient</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Date & Time</th>
              <th className="py-3 px-4 text-left">Fees</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {appointments.reverse().map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50 transition-all"
              >
                <td className="py-3 px-4">{index + 1}</td>

                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={item.userData.image}
                    alt="user"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{item.userData.name}</span>
                </td>

                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      item.payment
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.payment ? "Online" : "Cash"}
                  </span>
                </td>

                <td className="py-3 px-4">{item.userData.email}</td>

                <td className="py-3 px-4">
                  {item.slotDate?.split("_").join("/")}
                  <br />
                  <span className="text-sm text-gray-500">
                    {item.slotTime}
                  </span>
                </td>

                <td className="py-3 px-4 font-semibold text-indigo-600">
                  ₹{item.amount}
                </td>

                <td className="py-3 px-4 text-center">
                  {item.isCompleted ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                      Completed
                    </span>
                  ) : item.cancelled ? (
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
                      Cancelled
                    </span>
                  ) : (
                    <div className="flex justify-center gap-3">
                      <button
                        className="p-2 bg-red-400 hover:bg-red-500 rounded-full transition"
                        title="Cancel"
                        onClick={() => cancelAppointment(item._id)}
                      >
                        <img
                          src={assets.cancel_icon}
                          alt="cancel"
                          className="w-5 h-5"
                        />
                      </button>
                      <button
                        className="p-2 bg-green-400 hover:bg-green-500 rounded-full transition"
                        title="Approve"
                        onClick={() => completeAppointment(item._id)}
                      >
                        <img
                          src={assets.tick_icon}
                          alt="approve"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}

            {appointments.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 px-4 text-center text-gray-500">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorAppointments;
