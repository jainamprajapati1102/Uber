import React from "react";

export const WaitingForDriver = (props) => {
  return (
    <div>
      <div>
        <div>
          <h5
            className="p-1 text-center w-[93%] absolute top-0"
            onClick={() => {
              props.setWaitingForDriverPanel(false);
            }}
          >
            <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
          </h5>
          <div className="flex  justify-between items-center ">
            <img
              className="h-12"
              src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            />
            <div className="text-right">
              <h2 className="text-lg font-medium">jainam</h2>
              <h4 className="text-xl font-semibold -mt-1 -mb-1">MP04ih234</h4>
              <p className="text-sm text-gray-600">maruti auto 800 </p>
            </div>
          </div>
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
        </div>
      </div>
    </div>
  );
};
