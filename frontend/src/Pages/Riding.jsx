import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  return (
    <div className="h-screen">
      <Link to='/home' className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
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
        <button className="bg-green-600 w-full p-2  text-white font-semibold rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
