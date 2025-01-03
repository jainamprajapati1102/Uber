import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { VehiclePanel } from "../components/VehiclePanel";
import { ConfirmRide } from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import { WaitingForDriver } from "../components/WaitingForDriver";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  // const [PanelOpen, setPanelOnpen] = useState(false);
  const [PanelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (PanelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 18,
          // opacity: 1,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 18,
          // opacity: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [PanelOpen]
  );

  // for vehicle panel open
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehiclePanel]
  );
  
  // for vehicle found open
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [vehicleFound]
  );
  
  // for confirm ride panel open
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePanel]
  );

  // for waiting for driver open
  useGSAP(
    function () {
      if (waitingForDriverPanel) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [waitingForDriverPanel]
  );


  return (
    <>
      <div className="h-screen relative  overflow-hidden">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div
          onClick={() => {
            setVehiclePanel(false);
          }}
          className="h-screen w-screen"
        >
          <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" flex flex-col justify-end h-screen absolute top-0 w-full">
          <div className="h-40 p-6 w-screen bg-white relative">
            <h5
              ref={panelCloseRef}
              onClick={() => {
                setPanelOpen(false);
              }}
              className="absolute top-6 right-6 text-2xl opacity-0"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            <form
              onSubmit={(e) => {
                submitHandler(e);
              }}
              className="max-h-full"
            >
              <div className="line absolute h-16 w-1 md:top-[13%] lg:top-[54%] mb-0 left-9 bg-gray-900 rounded-full"></div>
              {/* <div className="line absolute h-16 w-1 top-[33%] mb-0 left-9 md:left-20 lg:left-30 bg-gray-900 rounded-full"></div> */}
              <input
                className="bg-[#eee] mt-5 px-12 py-2 text-base rounded-lg w-full"
                type="text"
                value={pickup}
                placeholder="Add a pick-up Location"
                name=""
                id=""
                onClick={() => {
                  setPanelOpen(true);
                }}
                onChange={(e) => {
                  setPickup(e.target.value);
                }}
              />
              <input
                className="bg-[#eee] mt-4 px-12 py-2 text-base rounded-lg w-full"
                type="text"
                placeholder="Enter Your destination"
                name=""
                id=""
                onClick={() => {
                  setPanelOpen(true);
                }}
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                }}
              />
            </form>
          </div>
          <div ref={panelRef} className="bg-white top-4 h-[70%]">
            <LocationSearchPanel
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              clo
            />
          </div>
        </div>
        {/* choose vhicle panel */}
        <div
          ref={vehiclePanelRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        {/* Confirm ride panel */}
        <div
          ref={confirmRidePanelRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <ConfirmRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
        <div
          ref={vehicleFoundRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div
          ref={waitingForDriverRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <WaitingForDriver   setWaitingForDriverPanel={setWaitingForDriverPanel}/>
        </div>
      </div>
    </>
  );
};

export default Home;
