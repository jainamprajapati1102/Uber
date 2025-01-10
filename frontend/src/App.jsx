import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./Pages/Start";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import CaptainLogin from "./Pages/CaptainLogin";
import CaptainSingUp from "./Pages/CaptainSingUp";
import Home from "./Pages/Home";
import UserContext from "./context/UserContext";
import UserProtectWrapper from "./Pages/UserProtectWrapper";
import { CaptainContext } from "./context/CaptainContext";
import UserLogout from "./Pages/UserLogout";
import CaptainHome from "./Pages/CaptainHome";
import CaptainProtectWrapper from "./Pages/CaptainProtectWrapper";
import Riding from "./Pages/Riding";
import CaptainRiding from "./Pages/CaptainRiding";
import "remixicon/fonts/remixicon.css";
const App = () => {
  return (
    <div>
      <UserContext>
        <CaptainContext>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/riding" element={<Riding />} />

            <Route path="/captain-signup" element={<CaptainSingUp />} />
            <Route path="/captain-signin" element={<CaptainLogin />} />
            <Route path="/captain-riding" element={<CaptainRiding />} />
            <Route
              path="/home"
              element={
                // <UserProtectWrapper>
                <Home />
                // </UserProtectWrapper>
              }
            />
            <Route
              path="/captainhome"
              element={
                // <CaptainProtectWrapper>
                <CaptainHome />
                // </CaptainProtectWrapper>
              }
            />
            <Route
              path="/user/logout"
              element={
                // <UserProtectWrapper>{
                <UserLogout />
                // }</UserProtectWrapper>
              }
            />
          </Routes>
        </CaptainContext>
      </UserContext>
    </div>
  );
};

export default App;
