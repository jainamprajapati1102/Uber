// import { useGSAP } from "@gsap/react";
// import gsap from "gsap";
// import React, { useRef, useState } from "react";

// const RidePopUp = (props) => {
//   const [confirmRidePopUp, setConfirmRidePopUp] = useState(true);
//   const confirmRidePopUpRef = useRef(null);
//     // confirm ride popup gsap
//     useGSAP(
//       function () {
//         if (confirmRidePopUp) {
//           gsap.to(confirmRidePopUpRef.current, {
//             transform: "translateY(0%)",
//           });
//         } else {
//           gsap.to(confirmRidePopUpRef.current, {
//             transform: "translateY(100%)",
//           });
//         }
//       },
//       [confirmRidePopUp]
//     );
//   return (
//     <div>
//       <h5
//         className="p-1 text-center w-[93%] absolute top-0"
//         onClick={() => {
//           props.setRidePopUpPanel(false);
//         }}
//       >
//         <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
//       </h5>
//       <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
//       <div className="flex items-center justify-between bg-yellow-400 p-3 rounded-lg mt-4 ">
//         <div className="flex items-center gap-3 ">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdEEKiFyk8PQ1hL0yknDqacV7SaniWHDb-w&s"
//             className="w-10 rounded-full object-cover h-10"
//           />
//           <h4 className="text-lg font-medium"> John Patel</h4>
//         </div>
//         <h5 className="text-lg font-semibold">2.2 KM</h5>
//       </div>
//       <div className="flex  gap-2 justify-between flex-col items-center">
//         <div className="w-full mt-5">
//           <div className="flex items-center gap-5 p-3 border-b-2 ">
//             <i className=" ri-map-pin-user-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">563/11-A</h3>
//               <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-5 p-3 border-b-2 ">
//             <i className=" ri-map-pin-2-fill"></i>
//             <div>
//               <h3 className="text-lg font-medium">563/11-A</h3>
//               <p className="text-sm text-gray-600">Kakariya,Ahemdabad</p>
//             </div>
//           </div>
//           <div className="mt-2">
//             <div className="flex items-center gap-5 p-3  ">
//               <i className="text-lg ri-money-rupee-circle-fill"></i>
//               <div>
//                 <h3 className="text-lg font-medium">₹ 193.20</h3>
//                 <p className="text-sm text-gray-600">Cash cash</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button
//           onClick={() => {
//             props.setConfirmRidePopUpPanel(true);
//             props.setRidePopUpPanel(false);
//           }}
//           className="w-full bg-green-600 p-2 rounded-lg font-semibold mt-5 text-white"
//         >
//           Accept
//         </button>
//         <button
//           onClick={() => {
//             props.setRidePopUpPanel(false);
//           }}
//           className="w-full bg-gray-300 p-2 rounded-lg font-semibold mt-1 text-gray-700"
//         >
//           Ignore
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RidePopUp;

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";

const RidePopUp = (props) => {
  const [confirmRidePopUp, setConfirmRidePopUp] = useState(true);
  const confirmRidePopUpRef = useRef(null);

  // confirm ride popup gsap
  useGSAP(
    function () {
      if (confirmRidePopUp && confirmRidePopUpRef.current) {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(0%)",
        });
      } else if (confirmRidePopUpRef.current) {
        gsap.to(confirmRidePopUpRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [confirmRidePopUp]
  );

  return (
    <div
      ref={confirmRidePopUpRef}
      className=""
      style={{ transform: "translateY(300%)" }}
    >
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between bg-yellow-400 p-3 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMdEEKiFyk8PQ1hL0yknDqacV7SaniWHDb-w&s"
            className="w-10 rounded-full object-cover h-10"
          />
          <h4 className="text-lg font-medium"> John Patel</h4>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">Kakariya, Ahemdabad</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">563/11-A</h3>
              <p className="text-sm text-gray-600">Kakariya, Ahemdabad</p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center gap-5 p-3">
              <i className="text-lg ri-money-rupee-circle-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹ 193.20</h3>
                <p className="text-sm text-gray-600">Cash cash</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center w-full mt-5">
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="w-full bg-gray-300 p-3 rounded-lg font-semibold px-10 text-gray-700"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true);
              props.setRidePopUpPanel(false);
            }}
            className="w-full bg-green-600 p-3 rounded-lg font-semibold px-10 text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
