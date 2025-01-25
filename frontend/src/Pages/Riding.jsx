import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
const Riding = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket } = useContext(SocketContext);
  const rideData = location.state.ride;
  socket.on("ride-ended", (ride) => {
    navigate("/home");
  });
  return (
    <div className="h-screen">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-home-5-line"></i>
      </Link>
      <div className="h-1/ ">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="h-1/2 p-5">
        <div>
          <div className="flex  justify-between items-center ">
            <img
              className="h-12"
              src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            />
            <div className="text-right">
              <h2 className="text-lg font-medium capitalize">
                {rideData?.captain?.fullname?.firstname}
              </h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">
                {rideData?.captain?.vehicle?.plate}
              </h4>
            </div>
          </div>
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className=" ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">563/11-A</h3>
                <p className="text-sm text-gray-600">{rideData?.destination}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-5 p-3  ">
                <i className="text-lg ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">₹ {rideData?.fare}</h3>
                  <p className="text-sm text-gray-600">Cash cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="bg-green-600 w-full p-2  text-white font-semibold rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
