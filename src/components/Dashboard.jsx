import { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClients";

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

const REFRESH_INTERVAL = 4 * 60; // 4 minutes

export async function fetchLatestCitiesFromSupabase() {
  try {
    const { data: allData, error } = await supabase
      .from("AQI Data")
      .select("*")
      .in("City", cities);

    if (error) throw error;

    const latestData = cities.map((city) => {
      const cityRows = (allData || []).filter(
        (row) => row.City && row.City.toLowerCase() === city.toLowerCase()
      );
      if (!cityRows.length) return { City: city, missing: true };
      return cityRows.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      );
    });

    return latestData;
  } catch (err) {
    console.error("fetchLatestCitiesFromSupabase error:", err);
    return cities.map((city) => ({ City: city, missing: true }));
  }
}

const Dashboard = ({ theme }) => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(REFRESH_INTERVAL);
  const [expandedCard, setExpandedCard] = useState(null);

  const isMobile = windowWidth < 768;

  const fetchLatestData = async () => {
    setLoading(true);
    const latest = await fetchLatestCitiesFromSupabase();
    const mappedData = latest.map((city) => ({
      ...city,
      location: city.City,
      aqi: city.aqius || 0,
      category:
        city.aqius <= 50
          ? "Low"
          : city.aqius <= 100
          ? "Moderate"
          : "High",
    }));
    setData(mappedData);
    setCountdown(REFRESH_INTERVAL);
    setLoading(false);
  };

  useEffect(() => {
    fetchLatestData();
    const interval = setInterval(fetchLatestData, REFRESH_INTERVAL * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : REFRESH_INTERVAL));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = (countdown / REFRESH_INTERVAL) * 100;

  if (loading) return <p>Loading latest city data...</p>;

  return (
    <>
      <div className="flex items-center mb-4">
        <div className={`text-sm font-medium mr-3 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Next update: <span className="font-bold">{formatCountdown(countdown)}</span>
        </div>

        <div className="flex-1 bg-gray-700 h-2 rounded overflow-hidden">
          <div
            className="bg-green-500 h-2 transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-full lg:max-w-[calc(100%-5rem)] px-4 lg:px-0`}
      >
        {data.map((cityData, index) => {
          const aqiColor =
            cityData.category === "Low"
              ? "bg-green-500"
              : cityData.category === "Moderate"
              ? "bg-yellow-500"
              : "bg-red-500";

          const recommendation =
            cityData.category === "Low"
              ? "Air quality is good 🌤"
              : cityData.category === "Moderate"
              ? "Sensitive groups take caution ⚠️"
              : "Limit outdoor activity 😷";

          const handleCardClick = () => {
            if (isMobile) setExpandedCard(expandedCard === index ? null : index);
          };

          const showExpanded = !isMobile || expandedCard === index;

          return (
            <div
              key={cityData.City}
              className={`rounded-2xl p-5 sm:p-4 shadow-lg transition-transform hover:scale-[1.02] relative cursor-pointer
                ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-200 text-black"}`}
              onClick={handleCardClick}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold">{cityData.location}</h2>
                  <p className="text-4xl sm:text-5xl font-bold">{cityData.aqi}</p>
                  <p className={`text-xs sm:text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {cityData.category}
                  </p>
                </div>

                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-sm font-semibold ${aqiColor}`}>
                  {cityData.category}
                </div>
              </div>

              {showExpanded && !cityData.missing && (
                <>
                  <p className={`mt-3 text-sm ${theme === "dark" ? "text-white" : "text-black"}`}>
                    {recommendation}
                  </p>

                  <ul className="mt-2 text-sm">
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
                </>
              )}

              {isMobile && (
                <div className="absolute bottom-2 right-2 text-gray-400 text-xs">
                  Tap for details
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;