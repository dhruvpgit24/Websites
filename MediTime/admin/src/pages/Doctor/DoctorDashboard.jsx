import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/Doctorcontext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dashData, getDashData, dToken } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return dashData && (
    <div className="p-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500">Earnings</p>
            <h2 className="text-2xl font-bold text-indigo-600">₹{dashData.earnings}</h2>
          </div>
          <img src={assets.earning_icon} className="text-indigo-600 text-3xl" alt="" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500">Appointments</p>
            <h2 className="text-2xl font-bold text-blue-600">{dashData.appointments}</h2>
          </div>
          <img src={assets.appointments_icon} className="text-indigo-600 text-3xl" alt="" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <p className="text-gray-500">Patients</p>
            <h2 className="text-2xl font-bold text-green-600">{dashData.patients}</h2>
          </div>
          <img src={assets.patients_icon} className="text-indigo-600 text-3xl" alt="" />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Latest Appointments</h3>
        <div className="space-y-4">
          {dashData.latestAppointments?.length === 0 ? (
            <p className="text-gray-500">No recent appointments</p>
          ) : (
            dashData.latestAppointments.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.userData?.image}
                    alt={item.userData?.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{item.userData?.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatDate(item.docData?.date)} • {item.slotTime}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    item.cancelled
                      ? 'text-red-500'
                      : item.isCompleted
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {item.cancelled
                    ? 'Cancelled'
                    : item.isCompleted
                    ? 'Completed'
                    : 'Pending'}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
