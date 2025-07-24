import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/Doctorcontext";

const DoctorProfile = () => {
  const {
    getProfileData,
    profileData,
    dToken,
    setProfileData,
    updateDoctorProfile,
  } = useContext(DoctorContext);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  const updateProfile = async () => {
    try {
      await updateDoctorProfile();     
      setIsEdit(false); 
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    profileData && (
      <div className="p-2 mt-1 ml-2 md:p-10 bg-white min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-6 border-b border-gray-200">
            <div className="flex-shrink-0">
              <img
                src={profileData.image}
                alt="Doctor"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                {profileData.degree} — {profileData.speciality}
              </p>
              <span className="mt-2 inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
                {profileData.experience} years experience
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700">About</h3>
              <p className="text-gray-600 text-sm mt-1">
                {profileData.about || "No information provided."}
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700">
                Appointment Fee:
                <span className="text-indigo-600 ml-2 font-bold">
                  ₹{" "}
                  {isEdit ? (
                    <input
                      type="number"
                      className="border px-2 py-1 ml-2 rounded"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fees: e.target.value,
                        }))
                      }
                      value={profileData.fees}
                    />
                  ) : (
                    profileData.fees
                  )}
                </span>
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600 text-sm mt-1">
                {isEdit ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                    value={profileData.address.line1}
                  />
                ) : (
                  profileData.address?.line1
                )}
              </p>
              <p className="text-gray-600 text-sm">
                {isEdit ? (
                  <input
                    type="text"
                    className="border px-2 py-1 rounded"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                    value={profileData.address.line2}
                  />
                ) : (
                  profileData.address?.line2
                )}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="available" className="text-gray-700 font-medium">
                Available
              </label>
              <input
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type="checkbox"
                id="available"
                checked={profileData.available}
                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>

            <div className="pt-4">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-indigo-500 hover:bg-indigo-800 transition-all text-white px-6 py-2 rounded-full shadow-md font-semibold"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="bg-indigo-500 hover:bg-indigo-800 transition-all text-white px-6 py-2 rounded-full shadow-md font-semibold"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
