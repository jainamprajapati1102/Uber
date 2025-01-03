export const getCoordinatesService = async (address) => {
  try {
    const apiKey = process.env.Google_maps_API_KEY; // Replace with your Google Maps API key
    const url = `https://maps.gomaps.pro/maps/api/geocode/json`;

    const response = await axios.get(url, {
      params: {
        address: address,
        key: apiKey,
      },
    });

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error(`Geocoding failed: ${response.data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};
