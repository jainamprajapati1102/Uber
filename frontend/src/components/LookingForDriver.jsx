import React from "react";

const LookingForDriver = (props) => {
  return (
    <div>
      <div>
        <h5
          className="p-1 text-center w-[93%] absolute top-0"
          onClick={() => {
            props.setVehicleFound(false);
          }}
        >
          <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
        </h5>
        <h3 className="text-2xl font-semibold mb-5">Looking For a Driver</h3>
        <div className="flex  gap-2 justify-between  items-center">
          <img
            className="h-20"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          />
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className=" ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">563/11-A</h3>
                <p className="text-sm text-gray-600">{props.pickup}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 p-3 border-b-2 ">
              <i className=" ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-lg font-medium">563/11-A</h3>
                <p className="text-sm text-gray-600">{props.destination}</p>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center gap-5 p-3  ">
                <i className="text-lg ri-money-rupee-circle-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">
                    ₹ {props.fare[props.vehicletype]}
                  </h3>
                  <p className="text-sm text-gray-600">Cash cash</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
