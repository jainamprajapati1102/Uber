import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //   if (!token) {
  //     return <div>You are not logged in</div>;
  //   }

  const logoutHandler = async () => {
    try {
      await axios.get("http://localhost:5000/user/logout", {
        headers: {
          Authorization: ` Bearer ${token}`,
        },
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={logoutHandler()}
      className="bg-black text-white font-semibold py-3 rounded-lg w-full text-lg hover:bg-gray-800 transition-colors"
    >
      Logout
    </button>
  );
};

export default UserLogout;
