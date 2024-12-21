import React from "react";

export const VehiclePanel = (props ,idx) => {
  return (
    <div>
      {" "}
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        //   props.setVehiclePanel(false);
        }}
        className="flex w-full p-3 items-center mb-2 border-2 hover:border-black  border-gray-500 rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        />
        <div className="mt-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-line"></i>
            </span>
            4
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afforable, Compact Ride
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex w-full p-3 items-center mb-2 border-2 hover:border-black  border-gray-500 rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
        />
        <div className="mt-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-line"></i>
            </span>
            1
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afforable, MotoCycle Rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹65</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex w-full p-3 items-center mb-2 border-2 hover:border-black  border-gray-500 rounded-xl justify-between"
      >
        <img
          className="h-12"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
        />
        <div className="mt-2 w-1/2">
          <h4 className="font-medium text-base">
            {" "}
            Uberauto{" "}
            <span>
              <i className="ri-user-3-line"></i>
            </span>
            3
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Afforable, Auto Rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">115.18</h2>
      </div>
    </div>
  );
};
