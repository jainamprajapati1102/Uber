

import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full">
        <div className="flex items-center justify-center h-full">
          <img
            className="w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 2xl:w-40"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white flex flex-col items-center py-6 px-4 sm:py-8 sm:px-6 md:py-10 md:px-8 lg:py-12 lg:px-10 xl:py-14 xl:px-12 2xl:py-16 2xl:px-14">
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
          Get Started with Uber
        </h2>
      </div>

      {/* Button Section */}
      <div className="mt-auto pb-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
        <Link
          to="login"
          className="flex w-full justify-center bg-black text-white py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7 2xl:py-8 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl rounded-lg transition-transform transform hover:scale-105"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;
