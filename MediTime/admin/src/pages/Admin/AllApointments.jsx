import React, { useEffect, useContext } from "react";
import { Admincontext } from "../../context/Admincontext";
import { FaUserMd, FaUser } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const { getAllAppointments, appointments, aToken, backendUrl } =
    useContext(Admincontext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  const handleCancel = async (id) => {
    try {
      const { data } = await axios.patch(
        `${backendUrl}/api/admin/appointments/${id}/cancel`,
        {},
        {
          headers: { aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to cancel appointment");
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen mt-8 ml-5">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📁 All Appointments
      </h1>

      <div className="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-[#F5F5F5] sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                #
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Patient Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Email
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Doctor Name
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Speciality
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Time
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Fee
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments?.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-500">
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-100 transition">
                  <td className="px-4 py-4 text-gray-700">{index + 1}</td>

                  <td className="px-4 py-4 flex items-center gap-2">
                    <FaUser className="text-blue-500" />
                    <span className="font-medium text-gray-800">
                      {item.userData?.name || "N/A"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {item.userData?.email || "N/A"}
                  </td>

                  <td className="px-4 py-4 flex items-center gap-2">
                    <FaUserMd className="text-purple-600" />
                    <span className="font-medium text-gray-800">
                      {item.docData?.name || "N/A"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {item.docData?.speciality || "N/A"}
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {item.slotDate.replaceAll("_", "/")}
                  </td>

                  <td className="px-4 py-4 text-gray-700">{item.slotTime}</td>

                  <td className="px-4 py-4 text-gray-700 font-semibold">
                    ₹{item.amount}
                  </td>

                  <td className="px-4 py-4">
                    {item.cancelled ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                        Cancelled
                      </span>
                    ) : (
                      <>
                        <div className="flex flex-wrap gap-2">
                          {item.paid ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              Paid
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                              Pending
                            </span>
                          )}

                          {item.isCompleted && (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                              Completed
                            </span>
                          )}

                          {!item.isCompleted && (
                            <button
                              className={`px-3 py-1 rounded text-xs shadow-sm transition duration-150 ${
                                item.cancelled
                                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              }`}
                              onClick={() => handleCancel(item._id)}
                              disabled={item.cancelled}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
