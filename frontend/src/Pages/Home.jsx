import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import { VehiclePanel } from "../components/VehiclePanel";
import { ConfirmRide } from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import { WaitingForDriver } from "../components/WaitingForDriver";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickUpSuggestion, setPickUpSuggestion] = useState([]);
  const [destinationSuggestion, setDestinationSuggestion] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [disTime, setDisTime] = useState([]);

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const [PanelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [vehicletype, setVehicletype] = useState(null);
  const [ride, setRide] = useState("");

  useEffect(() => {
    socket.emit("join", { userType: "user", userid: user._id });

    return () => {};
  }, [user]);
  // console.log(socket.id);

  // socket.on("ride-confirmed", (ride) => {
  //   console.log("confirm ride->", ride);
  //   // setVehicleFound(false);
  //   // setWaitingForDriverPanel(true);
  //   // setRide(ride);
  // });
  const navigate = useNavigate();
  socket.on("ride-started", (ride) => {
    setWaitingForDriverPanel(false);
    navigate("/riding", { state: { ride: ride } });
  });
  try {
    const rideConfirmedHandler = (ride) => {
      console.log("confirm ride->", ride);
      setVehicleFound(false);
      setWaitingForDriverPanel(true);
      setRide(ride);
    };
    socket.on("ride-confirmed", rideConfirmedHandler);
  } catch (error) {
    console.log(error);
  }
  console.log(waitingForDriverPanel);
  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (PanelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 18,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 18,
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [PanelOpen]
  );

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

  const handlePickUpChange = async (e) => {
    setPickup(e.target.value);
    if (pickup === "") return;
    try {
      const response = await axios.get(
        `http://localhost:5000/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 20000,
        }
      );
      setPickUpSuggestion(response.data);
    } catch (error) {
      // console.error("Error during request:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up the request:", error.message);
      }
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      if (destination === "") return;
      const response = await axios.get(
        `http://localhost:5000/maps/get-suggestion`,
        {
          params: { input: e.target.value },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 20000,
        }
      );
      setDestinationSuggestion(response.data);
    } catch (error) {
      console.error("Error during request:", error);
      if (error.response) {
        console.error("Server error:", error.response.data);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error in setting up the request:", error.message);
      }
    }
  };

  async function findtrip() {
    try {
      const response1 = await axios.get(`http://localhost:5000/ride/get-fare`, {
        params: { pickup, destination },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        timeout: 20000,
      });
      setFare(response1.data);
      setVehiclePanel(true);
      setPanelOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function createRide() {
    try {
      const response = await axios.post(
        "http://localhost:5000/ride/create",
        {
          pickup,
          destination,
          vehicletype,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 20000,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async function caldis() {
    const response1 = await axios.get(`http://localhost:5000/ride/get-fare`, {
      params: { pickup, destination },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      timeout: 20000,
    });
    setDisTime(response1.data);
  }

  return (
    <>
      <div className="h-screen relative overflow-hidden">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div
          onClick={() => setVehiclePanel(false)}
          className="h-screen w-screen"
        >
          {/* <img
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt=""
            className="w-full h-full object-cover"
          /> */}
          <LiveTracking />
        </div>
        <div className=" mb-6 flex flex-col justify-end h-screen absolute top-0 w-full">
          <div className="h-49 p-6 w-screen  bg-white relative">
            <h5
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className="absolute top-6 right-6 text-2xl opacity-0"
            >
              <i className="ri-arrow-down-wide-line"></i>
            </h5>
            <h4 className="text-2xl font-semibold">Find a Trip</h4>
            <div className="line absolute h-16 w-1 md:top-[13%] lg:top-[54%] mb-0 left-9 bg-gray-900 rounded-full"></div>
            <form onSubmit={(e) => submitHandler(e)} className="max-h-full">
              <input
                className="bg-[#eee] mt-5 px-12 py-2 text-base rounded-lg w-full"
                type="text"
                value={pickup}
                placeholder="Add a pick-up Location"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                onChange={(e) => handlePickUpChange(e)}
              />
              <input
                className="bg-[#eee] mt-4 px-12 py-2 text-base rounded-lg w-full"
                type="text"
                placeholder="Enter Your destination"
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={(e) => handleDestinationChange(e)}
              />
            </form>
            {PanelOpen === true && (
              <button
                onClick={() => {
                  findtrip();
                  setPanelOpen(false);
                }}
                className="bg-black text-white px-4 py-2 rounded-lg mt-4 w-full"
              >
                Find Trip
              </button>
            )}
          </div>
          <div ref={panelRef} className="bg-white h-0 ">
            <LocationSearchPanel
              setPickUp={setPickup}
              setDestination={setDestination}
              setPanelOpen={setPanelOpen}
              setVehiclePanel={setVehiclePanel}
              suggestions={
                activeField === "pickup"
                  ? pickUpSuggestion
                  : destinationSuggestion
              }
              activeField={activeField}
            />
          </div>
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            selectVehicle={setVehicletype}
          />
        </div>

        <div
          ref={confirmRidePanelRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <ConfirmRide
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
            createRide={createRide}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            vehicletype={vehicletype}
            pickup={pickup}
            destination={destination}
          />
        </div>

        <div
          ref={vehicleFoundRef}
          className="fixed z-10 px-3 py-16 translate-y-full bg-white w-full  bottom-0"
        >
          <LookingForDriver
            fare={fare}
            vehicletype={vehicletype}
            pickup={pickup}
            destination={destination}
            setVehicleFound={setVehicleFound}
          />
        </div>

        <div
          ref={waitingForDriverRef}
          className="fixed z-10 px-3 py-8 translate-y-full bg-white w-full  bottom-0"
        >
          <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriverPanel={setWaitingForDriverPanel}
            waitingForDriverPanel={waitingForDriverPanel}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
