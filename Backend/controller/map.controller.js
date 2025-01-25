import {
  getCoordinatesService,
  getDistanceTimeService,
  getAutoCompleteSuggestions,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";
import { captainModel } from "../models/captain.model.js";
export const getAddressCoordinateController = async (req, res, next) => {
  const { address } = req.query;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    if (address) {
      const coordinates = getCoordinatesService(address);
      res.status(200).json(coordinates);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Coordinates not found" });
  }
};

export const getDistanceTimeController = async (req, res) => {
  try {
    console.log("in get dis.tinme=>", req.query);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await getDistanceTimeService(origin, destination);
    res.status(200).json(distanceTime);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSuggestionController = async (req, res) => {
  try {
    // console.log("frm suggestion", req.query);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    const suggestions = await getAutoCompleteSuggestions(input);
    // console.log(suggestions);
    res.status(200).json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCaptainsInTheRadius = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { lat, long } = req.query;
    const captains = await captainModel.find({
      location: { $near: [lat, long] },
    });
    res.status(200).json(captains);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
