import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FinshedRide from "../components/FinshedRide";

const CaptainRiding = () => {
  const [finishedRidePanel, setFinishedRidePanel] = useState(false);
  const finishedRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  console.log(finishedRidePanel);
  
  useGSAP(
    function () {
      if (finishedRidePanel) {
        gsap.to(finishedRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishedRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishedRidePanel]
  );

  return (
    <div className="h-screen ">
      {/* uber logo and exit icon */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-full">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        />
        <Link
          to="/captainhome"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line"></i>
        </Link>
      </div>
      {/* map  */}
      <div className="h-4/5 ">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* user details */}
      <div
        onClick={() => setFinishedRidePanel(true)}
        className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400"
      >
        <h5 className="p-1 text-center w-screen  absolute top-0 ">
          <i className="text-3xl  text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">4 KM away</h4>
        <button className=" w-3/4 mt-5 bg-green-600 p-3 px-10 rounded-lg font-semibold  text-white">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishedRidePanelRef}
        className="fixed z-10 px-3 py-8 h-screen translate-y-full bg-white w-full  bottom-0"
      >
        <FinshedRide
          rideData={rideData}
          setFinishedRidePanel={setFinishedRidePanel}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
