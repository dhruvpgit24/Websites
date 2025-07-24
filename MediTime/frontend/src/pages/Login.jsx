import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const [state, setState] = useState("Sign up");
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let response;
      if (state === "Sign up") {
        response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
      }

      const { data } = response;

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(state === "Sign up" ? "Registered successfully" : "Logged in successfully");

        setEmail("");
        setPassword("");
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ffffff] px-6">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#2E2E2E]">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm text-[#666] mb-6">
          Please {state === "Sign up" ? "sign up" : "login"} to book appointment
        </p>

        {state === "Sign up" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="w-full px-4 py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#2E2E2E] mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border border-gray-500 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading ? "bg-gray-400" : "bg-[#6C63FF] hover:bg-[#5849cc]"
          } text-white font-medium py-2 rounded-md transition-all`}
        >
          {loading
            ? state === "Sign up"
              ? "Creating..."
              : "Logging in..."
            : state === "Sign up"
            ? "Create Account"
            : "Login"}
        </button>

        <p className="text-sm text-center text-[#666] mt-4">
          {state === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                className="text-[#6C63FF] cursor-pointer hover:underline"
                onClick={() => setState("Login")}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Create a new account?{" "}
              <span
                className="text-[#6C63FF] cursor-pointer hover:underline"
                onClick={() => setState("Sign up")}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
