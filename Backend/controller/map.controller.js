import express from "express";
import { getCoordinatesService } from "../services/maps.service";
export const getAddressCoordinateController = async (req, res, next) => {
  const { address } = req.query;
  try {
    const coordinates = await getCoordinatesService;
  } catch (error) {}
};
