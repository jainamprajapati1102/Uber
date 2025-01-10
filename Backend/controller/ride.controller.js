import express from "express";
import { createRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { calculatefareService } from "../services/ride.service.js";
const router = express.Router();

// function getFare(pickup, destination) {
//   if (!pickup || !destination) {
//     throw new Error("pickup and destination are required");
//   }
//   const distanceTime = getDistanceTimeService(pickup, destination);
//   const baseFare = {
//     auto: 30,
//     car: 50,
//     motorcycle: 20,
//   };

//   const perKmRate = {
//     auto: 10,
//     car: 15,
//     motorcycle: 8,
//   };

//   const perMinuteRate = {
//     auto: 2,
//     car: 3,
//     motorcycle: 1.5,
//   };

//   const fare = {
//     auto: Math.round(
//       baseFare.auto +
//         (distanceTime.distance.value / 1000) * perKmRate.auto +
//         (distanceTime.duration.value / 60) * perMinuteRate.auto
//     ),
//     car: Math.round(
//       baseFare.car +
//         (distanceTime.distance.value / 1000) * perKmRate.car +
//         (distanceTime.duration.value / 60) * perMinuteRate.car
//     ),
//     motorcycle: Math.round(
//       baseFare.motorcycle +
//         (distanceTime.distance.value / 1000) * perKmRate.motorcycle +
//         (distanceTime.duration.value / 60) * perMinuteRate.motorcycle
//     ),
//   };
//   return fare;
// }
export const crateRideController = async (req, res) => {
  console.log("frm ride controller", req.body);

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { pickup, destination, vehicletype } = req.body;
    const ride = await createRideService({
      user: req.user._id,
      pickup,
      destination,
      vehicletype,
    });
    res.status(201).json(ride);
  } catch (err) {
    console.log(err);

    return res.status(500).json({ message: err.message });
  }
};

export const calculatefareContgroller = async (req, res) => {
  try {
    const { pickup, destination } = req.query;
    console.log("frm calculate fare con", req.query);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const fare = await calculatefareService(pickup, destination);
    res.status(200).json(fare);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default router;
