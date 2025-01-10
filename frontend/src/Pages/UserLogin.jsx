import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    const options = {
      method: "POST",
      url: "http://localhost:5000/user/login",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      data: newUser,
    };
    try {
      const response = await axios.request(options);
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/home");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      // alert("some err show in incept");
      // console.error("Error Details:", {
      //   message: error.message,
      //   response: error.response,
      //   request: error.request,
      //   config: error.config,
      // });
      console.log("Message:", error.message);
      console.log("Request:", error.request);
      console.log("Response:", error.response ? error.response.data : "No response");
      console.log("Config:", error.config);
    }
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <div className="mb-6 text-center">
            <img
              className="w-20 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Logo"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="password"
          />
          <button className="bg-black text-white font-semibold py-3 rounded-lg w-full text-lg hover:bg-gray-800 transition-colors">
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Create an Account
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <Link
          to="/captain-signin"
          // className="flex items-center justify-center bg-green-600 text-white font-semibold py-4 rounded-lg w-full max-w-md mx-auto text-lg hover:bg-green-700 transition-colors"
          className="flex items-center justify-center bg-[#d5622d] text-white font-semibold py-4 rounded-lg w-full max-w-md mx-auto text-lg hover:bg-green-700 transition-colors"
        >
          Sign in As Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
