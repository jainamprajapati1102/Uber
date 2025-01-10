import { log } from "console";
import { rideModel } from "../models/ride.models.js";
import { getDistanceTimeService } from "./maps.service.js";
import crypto from "crypto";
export async function calculatefareService(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }
  const distanceTime = await getDistanceTimeService(pickup, destination);
  console.log("frm ride service",distanceTime);
  
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
  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: calculatefare[vehicletype],
  });
  return ride;
};
