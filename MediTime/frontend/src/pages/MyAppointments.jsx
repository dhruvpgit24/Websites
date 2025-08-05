import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="px-6 md:px-16 py-12 min-h-screen bg-[#ffffff]">
      <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-8 text-center">
        My Appointments
      </h2>

      <div className="space-y-6">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found.</p>
        ) : (
          appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <div className="w-full sm:w-32">
                <img
                  src={item.docId.image}
                  alt={item.docId.name}
                  className="w-full h-32 object-cover rounded-xl border border-[#E0D5F3]"
                />
              </div>

              <div className="flex-1 space-y-1 text-sm text-[#444]">
                <p className="text-lg font-semibold text-[#2E2E2E]">
                  {item.docId.name}
                </p>
                <p className="text-[#9708CC]">{item.docId.speciality}</p>
                <p className="text-gray-600 font-medium mt-2">Address:</p>
                <p>{item.docId.address?.line1}</p>
                <p>{item.docId.address?.line2}</p>
                <p className="mt-2">
                  <span className="font-medium text-[#9708CC]">
                    Date & Time:
                  </span>{" "}
                  {item.slotDate.replaceAll("_", "/")} | {item.slotTime}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-0">
  {item.isCompleted ? (
    <span className="px-4 py-2 rounded-full bg-green-100 text-green-600 border border-green-300 font-medium text-sm">
      Completed
    </span>
  ) : item.cancelled ? (
    <span className="px-4 py-2 rounded-full bg-gray-100 text-gray-500 border border-gray-300 font-medium text-sm">
      Cancelled
    </span>
  ) : (
    <>
      <button
        onClick={() =>
          navigate("/payment", { state: { appointment: item } })
        }
        className="px-4 py-2 rounded-full bg-[#9708CC] text-white hover:bg-[#7c06b1] transition"
      >
        Pay Online
      </button>

      <button
        onClick={() => cancelAppointment(item._id)}
        className="px-4 py-2 rounded-full border text-[#9708CC] border-[#9708CC] hover:bg-[#f3e7ff] transition"
      >
        Cancel Appointment
      </button>
    </>
  )}
</div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
