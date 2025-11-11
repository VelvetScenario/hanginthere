import React, { useEffect } from "react";

const API_KEY = "bb55e0b6-6158-4a00-bfa4-ee8f09a72c4f";

const locations = {
  "Caloocan": { lat: 14.65, lon: 120.97 },
  "Malabon": { lat: 14.6579, lon: 120.9571 },
  "Navotas": { lat: 14.6545, lon: 120.9449 },
  "Valenzuela": { lat: 14.6995, lon: 120.9852 },
  "Quezon City": { lat: 14.6760, lon: 121.0437 },
  "Marikina": { lat: 14.6760, lon: 121.0437 },
  "Pasig": { lat: 14.5764, lon: 121.0851 },
  "Taguig": { lat: 14.52, lon: 121.05 },
  "Makati": { lat: 14.5547, lon: 121.0244 },
  "Manila": { lat: 14.5995, lon: 120.9842 },
  "Mandaluyong": { lat: 14.5833, lon: 121.0333 },
  "San Juan": { lat: 14.6, lon: 121.035 },
  "Pasay": { lat: 14.5333, lon: 121.0 },
  "Parañaque": { lat: 14.5167, lon: 121.0 },
  "Las Piñas": { lat: 14.45, lon: 120.9833 },
  "Muntinlupa": { lat: 14.4089, lon: 121.0266 }
};

const FetchAPI = () => {

  useEffect(() => {
    const fetchData = async () => {
      for (const [city, coords] of Object.entries(locations)) {
        try {
          const res = await fetch(
            `https://api.airvisual.com/v2/nearest_city?lat=${coords.lat}&lon=${coords.lon}&key=${API_KEY}`
          );
          const data = await res.json();
          console.log(city, data);
        } catch (err) {
          console.error(city, err);
        }
      }
    };

    fetchData();
  }, []);

  return <div>Fetching AirVisual API data… </div>;
};

export default FetchAPI;
