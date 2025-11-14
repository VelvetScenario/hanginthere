import { useState } from "react";
import { FiHome, FiMap, FiBell, FiSettings } from "react-icons/fi";

import Dashboard from "./Dashboard.jsx";
import Map from "./Map.jsx";
import Alerts from "./Alerts.jsx";
import Settings from "./Settings.jsx";
import { addressPoints } from "./addressPoints.js";
//import { supabase } from "./supabaseClient.js";

const generateRandomAQI = () => {
  const aqi = Math.floor(Math.random() * 201);
  const pm25 = Math.floor(Math.random() * 151);
  const pm10 = Math.floor(Math.random() * 181);
  const co = (Math.random() * 10).toFixed(1);

  let category;
    if (aqi < 50) category = "Low";
    else if (aqi < 100) category = "Moderate";
    else category = "High";
  return { aqi, category, pm25, pm10, co };
};

const MainFile = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

  const aqiData = addressPoints.map(([lat, lng, brgy, mun]) => {
    const { aqi, category, pm25, pm10, co } = generateRandomAQI();
    return {
      location: `${brgy}`,
      municipality: `${mun}`,
      lat,
      lng,
      aqi,
      category,
      pm25,
      pm10,
      co,
      forecast: Array.from({ length: 5 }, () => Math.floor(Math.random() * 201)),
    };
  });

  // Generate alerts
  const generateAlerts = (data) => {
    return data.slice(0, 10).map(city => { // limit to 10 alerts
      return {
        message: `${city.category} AQI in ${city.location}, ${city.municipality}`,
        severity: city.category,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
    });
  };

  const alerts = generateAlerts(aqiData);

 return (
    <div className={`min-h-screen flex flex-col items-center py-6 px-4 lg:px-10 pb-24 lg:pb-6 ${theme === "dark" ? "bg-gray-950 text-white" : "bg-white text-black"}`}>
      <h1 className="text-lg lg:text-2xl font-semibold mb-3 text-center">{activeTab}</h1>

      {activeTab === "Dashboard" && (
        <div className="w-full md:pl-20">
          <Dashboard aqiData={aqiData.slice(0, 9)} />
        </div>
        )} 
      {/* only show 9 */}
      {activeTab === "Map" && (
        <div className="w-full md:pl-20">
          <Map aqiData={aqiData} />
        </div>
      )}
      {activeTab === "Alerts" && (
        <div className="w-full md:pl-20">
          <Alerts alertData={alerts} />
        </div>
      )}
      {activeTab === "Settings" && <Settings onThemeChange={(t) => setTheme(t)}/>}

      {/* Mobile NavBar */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-700 flex justify-around py-2 lg:hidden md:hidden">
        {[{ name: "Dashboard", icon: <FiHome size={20} /> },
          { name: "Map", icon: <FiMap size={20} /> },
          { name: "Alerts", icon: <FiBell size={20} /> },
          { name: "Settings", icon: <FiSettings size={20} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center text-sm cursor-pointer ${activeTab === tab.name ? "text-white" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop + Tablet NavBar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-20 md:bg-gray-900 md:flex md:flex-col md:items-center md:py-6 md:gap-6 border-r border-gray-700">
        {[{ name: "Dashboard", icon: <FiHome size={20} /> },
          { name: "Map", icon: <FiMap size={20} /> },
          { name: "Alerts", icon: <FiBell size={20} /> },
          { name: "Settings", icon: <FiSettings size={20} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center text-sm w-20 h-30 ${activeTab === tab.name ? "text-white" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span className="text-[10px] mt-1">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MainFile;
