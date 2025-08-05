import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, backendUrl, token, loadUserProfileData } = useContext(AppContext);
  const [formData, setFormData] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [updating, setUpdating] = useState(false); // loading state

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      setUpdating(true);

      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("dob", formData.dob);
      form.append("gender", formData.gender);
      form.append("address", JSON.stringify(formData.address));
      if (file) {
        form.append("image", file);
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/update-profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success("Profile updated");
        loadUserProfileData();
        setIsEdit(false);
        setFile(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Update failed: " + (error.response?.data?.message || error.message));
    } finally {
      setUpdating(false);
    }
  };

  if (!formData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-2xl mt-10 mb-16">
      <div className="flex flex-col items-center gap-4">
        <img
          src={file ? URL.createObjectURL(file) : formData.image}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-[#9708CC] shadow-md"
        />
        {isEdit && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
          />
        )}

        {isEdit ? (
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="text-center text-lg font-semibold text-gray-800 w-full bg-gray-100 rounded p-2"
          />
        ) : (
          <h2 className="text-xl font-semibold text-[#2E2E2E]">{formData.name}</h2>
        )}
        <p className="text-sm text-gray-500">{formData.email}</p>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <p className="font-medium text-[#9708CC] mb-1">Phone</p>
          {isEdit ? (
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full border rounded p-2 bg-gray-50"
            />
          ) : (
            <p>{formData.phone}</p>
          )}
        </div>

        <div>
          <p className="font-medium text-[#9708CC] mb-1">Address</p>
          {isEdit ? (
            <>
              <input
                type="text"
                value={formData.address?.line1 || ""}
                onChange={(e) => handleAddressChange("line1", e.target.value)}
                className="w-full border rounded p-2 mb-2 bg-gray-50"
              />
              <input
                type="text"
                value={formData.address?.line2 || ""}
                onChange={(e) => handleAddressChange("line2", e.target.value)}
                className="w-full border rounded p-2 bg-gray-50"
              />
            </>
          ) : (
            <p>
              {formData.address?.line1} <br /> {formData.address?.line2}
            </p>
          )}
        </div>

        <div>
          <p className="font-medium text-[#9708CC] mb-1">Gender</p>
          {isEdit ? (
            <select
              value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="w-full border rounded p-2 bg-gray-50"
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <p>{formData.gender}</p>
          )}
        </div>

        <div>
          <p className="font-medium text-[#9708CC] mb-1">Date of Birth</p>
          {isEdit ? (
            <input
              type="date"
              value={formData.dob?.slice(0, 10) || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full border rounded p-2 bg-gray-50"
            />
          ) : (
            <p>{new Date(formData.dob).toLocaleDateString()}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        {isEdit ? (
          <button
            onClick={handleSave}
            className="bg-[#9708CC] text-white px-6 py-2 rounded-full hover:bg-[#7d06b1] transition"
            disabled={updating}
          >
            {updating ? "Updating..." : "Save Information"}
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="bg-[#9708CC] text-white px-6 py-2 rounded-full hover:bg-[#c744ff] transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
