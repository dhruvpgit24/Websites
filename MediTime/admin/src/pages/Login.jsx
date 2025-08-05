import React, { useContext, useState } from "react";
import { Admincontext } from "../context/Admincontext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/Doctorcontext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(Admincontext);
  const { setDToken} = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {

        const {data} = await axios.post(backendUrl + '/api/doctor/login',{
          email,
          password
        })
        if (data.success) {
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
          console.log(data.token);
        } else {
          toast.error(data.message);
        }

      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-2xl shadow-lg p-8 w-[90%] max-w-md space-y-6"
      >
        <h2 className="text-2xl font-semibold text-center text-[#6C63FF]">
          {state} Login
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-800"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#6C63FF] hover:bg-[#574df2] text-white py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-md hover:shadow-[#6C63FF]/40"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          {state === "Admin" ? (
            <>
              Doctor Login?{" "}
              <span
                onClick={() => setState("Doctor")}
                className="text-[#6C63FF] cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          ) : (
            <>
              Admin Login?{" "}
              <span
                onClick={() => setState("Admin")}
                className="text-[#6C63FF] cursor-pointer hover:underline"
              >
                Click Here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
