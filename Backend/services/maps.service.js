// import axios from "axios";
// export const getCoordinatesService = async (address) => {
//   try {
//     // const apiKey = process.env.Google_maps_API_KEY; // Replace with your Google Maps API key
//     // const url = `https://maps.gomaps.pro/maps/api/geocode/json`;
//     // const response = await axios.get(url);
//     // // , {
//     // //   params: {
//     // //     address: address,
//     // //     key: apiKey,
//     // //   },
//     // // });
//     // if (response.data.status === "OK") {
//     // //   const location = response.data.results[0].geometry.location;
//     // //   return { lat: location.lat, lng: location.lng };
//     // } else {
//     //   // throw new Error(`Geocoding failed: ${response.data.status}`);
//     // }
//   } catch (error) {
//     // console.error("Error fetching coordinates:", error.message);
//     // throw error;
//   }
// };

// export const getDistanceTimeService = async (origin, destination) => {
//   // if (!origin || !destination) {
//   //   throw new Error("Origin or Destination are required");
//   // }

//   try {
//     // const apiKey = process.env.Google_maps_API_KEY;
//     // const url = `https://maps.gomaps.pro/maps/api/geocode/json`;
//     // const response = await axios.get(url);
//     // // , {
//     // //   params: {
//     //     origin: origin,
//     //     destination:destination,
//     //     // key: apiKey,
//     //   },
//     // }
//     // );

//     // if (response.data.status === "OK") {
//     //   if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
//     //     throw new Error("No routes found");
//     //   }
//       return response.data.rows[0].elements[0];
//     // } else {
//     //   throw new Error("Unable to fetch distance and time");
//     // }
//     // return
//   } catch (err) {
//     // console.log(err);
//     // throw new Error(err);
//   }
// };

// export const getSuggestionService = async (input) => {
//   // if (!input) {
//   //   throw new Error("query is required");
//   // }
//   try {
//     // const apiKey = process.env.Google_maps_API_KEY;
//     // const url = `https://maps.gomaps.pro/maps/api/geocode/json`;
//     // const response = await axios.get(url);
//     // , {
//     //   params: {
//     //     address: address,
//     //     key: apiKey,
//     //   },
//     // });

//     // if (response.data.status == "OK") {
//     //   return response.data.predictions;
//     // } else {
//     //   throw new Error("Unable to fetch suggestions");
//     // }
//   } catch (err) {
//     // console.log(err);
//     // throw err;
//   }
// };

import axios from "axios";
import { captainModel } from "../models/captain.model.js";

export const getCoordinatesService = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      console.log("location frm maps service", location);

      return {
        ltd: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error("Unable to fetch coordinates");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDistanceTimeService = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const apiKey = process.env.GOOGLE_MAPS_API;

  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No routes found");
      }

      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getCaptainsInTheRadius = async (ltd, lng, radius) => {
  // radius in km
  try {
    const captains = await captainModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[ltd, lng], radius / 6371],
        },
      },
    });
    console.log("count of captains frm maps service", captains);

    return captains;
  } catch (error) {
    console.log("err frm get captains radius catch", error);
    throw error;
  }
};
