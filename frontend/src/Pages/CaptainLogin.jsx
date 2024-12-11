// import React, { createContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CaptainDataContext } from "../context/CaptainContext";

// const CaptainLogin = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [captainData, setCaptainData] = useState("");
//   const navigate = useNavigate();
//   const [captain, setCaptain] = createContext(CaptainDataContext);
//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {
//       const captainData = {
//         email: email,
//         password: password,
//       };
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/captain/login`,
//         captainData
//       );

//       if (response.status === 200) {
//         const data = response.data;
//         localStorage.setItem("token", data.token);
//         setCaptain(data.captain);
//         navigate("/home");
//       } else {
//         alert("Invalid credentials. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <div className="p-5 h-screen flex flex-col justify-between bg-gray-50">
//       <div className="w-full max-w-md mx-auto">
//         <form
//           onSubmit={(e) => {
//             submitHandler(e);
//           }}
//           className="bg-white shadow-lg rounded-lg p-6"
//         >
//           <div className="mb-6 text-center">
//             <img
//               className="w-20 mb-3"
//               src="https://www.svgrepo.com/show/505031/uber-driver.svg"
//               alt=""
//             />
//           </div>
//           <h3 className="text-lg font-medium mb-2">What's your email</h3>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//             placeholder="email@example.com"
//           />
//           <h3 className="text-lg font-medium mb-2">Enter password</h3>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             className="bg-gray-100 rounded-lg px-4 py-3 border w-full text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
//             placeholder="password"
//           />
//           <button className="bg-black text-white font-semibold py-3 rounded-lg w-full text-lg hover:bg-gray-800 transition-colors">
//             Login
//           </button>
//         </form>
//         <p className="text-center mt-4 text-sm">
//           Join Captain?{" "}
//           <Link to="/captain-signup" className="text-blue-600 hover:underline">
//             Create an Account
//           </Link>
//         </p>
//       </div>

//       <div className="mt-6">
//         <Link
//           to="/login"
//           className="flex items-center justify-center bg-[#d5622d] text-white font-semibold py-4 rounded-lg w-full max-w-md mx-auto text-lg hover:bg-green-700 transition-colors"
//         >
//           Sign in As User
//         </Link>
//       </div>
//     </div>
//   );
// };

import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState("");

  const { captain, setCaptain } = React.useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    // setUserData({
    //   email: email,
    //   password: password,
    // });
    try {
      const newUser = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captain/login`,
        newUser
      );
      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(data.captain);
        navigate("/captainhome");
      }
    } catch (error) {
      console.log("error frm captain login", error);
    }
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
              className="w-20 mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
              alt="Logo"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">
            What's Our Capatain's email
          </h3>
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
