import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  return (
    <div>
      <div className="flex items-center  rounded-lg justify-between">
        <div className="flex items-center justify-start  gap-3">
          <img
            className="h-11 w-11 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGiRJA_5DqmVm7TxMV7E0IzYzUujF4p3SHPg&s"
          />
          <h4 className="text-lg font-medium capitalize">
            {captain.captain.fullname.firstname +
              " " +
              captain.captain.fullname.lastname}
          </h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">₹296.2</h4>
          <p className="text-sm  text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3  mt-[10%]  bg-gray-100 rounded-xl  justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl  mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sml text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2  font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sml text-gray-600">Hours Online</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2  font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sml text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
