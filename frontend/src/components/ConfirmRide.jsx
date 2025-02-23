import React from "react";

export const ConfirmRide = (props) => {

  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your Ride</h3>
      <div className="flex  gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.pickup}</h3>
              {/* <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p> */}
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 ">
            <i className=" ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">{props.destination}</h3>
              {/* <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p> */}
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-5 p-3  ">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹ {props.fare[props.vehicletype]}</h3>
                <p className="text-sm text-gray-600">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.setVehiclePanel(false)
            props.createRide();
          }}
          className="w-full bg-green-600 text-lg p-2 rounded-lg font-semibold mt-5 text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};
