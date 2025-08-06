import React from "react";
import { useAppContext } from "../context/AppContext";

const Login = () => {
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setShowUserLogin(false);
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate('/')
        setUser(data.user)
        setShowUserLogin(false)
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50 backdrop-blur-sm transition-all duration-300"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-xl shadow-2xl border border-gray-200 bg-white transition-all duration-500 transform hover:scale-[1.01]"
      >
        <p className="text-2xl font-semibold m-auto text-center">
          <span className="text-primary drop-shadow">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="w-full">
            <p className="mb-1 font-medium">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
              type="text"
              required
            />
          </div>
        )}

        <div className="w-full">
          <p className="mb-1 font-medium">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p className="mb-1 font-medium">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-300 rounded-md w-full p-2 mt-1 outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 transition-all"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="text-sm">
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary hover:underline cursor-pointer transition"
            >
              click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary hover:underline cursor-pointer transition"
            >
              click here
            </span>
          </p>
        )}

        <button className="bg-primary hover:bg-primary-dark shadow-md hover:shadow-xl transition-all duration-300 text-white w-full py-2 rounded-md cursor-pointer mt-2">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
