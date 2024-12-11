// import React, { useContext, useEffect, useState } from "react";
// import { UserDataContext } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const UserProtectWrapper = ({ children }) => {
//   const { user, setUser } = useContext(UserDataContext);
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   console.log("token", token);

//   useEffect(() => {
//     if (!token) {
//       console.log("navigate to login");
//       navigate("/login");
//     }
//   }, [token]);

//   axios
//     .get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         setUser(response.data.user);
//         setIsLoading(false);
//       }
//     })
//     .catch((err) => {
//       console.error("Error fetching user profile", err);
//       localStorage.removeItem("token");
//       navigate("/login"); // Redirect to login page if user profile fetch fails
//     });
//   if (isLoading) {
//     return <div>Loading...</div>;
//   }
//   return <>{children}</>;
// };

// export default UserProtectWrapper;

import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Check for token and fetch user profile
    const fetchUserProfile = async () => {
      if (!token) {
        console.log("navigate to login");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login page if user profile fetch fails
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
