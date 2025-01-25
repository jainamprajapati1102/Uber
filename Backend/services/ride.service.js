import { log } from "console";
import { rideModel } from "../models/ride.models.js";
import { getDistanceTimeService } from "./maps.service.js";
import crypto from "crypto";
import { sendMessageToSocketId } from "../socket.js";
export async function calculatefareService(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }
  const distanceTime = await getDistanceTimeService(pickup, destination);
  console.log("frm ride service", distanceTime);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const totalfare = {
    auto: Math.round(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };
  return totalfare;
}

function getOTP(num) {
  function generateOtp(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOtp(num);
}
export const createRideService = async ({
  user,
  pickup,
  destination,
  vehicletype,
}) => {
  const calculatefare = await calculatefareService(pickup, destination);

  if (!user || !pickup || !destination || !vehicletype) {
    throw new Error("All fields are required");
  }
  const distanceTime = await getDistanceTimeService(pickup, destination);
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: calculatefare[vehicletype],
    status: "pending",
    distance: (distanceTime.distance.value / 1000).toFixed(2),
    duration: (distanceTime.duration.value / 60).toFixed(2),
  });
  // .populate("user");
  return ride;
};

export const confirmRideService = async ({ rideId, captain }) => {
  try {
    if (!rideId) {
      throw new Error("Ride Id is required");
    }

    await rideModel.findOneAndUpdate(
      { _id: rideId },
      { captain: captain._id, status: "accepted" },
      { new: true }
    );

    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate("user captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride not found");
    }
    return ride;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const startRideService = async ({ rideId, otp, captain }) => {
  try {
    if (!rideId || !otp) {
      throw new Error("Ride Id and OTP is required");
    }

    const ride = await rideModel
      .findOne({ _id: rideId })
      .populate("user captain")
      .select("+otp");
    if (!ride) {
      throw new Error("Ride not found");
    }

    if (ride.status !== "accepted") {
      throw new Error("Ride not accepted");
    }
    if (ride.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    const updateRideStatus = await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "ongoing" },
      { new: true }
    );
    console.log("ride update status", updateRideStatus);

    return ride;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const endRideService = async ({ rideId, captain }) => {
  try {
    if (!rideId) {
      throw new Error("Ride Id is required");
    }

    console.log("ride id frm end ride service", rideId);
    console.log("captain frm end ride service", captain);

    const ride = await rideModel
      .findOne({ _id: rideId }) //, captian: captain._id })
      .populate("user captain");
    console.log("ride frm end ride service", ride);

    if (!ride) {
      throw new Error("Ride not found");
    }
    if (ride.status !== "ongoing") {
      throw new Error("Ride not ongoing");
    }

    await rideModel.findOneAndUpdate(
      { _id: rideId },
      { status: "completed" },
      { new: true }
    );
    return ride;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const cancelRideService = async ({ rideId, captain }) => {
  try {
    if (!rideId) {
      throw new Error("Ride Id is required");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
