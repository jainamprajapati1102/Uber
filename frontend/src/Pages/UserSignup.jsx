import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/userContext";
const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [mobile, setMobile] = useState("");

  const { user, setUser } = React.useContext(UserDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email: email,
        password: password,
        fullname: {
          firstname: firstname,
          lastname: lastname,
        },
        mobile: mobile,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        newUser
      );
      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setMobile("");
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
              className="w-20 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Logo"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your Name</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
              name="firstname"
              className="bg-gray-100 rounded-lg px-4 py-3 border w-1/2  text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
              name="lastname"
              className="bg-gray-100 rounded-lg px-4 py-3 border w-1/2 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              placeholder="Last Name"
            />
          </div>
          <h3 className="text-base font-medium mb-2">What's your mobile no.</h3>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            name="mobile"
            className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="123456789"
          />
          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="email@example.com"
          />
          <h3 className="text-base font-medium mb-2">Enter password</h3>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-base placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            placeholder="password"
          />
          <button className="bg-black text-white font-semibold py-3 rounded-lg w-full text-lg hover:bg-gray-800 transition-colors">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have a account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      <div className="mt-6 px-4 md:px-6 lg:px-8">
        <p className="p-2 text-[10px] sm:text-xs md:text-sm lg:text-base leading-tight text-center">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline ">Google Security Policy</span> and{" "}
          <span className="underline">Terms of Service apply.</span>
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
