/* eslint-disable react/jsx-key */
import React from "react";

const LocationSearchPanel = (props) => {
  // smaple array for location
  const location = [
    "G-22,23 Royal business hub , new katargam, variya, Surat.",
    "G-24 PNB , new katargam, variya, Surat.",
    "G-26 Varni raj , new katargam, variya, Surat.",
  ];
  return (
    <div >
      {/* // this is a sample data */}
      {location.map(function (val,idx) {
        return (
          <div key={idx}
            onClick={()=>{
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex gap-4 border-gray-100 active:border-black border-2 p-3 rounded-xl items-center my-4 justify-start"
          >
            <h2 className="bg-[#eee] md:text-2xl  w-12 flex items-center justify-center rounded-full">
              <i className="ri-map-pin-2-fill "></i>
            </h2>
            <h4 className="p-3 font-medium md:text-2xl">{val}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
