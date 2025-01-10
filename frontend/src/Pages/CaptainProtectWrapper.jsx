// import React, { useContext, useEffect, useState } from "react";
// import { CaptainDataContext } from "../context/CaptainContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// const CaptainProtectWrapper = ({ children }) => {
//   const { captain, setCaptain } = useContext(CaptainDataContext);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");
//   useEffect(() => {
//     if (!token) {
//       console.log("navigate to login");
//       navigate("/captain-login");
//     }
//   }, [token]);

//   axios
//     .get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         setCaptain(response.data.captain);
//         setIsLoading(false);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       localStorage.removeItem("token");
//       navigate("/captain-login");
//     });
//   if (isLoading) {
//     return <div>Loading.....</div>;
//   }
//   return <>{children}</>;
// };

// export default CaptainProtectWrapper;

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
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  useEffect(() => {
    // Check for token and fetch user profile
    const fetchCaptainProfile = async () => {
      if (!token) {
        console.log("navigate to login");
        navigate("/login");
        return;
      }

      // try {
      //   const response = await axios.get(
      //     `${import.meta.env.VITE_BASE_URL}/captain/profile`,
      //     {
      //       headers: { Authorization: `Bearer ${token}` },
      //     }
      //   );

      //   if (response.status === 200) {
      //     setCaptain(response.data.captain);
      //   }
      // } catch (err) {
      //   console.error("Error fetching captain profile", err);
      //   localStorage.removeItem("token");
      //   navigate("/captain-login"); // Redirect to login page if user profile fetch fails
      // } finally {
      //   setIsLoading(false);
      // }
    };

    fetchCaptainProfile();
  }, [token, navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
