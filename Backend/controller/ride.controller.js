import express from "express";
import {
  confirmRideService,
  createRideService,
  startRideService,
  endRideService,
} from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { calculatefareService } from "../services/ride.service.js";
import {
  getCaptainsInTheRadius,
  getCoordinatesService,
} from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { rideModel } from "../models/ride.models.js";
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

    const pickUpCoordinates = await getCoordinatesService(pickup);
    console.log("cooradinate frm ride controller", pickUpCoordinates);
    const captainInTheRadius = await getCaptainsInTheRadius(
      pickUpCoordinates.ltd,
      pickUpCoordinates.lng,
      10
    );
    ride.otp = "";
    const ride1 = await rideModel.findById(ride._id).populate("user").exec();

    captainInTheRadius.map((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride1,
      });
    });
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

export const confirmRideController = async (req, res) => {
  try {
    const { rideId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const ride = await confirmRideService({ rideId, captain: req.captain });
    console.log("ride receive frm confirm ride service", ride);

    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-confirmed",
      data: ride,
    });

    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const startRideController = async (req, res) => {
  try {
    const { rideId, otp } = req.query;
    console.log("frm start ride con", req.query);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const ride = await startRideService({ rideId, otp, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-started",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const endRideController = async (req, res) => {
  try {
    const { rideId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const ride = await endRideService({ rideId, captain: req.captain });
    sendMessageToSocketId(ride.user.socketId, {
      event: "ride-ended",
      data: ride,
    });
    res.status(200).json(ride);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export default router;
