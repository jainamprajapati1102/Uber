import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="object-cover overflow-hidden">
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">
        {" "}
        Confirm This Ride To Start
      </h3>
      <div className="flex items-center justify-between bg-yellow-400 p-3 rounded-lg mt-4  ">
        <div className="flex items-center gap-3 ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdEEKiFyk8PQ1hL0yknDqacV7SaniWHDb-w&s"
            className="w-10 rounded-full object-cover h-10"
          />
          <h4 className="text-lg font-medium"> John Patel</h4>
        </div>
        <h5 className="text-lg font-semibold">4 KM</h5>
      </div>
      <div className="flex  gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-5 p-3  ">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹ 193.20</h3>
                <p className="text-sm text-gray-600">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex gap-2 items-center bg-red-500 p-3 w-full justify-between mb-10"> */}
      <div className="mt-2 w-full p-3">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <input
            className="flex bg-gray-100 rounded-lg font-mono px-6 py-4 border w-full  text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between gap-3 bg-white px-10 p-3">
            <button
              onClick={() => {
                props.setConfirmRidePopUpPanel(false);
                props.setRidePopUpPanel(false);
              }}
              className="flex w-full  text-lg bg-red-500 p-3 px-10 rounded-lg font-semibold  text-white"
            >
              Cancle
            </button>
            <Link
              to="/captain-riding"
              onClick={() => {
                props.setConfirmRidePopUp(true);
              }}
              className="w-full flex justify-center text-lg bg-green-600 p-3 px-10 rounded-lg font-semibold  text-white"
            >
              Confirm
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
