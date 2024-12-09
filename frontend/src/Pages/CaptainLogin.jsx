import React, { useState } from "react";
import { Link } from "react-router-dom";

const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-5 h-screen flex flex-col justify-between bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="bg-white shadow-lg rounded-lg p-6"
        >
          <div className="mb-6 text-center">
            <img
              className="w-20 mb-3"
              src="https://www.svgrepo.com/show/505031/uber-driver.svg"
              alt=""
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
          Join Captain?{" "}
          <Link to="/captain-signup" className="text-blue-600 hover:underline">
            Create an Account
          </Link>
        </p>
      </div>

      <div className="mt-6">
        <Link
          to="/login"
          className="flex items-center justify-center bg-[#d5622d] text-white font-semibold py-4 rounded-lg w-full max-w-md mx-auto text-lg hover:bg-green-700 transition-colors"
        >
          Sign in As User
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;
