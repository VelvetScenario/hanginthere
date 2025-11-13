import React, { useEffect, useState } from "react";
import { supabase } from "../../services/supabaseClients";

const cities = [
  "Caloocan",
  "Malabon",
  "Navotas",
  "Valenzuela",
  "Quezon City",
  "Marikina",
  "Pasig",
  "Taguig",
  "Makati",
  "Manila",
  "Mandaluyong",
  "San Juan",
  "Pasay",
  "Parañaque",
  "Las Piñas",
  "Muntinlupa",
];

const REFRESH_INTERVAL = 4 * 60; //naguupdate every 4 minutes
const LatestCities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [timer, setTimer] = useState(REFRESH_INTERVAL);

  const fetchLatestCities = async () => {
    setLoading(true);
    try {
      const { data: allData, error } = await supabase
        .from("AQI Data")
        .select("*")
        .in("City", cities);

      if (error) {
        console.error("Error fetching data:", error.message);
        setData([]);
        return;
      }

      const latestData = cities.map((city) => {
        const cityRows = allData.filter(
          (row) => row.City.toLowerCase() === city.toLowerCase()
        );
        if (!cityRows.length) return { City: city, missing: true };
        return cityRows.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
      });

      setData(latestData);
      setLastUpdated(new Date());
      setTimer(REFRESH_INTERVAL);
    } catch (err) {
      console.error("Unexpected error:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestCities();

    const interval = setInterval(fetchLatestCities, REFRESH_INTERVAL * 1000);

    return () => clearInterval(interval);
  }, []);

  // Timer countdown effect
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL));
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (loading) return <p>Loading latest city data...</p>;

  return (
    <div>
      <h1>Latest Metro Manila City Data</h1>
      <p>
        Last Updated:{" "}
        {lastUpdated ? lastUpdated.toLocaleString() : "Loading..."} | Next
        update in: {formatTime(timer)}
      </p>

      {data.map((cityData) =>
        cityData.missing ? (
          <div key={cityData.City}>
            <h2>{cityData.City}</h2>
            <p>No data available.</p>
          </div>
        ) : (
          <div
            key={cityData.City}
            style={{
              marginBottom: "1rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "0.5rem",
            }}
          >
            <h2>{cityData.City}</h2>
            <ul>
              <li>ID: {cityData.id}</li>
              <li>IC: {cityData.ic}</li>
              <li>Temperature: {cityData.tp}</li>
              <li>Humidity: {cityData.hu}</li>
              <li>Pressure: {cityData.pr}</li>
              <li>Wind Direction: {cityData.wd}</li>
              <li>Wind Speed: {cityData.ws}</li>
              <li>Heat Index: {cityData.heatIndex}</li>
              <li>AQI US: {cityData.aqius}</li>
              <li>Main US Pollutant: {cityData.mainus}</li>
              <li>AQI CN: {cityData.aqicn}</li>
              <li>Main CN Pollutant: {cityData.maincn}</li>
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default LatestCities;
