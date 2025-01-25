import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const FinshedRide = (props) => {
  const navigate = useNavigate();
  console.log(props);
  async function endride() {
    // props.setFinishedRidePanel(false);
    const response = await axios.post(
      "http://localhost:5000/ride/end-ride",
      {
        rideId: props.rideData._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      navigate("/captainhome");
    }
  }

  return (
    <div className="object-cover overflow-hidden">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setFinishedRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finished This Ride</h3>
      <div className="flex items-center justify-between border-2 tborder-yellow-400 p-3 rounded-lg mt-4  ">
        <div className="flex items-center gap-3 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdEEKiFyk8PQ1hL0yknDqacV7SaniWHDb-w&s"
            className="w-10 rounded-full object-cover h-10"
          />
          <h4 className="text-lg font-medium">
            {props.rideData?.user?.fullname?.firstname}
          </h4>
        </div>
        <h5 className="text-lg font-semibold">{props.rideData?.distance} KM</h5>
      </div>
      <div className="flex  gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">{props.rideData?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">
                {props.rideData?.destination}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-5 p-3  ">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-medium">
                  ₹ {props.rideData?.fare}
                </h3>
                <p className="text-sm text-gray-600">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-2 items-center bg-red-500 p-3 w-full justify-between mb-10"> */}
      <div className="mt-2 w-full p-3">
        <div className="flex justify-between gap-3 bg-white px-10 p-3">
          <button
            onClick={endride}
            className="w-full flex text-lg justify-center bg-green-600 p-3 px-10 rounded-lg font-semibold  text-white"
          >
            Finished Ride
          </button>
        </div>
        <p className="text-sm text-red-500 mt-6 font-extralight">
          Clink on Finished button if you have completed the payment.
        </p>
      </div>
    </div>
  );
};

export default FinshedRide;
