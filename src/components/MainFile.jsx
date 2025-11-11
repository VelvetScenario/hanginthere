import { useState } from "react";
import { FiHome, FiMap, FiBell, FiSettings } from "react-icons/fi";

import Dashboard from "./Dashboard.jsx";
import Map from "./Map.jsx";
import Alerts from "./Alerts.jsx";
import Settings from "./Settings.jsx";

const MainFile = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

const aqiData = [
  { location: "Metro Manila", aqi: 72, category: "High", forecast: [68, 70, 74, 80, 76] },
  { location: "Caloocan", aqi: 65, category: "Moderate", forecast: [60, 62, 70, 68, 75] },
  { location: "Valenzuela", aqi: 42, category: "Low", forecast: [40, 45, 50, 55, 48] },
  { location: "Makati", aqi: 85, category: "High", forecast: [80, 82, 87, 90, 85] },
  { location: "Quezon City", aqi: 58, category: "Moderate", forecast: [55, 60, 65, 62, 58] },
  { location: "Pasig", aqi: 35, category: "Low", forecast: [30, 32, 38, 36, 34] },
];

  // Generate alerts
  const generateAlerts = (data) => {
    return data.map(city => {
      let severity;
      if (city.aqi < 50) severity = "Low";
      else if (city.aqi < 100) severity = "Moderate";
      else severity = "High";

      return {
        message: `${severity} AQI in ${city.location}`,
        severity,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
    });
  };

  const alerts = generateAlerts(aqiData);

  return (
    <div className={theme === "dark" ? "min-h-screen bg-gray-950 text-white flex flex-col items-center py-6 px-4 lg:px-10 pb-24 lg:pb-6" 
                            : "min-h-screen bg-white text-black flex flex-col items-center py-6 px-4 lg:px-10 pb-24 lg:pb-6"}>
      <h1 className="text-lg lg:text-2xl font-semibold mb-3 text-center">{activeTab}</h1>

      {activeTab === "Dashboard" && <Dashboard aqiData={aqiData} />}
      {activeTab === "Map" && <Map />}
      {activeTab === "Alerts" && <Alerts alertData={alerts} />}
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
            className={`flex flex-col items-center text-sm cursor-pointer ${
              activeTab === tab.name ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.icon}
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      {/* Desktop + Tablet NavBar */}
      <div className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-20 md:bg-gray-900 md:flex md:flex-col md:items-center md:py-6 md:gap-6 border-r border-gray-700">
        {[
          { name: "Dashboard", icon: <FiHome size={20} /> },
          { name: "Map", icon: <FiMap size={20} /> },
          { name: "Alerts", icon: <FiBell size={20} /> },
          { name: "Settings", icon: <FiSettings size={20} /> },
        ].map((tab) => (
          <button
            key={tab.name}
            className={`flex flex-col items-center text-sm ${
              activeTab === tab.name ? "text-white" : "text-gray-500"
            }`}
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
