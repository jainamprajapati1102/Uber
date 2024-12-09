import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-cover bg-center bg-(url['https://www.freepik.com/premium-photo/red-stop-signal-new-york-traffic-light-with-buildings-background_208312119.htm'])">
        <div className="flex items-center justify-center h-full">
          <img
            className="w-20 sm:w-24 md:w-28"
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber Logo"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white flex flex-col items-center py-6 px-4 md:py-10 md:px-6">
        <h2 className="text-xl md:text-3xl font-bold text-center">
          Get Started with Uber
        </h2>
      </div>

      {/* Button Section */}
      <div className="mt-auto pb-8 px-4 md:px-6">
        <Link
          to="login"
          className="flex w-full justify-center bg-black text-white py-3 md:py-4 text-lg md:text-2xl rounded-lg transition-transform transform hover:scale-105"
        >
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Home;
